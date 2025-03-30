import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Mail, BookOpen, MessageSquare, BarChart, Send } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState, useEffect } from "react"
import { UserMentorAPI } from "@/api/mentor/controllers/UserMentorAPI"
import { UserResponseDTO } from "@/api/dtos/userDtos"
import { MessageResponseDTO, MessageCreateDTO } from "@/api/dtos/messageDtos"
import { MessageMentorAPI } from "@/api/mentor/controllers/MessageMentorAPI"

const MentorStudents = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [selectedStudentChat, setSelectedStudentChat] = useState<string | null>(null)
  const [students, setStudents] = useState<UserResponseDTO[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState<MessageResponseDTO[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [chatLoading, setChatLoading] = useState(false)

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true)
        const studentData = await UserMentorAPI.getAllStudents()
        setStudents(studentData)
      } catch (error) {
        toast({
          title: "Erro",
          description: "Falha ao carregar os alunos",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [toast])

  // Fetch messages when chat opens
  useEffect(() => {
    if (selectedStudentChat) {
      fetchMessages(selectedStudentChat)
    }
  }, [selectedStudentChat])

  const fetchMessages = async (studentId: string) => {
    try {
      setChatLoading(true)
      const messageData = await MessageMentorAPI.getMessagesWithStudent(studentId)
      setMessages(messageData)
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao carregar mensagens",
        variant: "destructive"
      })
    } finally {
      setChatLoading(false)
    }
  }

  const sendMessage = async (studentId: string) => {
    if (!newMessage.trim()) return

    try {
      const message: MessageCreateDTO = {
        remetenteId: localStorage.getItem("userId"), // Should come from auth context
        destinatarioId: studentId,
        content: newMessage
      }
      
      const sentMessage = await MessageMentorAPI.sendMessage(message)
      setMessages(prev => [...prev, sentMessage])
      setNewMessage("")
      toast({
        title: "Sucesso",
        description: "Mensagem enviada",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao enviar mensagem",
        variant: "destructive"
      })
    }
  }

  const handleViewProgress = (studentName: string) => {
    navigate("/mentor/progresso")
    toast({
      title: "Progresso do Aluno",
      description: `Visualizando progresso de ${studentName}`,
    })
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()
  }

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const StudentCard = ({ student }: { student: UserResponseDTO }) => (
    <Card className="relative group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-primary/5">
      <CardHeader className="pb-2 px-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
            {getInitials(student.name)}
          </span>
          {student.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <div className="space-y-2 pb-12">
          <div>
            <p className="text-sm font-medium">Email</p>
            <p className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
              <Mail className="w-3.5 h-3.5 text-muted-foreground" />
              {student.email}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Cursos Matriculados</p>
            <p className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
              <BookOpen className="w-3.5 h-3.5 text-muted-foreground" />
              N/A
            </p>
          </div>
          <div>
            <div className="h-1.5 bg-primary/10 rounded-full overflow-hidden mt-2">
              <div 
                className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300"
                style={{ width: "0%" }} 
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1 text-center">
              Progresso não disponível
            </p>
          </div>
        </div>
        <div className="absolute bottom-3 left-4 right-4 grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            onClick={() => setSelectedStudentChat(student.id)}
            className="hover:bg-primary/5 h-7 text-xs px-2"
          >
            <MessageSquare className="w-3 h-3 mr-1" />
            Mensagem
          </Button>
          <Button 
            onClick={() => handleViewProgress(student.name)}
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
          <Input 
            placeholder="Buscar alunos..." 
            className="pl-10 py-6 text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center">Carregando alunos...</div>
      ) : filteredStudents.length === 0 ? (
        <div className="text-center">Nenhum aluno encontrado</div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filteredStudents.map(student => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      )}

      {/* Chat Dialog */}
      <Dialog open={!!selectedStudentChat} onOpenChange={() => setSelectedStudentChat(null)}>
        <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col">
          <DialogHeader>
            <DialogTitle>
              Chat com {students.find(s => s.id === selectedStudentChat)?.name || ""}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatLoading ? (
              <div className="text-center">Carregando mensagens...</div>
            ) : messages.length === 0 ? (
              <div className="text-center text-muted-foreground">
                Nenhuma mensagem ainda
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.content + Math.random()} // Should use a proper message ID
                  className={`flex ${
                    msg.remetente.id === "current-mentor-id" 
                      ? "justify-end" 
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] p-2 rounded-lg ${
                      msg.remetente.id === "current-mentor-id"
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                        : "bg-muted"
                    }`}
                  >
                    <p>{msg.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (selectedStudentChat) sendMessage(selectedStudentChat)
              }}
              className="flex gap-2"
            >
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default MentorStudents