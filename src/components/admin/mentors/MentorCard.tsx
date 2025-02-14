
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Star, Users, BookOpen } from "lucide-react"

interface MentorCardProps {
  name: string
  specialty: string
  isActive?: boolean
  stats: {
    students: number
    rating: number
    courses: number
    responses: number
  }
  onMessage: (name: string) => void
  onViewProfile: (name: string) => void
}

const MentorCard = ({ 
  name, 
  specialty, 
  isActive = true, 
  stats, 
  onMessage, 
  onViewProfile 
}: MentorCardProps) => {
  return (
    <Card className="group hover:shadow-xl transition-all hover:-translate-y-1 bg-gradient-to-br from-card to-primary/5 border-primary/10">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl mb-1">{name}</CardTitle>
            <Badge variant="outline" className="bg-primary/10 text-primary hover:bg-primary/20">
              {specialty}
            </Badge>
          </div>
          <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20">
            {isActive ? "Ativo" : "Inativo"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span className="text-sm">Alunos Ativos</span>
              </div>
              <p className="text-2xl font-semibold">{stats.students}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm">Avaliação</span>
              </div>
              <p className="text-2xl font-semibold">{stats.rating}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm">Cursos</span>
              </div>
              <p className="text-2xl font-semibold">{stats.courses}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm">Respostas</span>
              </div>
              <p className="text-2xl font-semibold">{stats.responses}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <Button 
              variant="outline" 
              className="flex-1 border-primary/20 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 py-6"
              onClick={() => onMessage(name)}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Mensagem
            </Button>
            <Button 
              className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 py-6"
              onClick={() => onViewProfile(name)}
            >
              Ver Perfil
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default MentorCard
