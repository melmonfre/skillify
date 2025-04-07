import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useNavigate, useParams } from "react-router-dom"
import { Calendar } from "@/components/ui/calendar"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { TutorSessionStudentAPI } from "@/api/student/controllers/TutorSessionStudentAPI"
import { TutorSessionCreateDTO, SessionType } from "@/api/dtos/tutorSessionDtos"
import { UserStudentAPI } from "@/api/student/controllers/UserStudentAPI"
import { UserResponseDTO } from "@/api/dtos/userDtos"

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00",
  "14:00", "15:00", "16:00", "17:00"
]

const ScheduleMentoring = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [mentor, setMentor] = useState<UserResponseDTO | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        setIsLoading(true)
        const mentors = await UserStudentAPI.findAvailableMentors()
        const selectedMentor = mentors.find(m => m.id === id)
        setMentor(selectedMentor || null)
      } catch (error) {
        toast.error("Erro ao carregar informações do mentor")
        console.error('Error fetching mentor:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMentor()
  }, [id])

  const handleSchedule = () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Selecione uma data e horário")
      return
    }
    setShowConfirmDialog(true)
  }

  const handleConfirmSchedule = async () => {
    if (!selectedDate || !selectedTime || !mentor) return;

    setIsSubmitting(true)
    try {
      const [hours, minutes] = selectedTime.split(':')
      const dateHour = new Date(selectedDate)
      dateHour.setHours(parseInt(hours), parseInt(minutes), 0, 0)
      
      const sessionDTO: TutorSessionCreateDTO = {
        mentorId: mentor.id,
        title: `Mentoria com ${mentor.name}`,
        date: format(selectedDate, "yyyy-MM-dd"),
        dateHour: dateHour.toISOString(),
        type: SessionType.CHAMADA_DE_VIDEO,
        link: "",
        studentId: "" // Will be set by backend
      }

      await TutorSessionStudentAPI.requestTutorSession(sessionDTO)
      toast.success("Mentoria agendada com sucesso!")
      setShowConfirmDialog(false)
      navigate("/mentoria")
    } catch (error) {
      toast.error("Erro ao agendar mentoria")
      console.error('Schedule error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container py-8">
        <p>Carregando informações do mentor...</p>
      </div>
    )
  }

  if (!mentor) {
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold">Mentor não encontrado</h1>
        <p className="text-muted-foreground">O mentor selecionado não está disponível</p>
      </div>
    )
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Agendar Mentoria</h1>
          <p className="text-muted-foreground">
            Escolha um horário com {mentor.name}
          </p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6 bg-background">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />
        </Card>

        <Card className="p-6 bg-background">
          <h3 className="text-lg font-semibold mb-4">Horários Disponíveis</h3>
          <div className="grid grid-cols-2 gap-4">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                className="w-full"
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </Button>
            ))}
          </div>
          <Button 
            className="w-full mt-8"
            onClick={handleSchedule}
            disabled={isSubmitting}
          >
            Agendar Mentoria
          </Button>
        </Card>
      </div>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Agendamento</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-2">
            <p>Deseja confirmar o agendamento da mentoria com {mentor.name}?</p>
            {selectedDate && (
              <p className="text-muted-foreground">
                Data: {format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </p>
            )}
            {selectedTime && (
              <p className="text-muted-foreground">
                Horário: {selectedTime}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowConfirmDialog(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleConfirmSchedule}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Agendando..." : "Confirmar Agendamento"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ScheduleMentoring