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
import { useState, useEffect } from 'react'
import { UserAdminAPI } from '@/api/admin/controllers/UserAdminAPI'
import { UserResponseDTO, UserRole } from "@/api/dtos/userDtos"

interface NewClassDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (e: React.FormEvent, values: { name: string; mentorId: string }) => void
}

export function NewClassDialog({ open, onOpenChange, onSubmit }: NewClassDialogProps) {
  const [mentors, setMentors] = useState<UserResponseDTO[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true)
        const mentorUsers = await UserAdminAPI.getAllMentors()
        setMentors(mentorUsers)
      } catch (error) {
        console.error('Failed to fetch mentors:', error)
      } finally {
        setLoading(false)
      }
    }

    if (open) {
      fetchMentors()
    }
  }, [open])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const values = {
      name: formData.get('name') as string,
      mentorId: formData.get('mentor') as string,
    }
    onSubmit(e, values)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Nova Turma</DialogTitle>
          <DialogDescription>
            Preencha as informações da nova turma abaixo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da turma</Label>
            <Input id="name" name="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mentor">Mentor responsável</Label>
            <Select name="mentor" disabled={loading}>
              <SelectTrigger>
                <SelectValue 
                  placeholder={
                    loading ? "Carregando mentores..." : "Selecione um mentor"
                  } 
                />
              </SelectTrigger>
              <SelectContent>
                {mentors.map((mentor) => (
                  <SelectItem key={mentor.id} value={mentor.id}>
                    {mentor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button 
              type="submit"
              disabled={loading}
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