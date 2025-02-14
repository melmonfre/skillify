
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
            <Select value={form.class} onValueChange={(value) => onFormChange({ ...form, class: value })}>
              <SelectTrigger className="bg-white/5 border-slate-800 text-white">
                <SelectValue placeholder="Selecione uma turma" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-800">
                <SelectItem value="turma-1">Turma A - Manhã</SelectItem>
                <SelectItem value="turma-2">Turma B - Tarde</SelectItem>
                <SelectItem value="turma-3">Turma C - Noite</SelectItem>
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
          >
            Criar Simulado
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
