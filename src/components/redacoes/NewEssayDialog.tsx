
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface NewEssayForm {
  title: string
  description: string
  deadline: string
  minWords: string
  class: string
}

interface NewEssayDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  form: NewEssayForm
  onFormChange: (form: NewEssayForm) => void
  onSubmit: () => void
}

export const NewEssayDialog = ({ 
  open, 
  onOpenChange, 
  form, 
  onFormChange,
  onSubmit 
}: NewEssayDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-white">Nova Redação</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">Tema da Redação</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => onFormChange({ ...form, title: e.target.value })}
              placeholder="Digite o tema da redação..."
              className="bg-white/5 border-slate-800 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">Descrição</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => onFormChange({ ...form, description: e.target.value })}
              placeholder="Detalhes adicionais sobre o tema..."
              className="bg-white/5 border-slate-800 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minWords" className="text-white">Número Mínimo de Palavras</Label>
              <Input
                id="minWords"
                type="number"
                value={form.minWords}
                onChange={(e) => onFormChange({ ...form, minWords: e.target.value })}
                placeholder="Ex: 2500"
                className="bg-white/5 border-slate-800 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deadline" className="text-white">Prazo de Entrega</Label>
              <Input
                id="deadline"
                type="date"
                value={form.deadline}
                onChange={(e) => onFormChange({ ...form, deadline: e.target.value })}
                className="bg-white/5 border-slate-800 text-white"
              />
            </div>
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
            Criar Redação
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
