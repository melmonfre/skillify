import { useState, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Send } from "lucide-react"
import { MessageMentorAPI } from "@/api/mentor/controllers/MessageMentorAPI"
import { MessageResponseDTO } from "@/api/dtos/messageDtos"
import { UserResponseDTO } from "@/api/dtos/userDtos"

interface CourseChatProps {
  studentId: string
  onSendMessage: (content: string) => void
}

interface ChatMessage {
  id: string
  user: {
    name: string
    avatar?: string
  }
  content: string
  timestamp: string
}

export function CourseChat({ studentId, onSendMessage }: CourseChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  
  const mentorId = localStorage.getItem('userId')

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true)
        const response = await MessageMentorAPI.getMessagesWithStudent(studentId)
        
        const chatMessages: ChatMessage[] = response.map((msg: MessageResponseDTO) => ({
          id: "", // Use real ID if available, fallback to timestamp
          user: {
            name: msg.remetente.id === mentorId ? "Você" : msg.remetente.name,
            avatar: undefined // UserResponseDTO doesn't have avatar
          },
          content: msg.content,
          timestamp: new Date().toLocaleTimeString([], { 
            hour: "2-digit", 
            minute: "2-digit" 
          }) // Mocked timestamp
        }))
        
        setMessages(chatMessages)
      } catch (error) {
        console.error('Failed to fetch messages:', error)
      } finally {
        setLoading(false)
      }
    }

    if (studentId && mentorId) {
      fetchMessages()
    }
  }, [studentId, mentorId])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !mentorId) return

    const optimisticMessage: ChatMessage = {
      id: Date.now().toString(),
      user: {
        name: "Você",
        avatar: undefined
      },
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { 
        hour: "2-digit", 
        minute: "2-digit" 
      })
    }

    // Optimistic update
    setMessages(prev => [...prev, optimisticMessage])
    setNewMessage("")

    try {
      await onSendMessage(newMessage)
      // After successful send, you might want to refetch messages
      // Or rely on the optimistic update if the API returns the new message
    } catch (error) {
      // Remove optimistic message on failure
      setMessages(prev => prev.filter(msg => msg.id !== optimisticMessage.id))
      console.error('Failed to send message:', error)
    }
  }

  return (
    <div className="flex flex-col h-full border rounded-lg">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Chat com Aluno
        </h3>
      </div>

      <ScrollArea className="flex-1 p-4">
        {loading ? (
          <div className="text-center text-muted-foreground">Carregando mensagens...</div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className="flex items-start gap-3"
              >
                <Avatar>
                  <AvatarImage src={message.user.avatar} />
                  <AvatarFallback>
                    {message.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{message.user.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {message.timestamp}
                    </span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!newMessage.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}