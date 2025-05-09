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
import { Switch } from "@/components/ui/switch"
import { UserUpdateRequest, UserResponseDTO, UserRole } from "@/api/dtos/userDtos"

interface EditMentorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: UserUpdateRequest) => void
  mentor: UserResponseDTO | null
}

const EditMentorDialog = ({ open, onOpenChange, onSubmit, mentor }: EditMentorDialogProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const mentorData: UserUpdateRequest = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      tel: formData.get('tel') as string,
      biography: formData.get('biography') as string,
      expertise: formData.get('expertise') as string,
      emailNotifications: formData.get('emailNotifications') === 'on',
      pushNotifications: formData.get('pushNotifications') === 'on',
      weeklyReport: formData.get('weeklyReport') === 'on',
      studyReminder: formData.get('studyReminder') === 'on',
      role: UserRole.MENTOR,
    }
    onSubmit(mentorData)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Mentor</DialogTitle>
          <DialogDescription>
            Atualize os dados do mentor abaixo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input id="name" name="name" defaultValue={mentor?.name} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" defaultValue={mentor?.email} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tel">Telefone</Label>
            <Input id="tel" name="tel" type="tel" defaultValue={mentor?.tel} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="biography">Biografia</Label>
            <Input id="biography" name="biography" defaultValue={mentor?.biography} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expertise">Especialidade</Label>
            <Input id="expertise" name="expertise" defaultValue={mentor?.expertise} required />
          </div>
          <div className="space-y-2">
            <Label>Notificações</Label>
            <div className="flex items-center space-x-2">
              <Switch id="emailNotifications" name="emailNotifications" defaultChecked={mentor?.emailNotifications} />
              <Label htmlFor="emailNotifications">Notificações por Email</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="pushNotifications" name="pushNotifications" defaultChecked={mentor?.pushNotifications} />
              <Label htmlFor="pushNotifications">Notificações Push</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="weeklyReport" name="weeklyReport" defaultChecked={mentor?.weeklyReport} />
              <Label htmlFor="weeklyReport">Relatório Semanal</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="studyReminder" name="studyReminder" defaultChecked={mentor?.studyReminder} />
              <Label htmlFor="studyReminder">Lembrete de Estudo</Label>
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              Atualizar Mentor
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditMentorDialog