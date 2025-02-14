
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Calendar, Star, Target } from "lucide-react"

export const LearningStats = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Estatísticas de Aprendizado
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Cursos Completos</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Horas Estudadas</p>
              <p className="text-2xl font-bold">48h</p>
            </div>
            <Calendar className="w-8 h-8 text-primary" />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Média Diária</p>
              <p className="text-2xl font-bold">2.5h</p>
            </div>
            <Star className="w-8 h-8 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
