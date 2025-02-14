
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface NewMentorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (e: React.FormEvent) => void
}

const NewMentorDialog = ({ open, onOpenChange, onSubmit }: NewMentorDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Mentor</DialogTitle>
          <DialogDescription>
            Preencha os dados do novo mentor abaixo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input id="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="specialty">Especialidade</Label>
            <Input id="specialty" required />
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              Adicionar Mentor
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default NewMentorDialog
