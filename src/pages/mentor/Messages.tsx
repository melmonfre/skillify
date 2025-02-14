
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MessageCircle } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CourseChat } from "@/components/CourseChat"

interface Student {
  id: string
  name: string
  avatar?: string
  lastMessage: string
  time: string
  unread: boolean
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "João Silva",
    avatar: "/placeholder.svg",
    lastMessage: "Professor, tenho uma dúvida sobre o exercício 3...",
    time: "10:30",
    unread: true,
  },
  {
    id: "2",
    name: "Maria Santos",
    avatar: "/placeholder.svg",
    lastMessage: "Obrigada pela explicação!",
    time: "09:45",
    unread: false,
  },
  {
    id: "3",
    name: "Pedro Oliveira",
    avatar: "/placeholder.svg",
    lastMessage: "Quando teremos a próxima aula ao vivo?",
    time: "Ontem",
    unread: true,
  },
]

const MentorMessages = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredStudents = mockStudents.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container py-8 animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Mensagens
          </h1>
          <p className="text-slate-400">
            Gerencie suas conversas com os alunos
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-purple-400" />
              Conversas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Buscar alunos..."
                className="pl-8 bg-slate-900/50 border-slate-800 text-white placeholder:text-slate-400 focus-visible:ring-purple-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <ScrollArea className="h-[500px]">
              <div className="space-y-2">
                {filteredStudents.map((student) => (
                  <button
                    key={student.id}
                    className={`w-full p-3 rounded-lg text-left transition-colors ${
                      selectedStudent?.id === student.id
                        ? "bg-purple-500/10 border border-purple-500/20"
                        : "hover:bg-slate-800/50"
                    }`}
                    onClick={() => setSelectedStudent(student)}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback className="bg-purple-500/20 text-purple-400">{student.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-white">{student.name}</span>
                          <span className="text-xs text-slate-400">
                            {student.time}
                          </span>
                        </div>
                        <p className="text-sm text-slate-400 truncate">
                          {student.lastMessage}
                        </p>
                      </div>
                      {student.unread && (
                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800">
          {selectedStudent ? (
            <div className="h-[600px]">
              <CourseChat />
            </div>
          ) : (
            <div className="h-[600px] flex flex-col items-center justify-center text-slate-400">
              <MessageCircle className="w-12 h-12 mb-4" />
              <p>Selecione um aluno para iniciar uma conversa</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default MentorMessages
