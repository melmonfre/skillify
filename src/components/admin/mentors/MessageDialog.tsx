
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
import { Textarea } from "@/components/ui/textarea"

interface MessageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (e: React.FormEvent) => void
  mentorName: string | null
}

const MessageDialog = ({ open, onOpenChange, onSubmit, mentorName }: MessageDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enviar Mensagem</DialogTitle>
          <DialogDescription>
            Envie uma mensagem para {mentorName}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="message">Mensagem</Label>
            <Textarea id="message" required className="min-h-[100px]" />
          </div>
          <DialogFooter>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              Enviar Mensagem
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default MessageDialog
