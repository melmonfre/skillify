
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, UserPlus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import MentorCard from "@/components/admin/mentors/MentorCard"
import NewMentorDialog from "@/components/admin/mentors/NewMentorDialog"
import MessageDialog from "@/components/admin/mentors/MessageDialog"
import ProfileDialog from "@/components/admin/mentors/ProfileDialog"

const AdminMentors = () => {
  const { toast } = useToast()
  const [isNewMentorOpen, setIsNewMentorOpen] = useState(false)
  const [isMessageOpen, setIsMessageOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const handleNewMentor = (e: React.FormEvent) => {
    e.preventDefault()
    setIsNewMentorOpen(false)
    toast({
      title: "Mentor adicionado",
      description: "O novo mentor foi cadastrado com sucesso.",
    })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    setIsMessageOpen(false)
    toast({
      title: "Mensagem enviada",
      description: "Sua mensagem foi enviada com sucesso.",
    })
  }

  const openMessageDialog = (mentorName: string) => {
    setSelectedMentor(mentorName)
    setIsMessageOpen(true)
  }

  const openProfileDialog = (mentorName: string) => {
    setSelectedMentor(mentorName)
    setIsProfileOpen(true)
  }

  return (
    <div className="container py-8 space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Mentores
            <span className="text-primary ml-2">12</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Gerencie os mentores da plataforma e suas atribuições
          </p>
        </div>
        <Button 
          onClick={() => setIsNewMentorOpen(true)}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Novo Mentor
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar mentores por nome, especialidade..." 
            className="pl-10 py-6 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <MentorCard
          name="João Silva"
          specialty="Matemática"
          stats={{
            students: 32,
            rating: 4.8,
            courses: 4,
            responses: 156
          }}
          onMessage={openMessageDialog}
          onViewProfile={openProfileDialog}
        />
      </div>

      <NewMentorDialog
        open={isNewMentorOpen}
        onOpenChange={setIsNewMentorOpen}
        onSubmit={handleNewMentor}
      />

      <MessageDialog
        open={isMessageOpen}
        onOpenChange={setIsMessageOpen}
        onSubmit={handleSendMessage}
        mentorName={selectedMentor}
      />

      <ProfileDialog
        open={isProfileOpen}
        onOpenChange={setIsProfileOpen}
        mentorName={selectedMentor}
      />
    </div>
  )
}

export default AdminMentors
