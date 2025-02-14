
import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Send } from "lucide-react"

interface Message {
  id: string
  user: {
    name: string
    avatar?: string
  }
  content: string
  timestamp: string
}

export function CourseChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      user: {
        name: "John Doe",
        avatar: "/placeholder.svg",
      },
      content: "Alguém pode me ajudar com o exercício 3?",
      timestamp: "10:30",
    },
    {
      id: "2",
      user: {
        name: "Jane Smith",
        avatar: "/placeholder.svg",
      },
      content: "Claro! Em qual parte você está tendo dificuldade?",
      timestamp: "10:32",
    },
  ])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      user: {
        name: "Você",
        avatar: "/placeholder.svg",
      },
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { 
        hour: "2-digit", 
        minute: "2-digit" 
      }),
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  return (
    <div className="flex flex-col h-full border rounded-lg">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Chat da Turma
        </h3>
      </div>

      <ScrollArea className="flex-1 p-4">
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
      </ScrollArea>

      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}
