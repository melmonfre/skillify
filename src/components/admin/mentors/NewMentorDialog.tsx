// NewMentorDialog.tsx
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
import { RegisterRequest } from "@/api/dtos/authDtos"
import { UserRole } from "@/api/dtos/userDtos"

interface NewMentorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: RegisterRequest) => void
}

const NewMentorDialog = ({ open, onOpenChange, onSubmit }: NewMentorDialogProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const mentorData: RegisterRequest = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      tel: formData.get('tel') as string || undefined,
      biography: formData.get('biography') as string || undefined,
      emailNotifications: formData.get('emailNotifications') === 'on',
      pushNotifications: formData.get('pushNotifications') === 'on',
      weeklyReport: formData.get('weeklyReport') === 'on',
      studyReminder: formData.get('studyReminder') === 'on',
      role: UserRole.MENTOR,
      expertise: formData.get('specialty') as string || undefined,
      classId: undefined, // Optional field, not included in form for now
    }
    onSubmit(mentorData)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Mentor</DialogTitle>
          <DialogDescription>
            Preencha os dados do novo mentor abaixo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input id="name" name="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tel">Telefone</Label>
            <Input id="tel" name="tel" type="tel" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="biography">Biografia</Label>
            <Input id="biography" name="biography" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="specialty">Especialidade</Label>
            <Input id="specialty" name="specialty" required />
          </div>
          {/* Optional notification settings could be added as checkboxes if desired */}
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