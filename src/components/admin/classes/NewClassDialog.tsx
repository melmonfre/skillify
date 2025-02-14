
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

interface NewClassDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (e: React.FormEvent) => void
}

export function NewClassDialog({ open, onOpenChange, onSubmit }: NewClassDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Nova Turma</DialogTitle>
          <DialogDescription>
            Preencha as informações da nova turma abaixo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da turma</Label>
            <Input id="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mentor">Mentor responsável</Label>
            <Select>
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
            <Label htmlFor="course">Curso</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um curso" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="react">React Avançado</SelectItem>
                <SelectItem value="node">Node.js</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
            >
              Criar Turma
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
