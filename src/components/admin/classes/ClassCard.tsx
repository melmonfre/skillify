
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Users, Link as LinkIcon, Edit, Trash2, Calendar } from "lucide-react"

interface ClassItemProps {
  name: string
  mentor: string
  status: string
  students: number
  startDate: string
  progress: number
  onGenerateLink: (name: string) => void
  onEdit: (name: string) => void
  onDelete: (name: string) => void
}

export function ClassCard({ 
  name, 
  mentor, 
  status, 
  students, 
  startDate, 
  progress,
  onGenerateLink,
  onEdit,
  onDelete
}: ClassItemProps) {
  return (
    <Card className="group flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-primary/5">
      <CardHeader className="pb-4 flex-1">
        <div className="flex justify-between items-start">
          <Badge 
            variant="outline" 
            className={`${
              status === "Em andamento" 
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
            }`}
          >
            {status}
          </Badge>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">{students} alunos</span>
          </div>
        </div>

        <div className="mt-4">
          <CardTitle className="text-xl line-clamp-1">{name}</CardTitle>
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <div className="flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <p className="text-sm text-muted-foreground truncate">Mentor: {mentor}</p>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <p className="text-sm text-muted-foreground">Início: {startDate}</p>
          </div>
        </div>

        {progress > 0 && (
          <div className="mt-4">
            <div className="flex justify-between items-center text-muted-foreground mb-2">
              <span className="text-sm">Progresso</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <div className="h-2 bg-primary/10 rounded-full overflow-hidden w-full">
              <div 
                className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        <div className="grid grid-cols-3 gap-2">
          <Button 
            variant="outline" 
            className="w-full h-auto py-2 px-2 border-primary/20 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300"
            onClick={() => onGenerateLink(name)}
          >
            <div className="flex flex-col items-center gap-1">
              <LinkIcon className="w-4 h-4" />
              <span className="text-xs">Gerar Link</span>
            </div>
          </Button>
          <Button 
            variant="outline"
            className="w-full h-auto py-2 px-2 border-primary/20 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300"
            onClick={() => onEdit(name)}
          >
            <div className="flex flex-col items-center gap-1">
              <Edit className="w-4 h-4" />
              <span className="text-xs">Editar</span>
            </div>
          </Button>
          <Button 
            variant="destructive" 
            className="w-full h-auto py-2 px-2 hover:bg-red-700 transition-all duration-300"
            onClick={() => onDelete(name)}
          >
            <div className="flex flex-col items-center gap-1">
              <Trash2 className="w-4 h-4" />
              <span className="text-xs">Remover</span>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
