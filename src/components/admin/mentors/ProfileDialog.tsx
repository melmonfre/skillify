
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface ProfileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mentorName: string | null
}

const ProfileDialog = ({ open, onOpenChange, mentorName }: ProfileDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Perfil do Mentor</DialogTitle>
          <DialogDescription>
            Detalhes completos do perfil de {mentorName}.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Nome</Label>
              <p className="text-lg font-medium mt-1">João Silva</p>
            </div>
            <div>
              <Label>Email</Label>
              <p className="text-lg font-medium mt-1">joao.silva@exemplo.com</p>
            </div>
            <div>
              <Label>Especialidade</Label>
              <div className="mt-1">
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  Matemática
                </Badge>
              </div>
            </div>
            <div>
              <Label>Status</Label>
              <div className="mt-1">
                <Badge className="bg-emerald-500/10 text-emerald-600">
                  Ativo
                </Badge>
              </div>
            </div>
          </div>
          
          <div>
            <Label>Biografia</Label>
            <p className="text-muted-foreground mt-1">
              Professor com mais de 10 anos de experiência em ensino de matemática.
              Especializado em preparação para vestibular e olimpíadas.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-6 bg-primary/5 rounded-xl">
              <p className="text-3xl font-bold text-primary">32</p>
              <p className="text-sm text-muted-foreground mt-1">Alunos Ativos</p>
            </div>
            <div className="text-center p-6 bg-primary/5 rounded-xl">
              <p className="text-3xl font-bold text-primary">4.8</p>
              <p className="text-sm text-muted-foreground mt-1">Avaliação Média</p>
            </div>
            <div className="text-center p-6 bg-primary/5 rounded-xl">
              <p className="text-3xl font-bold text-primary">4</p>
              <p className="text-sm text-muted-foreground mt-1">Cursos Ativos</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProfileDialog
