import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { ClassroomMentorAPI } from "@/api/mentor/controllers/ClassroomMentorAPI"
import { ClassroomResponseDTO } from "@/api/dtos/classroomDtos"

interface SimuladoForm {
  title: string
  totalQuestions: string
  duration: string
  date: string
  class: string
  subjects: string[]
}

interface NovoSimuladoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  form: SimuladoForm
  onFormChange: (form: SimuladoForm) => void
  onSubmit: () => void
}

export function NovoSimuladoDialog({
  open,
  onOpenChange,
  form,
  onFormChange,
  onSubmit
}: NovoSimuladoDialogProps) {
  const [classrooms, setClassrooms] = useState<ClassroomResponseDTO[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch classrooms when dialog opens
  useEffect(() => {
    if (open) {
      const fetchClassrooms = async () => {
        try {
          setLoading(true)
          const response = await ClassroomMentorAPI.getAllClassrooms()
          setClassrooms(response)
        } catch (error) {
          console.error('Failed to fetch classrooms:', error)
          setClassrooms([])
        } finally {
          setLoading(false)
        }
      }
      fetchClassrooms()
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-white">Novo Simulado</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">Título do Simulado</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => onFormChange({ ...form, title: e.target.value })}
              placeholder="Ex: Simulado ENEM 2024"
              className="bg-white/5 border-slate-800 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalQuestions" className="text-white">Total de Questões</Label>
              <Input
                id="totalQuestions"
                type="number"
                value={form.totalQuestions}
                onChange={(e) => onFormChange({ ...form, totalQuestions: e.target.value })}
                placeholder="Ex: 90"
                className="bg-white/5 border-slate-800 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-white">Duração (minutos)</Label>
              <Input
                id="duration"
                type="number"
                value={form.duration}
                onChange={(e) => onFormChange({ ...form, duration: e.target.value })}
                placeholder="Ex: 300"
                className="bg-white/5 border-slate-800 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-white">Data do Simulado</Label>
            <Input
              id="date"
              type="date"
              value={form.date}
              onChange={(e) => onFormChange({ ...form, date: e.target.value })}
              className="bg-white/5 border-slate-800 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="class" className="text-white">Turma</Label>
            <Select 
              value={form.class} 
              onValueChange={(value) => onFormChange({ ...form, class: value })}
              disabled={loading}
            >
              <SelectTrigger className="bg-white/5 border-slate-800 text-white">
                <SelectValue placeholder={loading ? "Carregando turmas..." : "Selecione uma turma"} />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-800">
                {classrooms.length > 0 ? (
                  classrooms.map((classroom) => (
                    <SelectItem 
                      key={classroom.id} 
                      value={classroom.id}
                      className="text-white hover:bg-slate-800"
                    >
                      {classroom.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-classrooms" disabled className="text-slate-400">
                    Nenhuma turma encontrada
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="bg-white/5 border-slate-800 hover:bg-white/10 hover:border-slate-700 text-white"
          >
            Cancelar
          </Button>
          <Button 
            onClick={onSubmit}
            className="bg-purple-600 hover:bg-purple-700 text-white border-none"
            disabled={loading}
          >
            Criar Simulado
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}