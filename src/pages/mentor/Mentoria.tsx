import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar as CalendarIcon, Clock, MessageSquare, Video } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { TutorSessionMentorAPI } from "@/api/mentor/controllers/TutorSessionMentorAPI"
import { UserMentorAPI } from "@/api/mentor/controllers/UserMentorAPI"
import { TutorSessionResponseDTO, TutorSessionCreateDTO, SessionType } from "@/api/dtos/tutorSessionDtos"

interface CalendarEvent {
  date: Date;
  sessions: number;
}

const MentorMentoria = () => {
  const [date, setDate] = useState<Date>(new Date())
  const [mentoringSessions, setMentoringSessions] = useState<TutorSessionResponseDTO[]>([])
  const [activeSession, setActiveSession] = useState<string | null>(null)
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const mentorId = localStorage.getItem('userId') // Get mentor's ID from localStorage

  useEffect(() => {
    fetchSessions()
  }, [])

  const fetchSessions = async () => {
    try {
      setLoading(true)
      const sessions = await TutorSessionMentorAPI.getAllSessions()
      // Filter sessions to only show those belonging to this mentor
      const mentorSessions = sessions.filter(session => session.mentor.id === mentorId)
      setMentoringSessions(mentorSessions)
      updateCalendarEvents(mentorSessions)
    } catch (error) {
      toast.error("Erro ao carregar sessões de mentoria")
    } finally {
      setLoading(false)
    }
  }

  const updateCalendarEvents = (sessions: TutorSessionResponseDTO[]) => {
    const eventMap = new Map<string, number>()
    sessions.forEach(session => {
      const sessionDate = new Date(session.date).toDateString()
      eventMap.set(sessionDate, (eventMap.get(sessionDate) || 0) + 1)
    })
    const events = Array.from(eventMap.entries()).map(([dateStr, sessions]) => ({
      date: new Date(dateStr),
      sessions
    }))
    setCalendarEvents(events)
  }

  const handleAcceptMentoring = async (sessionId: string) => {
    try {
      const sessionToUpdate = mentoringSessions.find(s => s.id === sessionId)
      if (!sessionToUpdate) return

      // Convert response DTO to create/update DTO format
      const updateData: TutorSessionCreateDTO = {
        mentorId: sessionToUpdate.mentor.id,
        studentId: sessionToUpdate.student.id,
        title: sessionToUpdate.title,
        date: sessionToUpdate.date,
        dateHour: sessionToUpdate.dateHour,
        type: sessionToUpdate.type,
        link: sessionToUpdate.link
      }

      const updatedSession = await TutorSessionMentorAPI.updateSession(sessionId, updateData)
      setMentoringSessions(sessions =>
        sessions.map(session =>
          session.id === sessionId ? updatedSession : session
        )
      )
      toast.success("Mentoria aceita com sucesso!", {
        description: "O aluno será notificado da confirmação."
      })
    } catch (error) {
      toast.error("Erro ao aceitar mentoria")
    }
  }

  const handleStartMentoring = (sessionId: string, type: SessionType) => {
    if (activeSession) {
      toast.error("Você já possui uma sessão ativa!", {
        description: "Finalize a sessão atual antes de iniciar uma nova."
      })
      return
    }

    setActiveSession(sessionId)
    toast.success(type === SessionType.CHAMADA_DE_VIDEO ? "Iniciando chamada de vídeo..." : "Chat iniciado!", {
      description: type === SessionType.CHAMADA_DE_VIDEO 
        ? "Aguardando aluno entrar na sala..." 
        : "Você pode começar a conversar com o aluno.",
      action: {
        label: type === SessionType.CHAMADA_DE_VIDEO ? "Cancelar chamada" : "Encerrar chat",
        onClick: () => handleEndSession(sessionId)
      }
    })

    if (type === SessionType.CHAMADA_DE_VIDEO) {
      setTimeout(() => {
        toast.success("Aluno conectado à chamada!", {
          description: "A sessão de mentoria começou."
        })
      }, 3000)
    }
  }

  const handleEndSession = async (sessionId: string) => {
    try {
      await TutorSessionMentorAPI.deleteSession(sessionId)
      setActiveSession(null)
      setMentoringSessions(sessions => sessions.filter(s => s.id !== sessionId))
      updateCalendarEvents(mentoringSessions.filter(s => s.id !== sessionId))
      toast.success("Sessão encerrada com sucesso!", {
        description: "Um resumo da sessão será enviado para o aluno."
      })
    } catch (error) {
      toast.error("Erro ao encerrar sessão")
    }
  }

  const isDayWithSession = (day: Date) => {
    return calendarEvents.some(event => 
      event.date.getDate() === day.getDate() &&
      event.date.getMonth() === day.getMonth() &&
      event.date.getFullYear() === day.getFullYear()
    )
  }

  const getSessionCount = (day: Date) => {
    const event = calendarEvents.find(event => 
      event.date.getDate() === day.getDate() &&
      event.date.getMonth() === day.getMonth() &&
      event.date.getFullYear() === day.getFullYear()
    )
    return event?.sessions || 0
  }

  if (loading) {
    return <div className="container py-8">Carregando sessões...</div>
  }

  return (
    <div className="container py-8 space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Sessões de Mentoria
          </h1>
          <p className="text-slate-400">
            Gerencie suas sessões de mentoria
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="group overflow-hidden bg-gradient-to-br from-black/40 to-black/20 border-slate-800 hover:border-slate-700 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white">Próximas Sessões</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mentoringSessions.map((session) => (
              <div key={session.id} className="p-4 rounded-lg hover:bg-white/5 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-white">{session.student.name}</p>
                    <p className="text-sm text-slate-400">{session.title}</p>
                  </div>
                  <Badge variant="secondary" className="bg-slate-500/20 text-slate-400">
                    {format(new Date(session.date), "dd/MM")}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{format(new Date(session.dateHour), "HH:mm")}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {session.type === SessionType.CHAMADA_DE_VIDEO ? (
                      <Video className="w-4 h-4" />
                    ) : (
                      <MessageSquare className="w-4 h-4" />
                    )}
                    <span>{session.type === SessionType.CHAMADA_DE_VIDEO ? "Chamada de Vídeo" : "Chat"}</span>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="bg-white/5 border-slate-800 hover:bg-white/10 hover:border-slate-700 text-white"
                    onClick={() => handleAcceptMentoring(session.id)}
                  >
                    Aceitar
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => handleStartMentoring(session.id, session.type)}
                  >
                    Iniciar {session.type === SessionType.CHAMADA_DE_VIDEO ? "Chamada" : "Chat"}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="group overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800 hover:border-slate-700 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-purple-400" />
              Calendário de Mentorias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              locale={ptBR}
              modifiers={{ booked: isDayWithSession }}
              className="rounded-md border-slate-800 bg-slate-900/50"
              // Keep your existing classNames and components here
            />
            {isDayWithSession(date) && (
              <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-purple-400" />
                  {format(date, "dd 'de' MMMM", { locale: ptBR })}
                </h4>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30">
                    {getSessionCount(date)} sessões
                  </Badge>
                  <span className="text-sm text-slate-400">agendadas para este dia</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default MentorMentoria