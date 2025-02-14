
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Mail, BookOpen, MessageSquare, BarChart } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"
import { CourseChat } from "@/components/CourseChat"

const MentorStudents = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [selectedStudentChat, setSelectedStudentChat] = useState<string | null>(null)

  const handleViewProgress = (studentName: string) => {
    navigate("/mentor/progresso")
    toast({
      title: "Progresso do Aluno",
      description: `Visualizando progresso de ${studentName}`,
    })
  }

  const StudentCard = ({ name, initials, email, courses, progress }: {
    name: string,
    initials: string,
    email: string,
    courses: string,
    progress: number
  }) => (
    <Card className="relative group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-primary/5">
      <CardHeader className="pb-2 px-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
            {initials}
          </span>
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <div className="space-y-2 pb-12">
          <div>
            <p className="text-sm font-medium">Email</p>
            <div className="flex items-center gap-2 mt-0.5">
              <Mail className="w-3.5 h-3.5 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">{email}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">Cursos Matriculados</p>
            <div className="flex items-center gap-2 mt-0.5">
              <BookOpen className="w-3.5 h-3.5 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">{courses}</p>
            </div>
          </div>
          <div>
            <div className="h-1.5 bg-primary/10 rounded-full overflow-hidden mt-2">
              <div 
                className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1 text-center">
              {progress}% de progresso geral
            </p>
          </div>
        </div>
        <div className="absolute bottom-3 left-4 right-4 grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            onClick={() => setSelectedStudentChat(name.split(" ")[0].toLowerCase())}
            className="hover:bg-primary/5 h-7 text-xs px-2"
          >
            <MessageSquare className="w-3 h-3 mr-1" />
            Mensagem
          </Button>
          <Button 
            onClick={() => handleViewProgress(name)}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white h-7 text-xs px-2"
          >
            <BarChart className="w-3 h-3 mr-1" />
            Progresso
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Meus Alunos
          </h1>
          <p className="text-muted-foreground">
            Gerencie os alunos dos seus cursos
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar alunos..." className="pl-10 py-6 text-lg" />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        <StudentCard 
          name="Ana Silva"
          initials="AS"
          email="ana.silva@email.com"
          courses="TypeScript, React"
          progress={75}
        />
        
        <StudentCard 
          name="Carlos Oliveira"
          initials="CO"
          email="carlos.o@email.com"
          courses="React Fundamentals"
          progress={45}
        />
      </div>

      {/* Chat Dialog */}
      <Dialog open={!!selectedStudentChat} onOpenChange={() => setSelectedStudentChat(null)}>
        <DialogContent className="sm:max-w-[500px] h-[600px]">
          <DialogHeader>
            <DialogTitle>Chat com {selectedStudentChat === "ana" ? "Ana Silva" : "Carlos Oliveira"}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 -mx-6 -mb-6">
            <CourseChat />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default MentorStudents
