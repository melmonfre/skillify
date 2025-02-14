
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface EditClassDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (e: React.FormEvent) => void
  selectedClass: string | null
}

export function EditClassDialog({ open, onOpenChange, onSubmit, selectedClass }: EditClassDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Turma</DialogTitle>
          <DialogDescription>
            Atualize as informações da turma {selectedClass}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Nome da turma</Label>
            <Input id="edit-name" defaultValue={selectedClass || ""} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-mentor">Mentor responsável</Label>
            <Select defaultValue="joao">
              <SelectTrigger>
                <SelectValue placeholder="Selecione um mentor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="joao">João Silva</SelectItem>
                <SelectItem value="maria">Maria Santos</SelectItem>
                <SelectItem value="pedro">Pedro Oliveira</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-status">Status</Label>
            <Select defaultValue="em_andamento">
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="em_andamento">Em andamento</SelectItem>
                <SelectItem value="iniciando">Iniciando</SelectItem>
                <SelectItem value="concluida">Concluída</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
            >
              Salvar Alterações
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
