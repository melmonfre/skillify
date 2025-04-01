import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MessageCircle } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CourseChat } from "@/components/CourseChat"
import { MessageStudentAPI } from "@/api/student/controllers/MessageStudentAPI"
import { MessageResponseDTO } from "@/api/dtos/messageDtos"
import { UserResponseDTO, UserRole } from "@/api/dtos/userDtos"

interface MentorChat {
  id: string
  name: string
  avatar?: string
  lastMessage?: string
  time?: string
  unread: boolean
}

const StudentMessages = () => {
  const [selectedMentor, setSelectedMentor] = useState<MentorChat | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [mentorsWithChats, setMentorsWithChats] = useState<MentorChat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const studentId = localStorage.getItem('userId')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const receivedMessages = await MessageStudentAPI.getReceivedMessages()
        const sentMessages = await MessageStudentAPI.getSentMessages()
        const allMessages = [...receivedMessages, ...sentMessages]
        
        const mentorMap = new Map<string, MentorChat>()
        allMessages.forEach((message: MessageResponseDTO) => {
          const mentor = message.remetente.role === UserRole.MENTOR 
            ? message.remetente 
            : message.destinatario.role === UserRole.MENTOR 
              ? message.destinatario 
              : null
          
          if (mentor && mentor.role === UserRole.MENTOR) {
            const mentorId = mentor.id
            if (!mentorMap.has(mentorId)) {
              mentorMap.set(mentorId, {
                id: mentorId,
                name: mentor.name,
                avatar: undefined,
                lastMessage: message.content,
                time: new Date().toLocaleTimeString(),
                unread: false
              })
            }
          }
        })
        const mentorsWithChatsList = Array.from(mentorMap.values())
        setMentorsWithChats(mentorsWithChatsList)

        if (mentorsWithChatsList.length === 0) {
          setError('Nenhuma conversa com mentores encontrada')
        }
      } catch (error) {
        console.error('Failed to fetch data:', error)
        setError('Erro ao carregar mensagens. Tente novamente.')
      } finally {
        setLoading(false)
      }
    }

    if (studentId) {
      fetchData()
    } else {
      setError('ID do estudante não encontrado no localStorage')
      setLoading(false)
    }
  }, [studentId])

  const filteredMentors = mentorsWithChats.filter(mentor => 
    mentor.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSendMessage = async (content: string) => {
    if (!selectedMentor || !studentId) return

    try {
      const messageData = {
        remetenteId: studentId,
        destinatarioId: selectedMentor.id,
        content
      }
      
      const sentMessage = await MessageStudentAPI.sendMessage(messageData)
      
      setMentorsWithChats(prev => {
        const updated = prev.filter(m => m.id !== selectedMentor.id)
        const updatedMentor: MentorChat = {
          ...selectedMentor,
          lastMessage: sentMessage.content,
          time: new Date().toLocaleTimeString(),
          unread: false
        }
        return [...updated, updatedMentor]
      })
      setSelectedMentor({
        ...selectedMentor,  // Fixed typo here: changed 'selectedMentorasa' to 'selectedMentor'
        lastMessage: content,
        time: new Date().toLocaleTimeString()
      })
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  return (
    <div className="container py-8 animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Mensagens
          </h1>
          <p className="text-slate-400">
            Converse com seus mentores
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
                placeholder="Buscar mentores..."
                className="pl-8 bg-slate-900/50 border-slate-800 text-white placeholder:text-slate-400 focus-visible:ring-purple-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <ScrollArea className="h-[500px]">
              {loading ? (
                <div className="text-slate-400 text-center py-4">Carregando...</div>
              ) : error ? (
                <div className="text-red-400 text-center py-4">{error}</div>
              ) : (
                <div className="space-y-4">
                  {filteredMentors.length > 0 ? (
                    filteredMentors.map((mentor) => (
                      <button
                        key={mentor.id}
                        className={`w-full p-3 rounded-lg text-left transition-colors ${
                          selectedMentor?.id === mentor.id
                            ? "bg-purple-500/10 border border-purple-500/20"
                            : "hover:bg-slate-800/50"
                        }`}
                        onClick={() => setSelectedMentor(mentor)}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarImage src={mentor.avatar} />
                            <AvatarFallback className="bg-purple-500/20 text-purple-400">{mentor.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-white">{mentor.name}</span>
                              <span className="text-xs text-slate-400">
                                {mentor.time}
                              </span>
                            </div>
                            <p className="text-sm text-slate-400 truncate">
                              {mentor.lastMessage}
                            </p>
                          </div>
                          {mentor.unread && (
                            <div className="w-2 h-2 rounded-full bg-purple-500" />
                          )}
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="text-slate-400 text-center py-4">
                      Nenhuma conversa encontrada
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800">
          {selectedMentor && studentId ? (
            <div className="h-[600px]">
              <CourseChat 
                studentId={studentId}
                onSendMessage={handleSendMessage}
              />
            </div>
          ) : (
            <div className="h-[600px] flex flex-col items-center justify-center text-slate-400">
              <MessageCircle className="w-12 h-12 mb-4" />
              <p>Selecione um mentor para iniciar uma conversa</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default StudentMessages