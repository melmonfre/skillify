
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { availableMentors } from "@/data/mock"
import { useNavigate, useParams } from "react-router-dom"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
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

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00",
  "14:00", "15:00", "16:00", "17:00"
]

const ScheduleMentoring = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const mentor = availableMentors.find(m => m.id === id)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const handleSchedule = () => {
    console.log('handleSchedule called')
    console.log('selectedDate:', selectedDate)
    console.log('selectedTime:', selectedTime)
    
    if (!selectedDate || !selectedTime) {
      toast.error("Selecione uma data e horário")
      return
    }
    
    console.log('Opening dialog')
    setShowConfirmDialog(true)
  }

  const handleConfirmSchedule = () => {
    console.log('handleConfirmSchedule called')
    toast.success("Mentoria agendada com sucesso!")
    setShowConfirmDialog(false)
    navigate("/mentoria")
  }

  if (!mentor) {
    console.log('Mentor not found:', id)
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold">Mentor não encontrado</h1>
        <p className="text-muted-foreground">O mentor selecionado não está disponível</p>
      </div>
    )
  }

  console.log('Rendering with mentor:', mentor.name)
  console.log('Dialog state:', showConfirmDialog)

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
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleConfirmSchedule}>
              Confirmar Agendamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ScheduleMentoring
