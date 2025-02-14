import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar as CalendarIcon, Clock, MessageSquare, Video } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { toast } from "sonner"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

// Mock de horários de mentoria
const initialMentoringSessions = [
  {
    id: "1",
    studentName: "Ana Silva",
    subject: "Dúvidas de Matemática",
    date: new Date(),
    time: "15:00",
    type: "video",
    status: "pending"
  },
  {
    id: "2",
    studentName: "Carlos Santos",
    subject: "Revisão de Redação",
    date: new Date(Date.now() + 24 * 60 * 60 * 1000),
    time: "16:30",
    type: "video",
    status: "confirmed"
  },
  {
    id: "3",
    studentName: "Pedro Oliveira",
    subject: "Orientação de Estudos",
    date: new Date(),
    time: "10:00",
    type: "chat",
    status: "pending"
  }
]

// Mock de eventos no calendário
const calendarEvents = [
  { date: new Date(), sessions: 3 },
  { date: new Date(Date.now() + 24 * 60 * 60 * 1000), sessions: 2 },
  { date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), sessions: 1 },
]

const MentorMentoria = () => {
  const [date, setDate] = useState<Date>(new Date())
  const [mentoringSessions, setMentoringSessions] = useState(initialMentoringSessions)
  const [activeSession, setActiveSession] = useState<string | null>(null)

  const handleAcceptMentoring = (sessionId: string) => {
    setMentoringSessions(sessions =>
      sessions.map(session =>
        session.id === sessionId
          ? { ...session, status: "confirmed" }
          : session
      )
    )
    toast.success("Mentoria aceita com sucesso!", {
      description: "O aluno será notificado da confirmação."
    })
  }

  const handleStartMentoring = (sessionId: string, type: string) => {
    // Verifica se já existe uma sessão ativa
    if (activeSession) {
      toast.error("Você já possui uma sessão ativa!", {
        description: "Finalize a sessão atual antes de iniciar uma nova."
      })
      return
    }

    setActiveSession(sessionId)
    setMentoringSessions(sessions =>
      sessions.map(session =>
        session.id === sessionId
          ? { ...session, status: "in_progress" }
          : session
      )
    )

    if (type === "video") {
      toast.success("Iniciando chamada de vídeo...", {
        description: "Aguardando aluno entrar na sala...",
        action: {
          label: "Cancelar chamada",
          onClick: () => handleEndSession(sessionId)
        }
      })

      // Simula conexão do aluno após 3 segundos
      setTimeout(() => {
        toast.success("Aluno conectado à chamada!", {
          description: "A sessão de mentoria começou."
        })
      }, 3000)
    } else {
      toast.success("Chat iniciado!", {
        description: "Você pode começar a conversar com o aluno.",
        action: {
          label: "Encerrar chat",
          onClick: () => handleEndSession(sessionId)
        }
      })
    }
  }

  const handleEndSession = (sessionId: string) => {
    setActiveSession(null)
    setMentoringSessions(sessions =>
      sessions.map(session =>
        session.id === sessionId
          ? { ...session, status: "completed" }
          : session
      )
    )
    toast.success("Sessão encerrada com sucesso!", {
      description: "Um resumo da sessão será enviado para o aluno."
    })
  }

  // Função para destacar dias com mentorias no calendário
  const isDayWithSession = (day: Date) => {
    return calendarEvents.some(event => 
      event.date.getDate() === day.getDate() &&
      event.date.getMonth() === day.getMonth() &&
      event.date.getFullYear() === day.getFullYear()
    )
  }

  // Função para mostrar número de sessões do dia
  const getSessionCount = (day: Date) => {
    const event = calendarEvents.find(event => 
      event.date.getDate() === day.getDate() &&
      event.date.getMonth() === day.getMonth() &&
      event.date.getFullYear() === day.getFullYear()
    )
    return event?.sessions || 0
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
                    <p className="font-medium text-white">{session.studentName}</p>
                    <p className="text-sm text-slate-400">{session.subject}</p>
                  </div>
                  <Badge 
                    variant={session.status === "in_progress" ? "default" : "secondary"}
                    className={
                      session.status === "in_progress" 
                        ? "bg-purple-500/20 text-purple-400" 
                        : "bg-slate-500/20 text-slate-400"
                    }
                  >
                    {session.date.getDate() === new Date().getDate() ? "Hoje" : "Amanhã"}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{session.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {session.type === "video" ? (
                      <Video className="w-4 h-4" />
                    ) : (
                      <MessageSquare className="w-4 h-4" />
                    )}
                    <span>{session.type === "video" ? "Chamada de Vídeo" : "Chat"}</span>
                  </div>
                </div>
                {session.status === "pending" ? (
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
                      Iniciar {session.type === "video" ? "Chamada" : "Chat"}
                    </Button>
                  </div>
                ) : session.status === "in_progress" ? (
                  <Button 
                    size="sm" 
                    variant="destructive"
                    className="w-full"
                    onClick={() => handleEndSession(session.id)}
                  >
                    Encerrar Sessão
                  </Button>
                ) : session.status === "confirmed" ? (
                  <Button 
                    size="sm" 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => handleStartMentoring(session.id, session.type)}
                  >
                    Iniciar {session.type === "video" ? "Chamada" : "Chat"}
                  </Button>
                ) : (
                  <Badge variant="secondary" className="w-full justify-center py-2">
                    Sessão Finalizada
                  </Badge>
                )}
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
              modifiers={{
                booked: (date) => isDayWithSession(date),
              }}
              className="rounded-md border-slate-800 bg-slate-900/50"
              classNames={{
                months: "space-y-4",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center px-8",
                caption_label: "text-sm font-medium text-white text-center",
                nav: "space-x-1 flex items-center absolute left-1 right-1",
                nav_button: "h-7 w-7 bg-slate-800 p-0 hover:bg-slate-700 text-white rounded-md transition-colors duration-200",
                nav_button_previous: "absolute left-0",
                nav_button_next: "absolute right-0",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-slate-400 rounded-md w-9 font-normal text-[0.8rem] uppercase",
                row: "flex w-full mt-2",
                cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-slate-800/50 [&:has([aria-selected])]:bg-slate-800",
                day: "h-9 w-9 p-0 font-normal text-slate-300 hover:bg-slate-800 rounded-md transition-colors duration-200",
                day_range_end: "day-range-end",
                day_selected: "bg-purple-600 text-white hover:bg-purple-700 hover:text-white focus:bg-purple-600 focus:text-white",
                day_today: "bg-slate-800 text-white",
                day_outside: "text-slate-500 opacity-50",
                day_disabled: "text-slate-500 opacity-50",
                day_hidden: "invisible",
              }}
              components={{
                DayContent: ({ date }) => (
                  <div className="relative w-full h-full p-2 flex items-center justify-center">
                    <span>{date.getDate()}</span>
                    {isDayWithSession(date) && (
                      <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-purple-400" />
                    )}
                  </div>
                ),
              }}
            />
            {isDayWithSession(date) && (
              <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-purple-400" />
                  {format(date, "dd 'de' MMMM", { locale: ptBR })}
                </h4>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="secondary" 
                    className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
                  >
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
