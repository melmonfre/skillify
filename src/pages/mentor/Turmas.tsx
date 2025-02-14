
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Users, Link as LinkIcon, Calendar, GraduationCap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

const MentorTurmas = () => {
  const { toast } = useToast()
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const handleGenerateLink = (className: string) => {
    setSelectedClass(className)
    setIsLinkDialogOpen(true)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://plataforma.edu/cadastro/turma/${selectedClass}`)
    toast({
      title: "Link copiado!",
      description: "O link de cadastro foi copiado para sua área de transferência.",
    })
    setIsLinkDialogOpen(false)
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Minhas Turmas
          </h1>
          <p className="text-muted-foreground mt-2">
            Gerencie suas turmas e compartilhe links de cadastro
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Buscar turmas..." 
            className="pl-10 py-6 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-primary/5">
          <CardHeader>
            <div className="flex justify-between items-start mb-4">
              <Badge variant="outline" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                Em andamento
              </Badge>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">32 alunos</span>
              </div>
            </div>
            <CardTitle className="text-xl mb-4">Turma A - TypeScript Avançado</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Início: 15/03/2024</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
              <GraduationCap className="w-4 h-4" />
              <span>12 aulas planejadas</span>
            </div>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => handleGenerateLink("typescript-a")}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
            >
              <LinkIcon className="w-4 h-4 mr-2" />
              Gerar Link de Cadastro
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-primary/5">
          <CardHeader>
            <div className="flex justify-between items-start mb-4">
              <Badge variant="outline" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                Planejada
              </Badge>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">0 alunos</span>
              </div>
            </div>
            <CardTitle className="text-xl mb-4">Turma B - React Fundamentals</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Início: 01/04/2024</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
              <GraduationCap className="w-4 h-4" />
              <span>8 aulas planejadas</span>
            </div>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => handleGenerateLink("react-b")}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
            >
              <LinkIcon className="w-4 h-4 mr-2" />
              Gerar Link de Cadastro
            </Button>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Link de Cadastro</DialogTitle>
            <DialogDescription>
              Compartilhe este link com os alunos para que eles possam se cadastrar na turma.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg break-all">
              https://plataforma.edu/cadastro/turma/{selectedClass}
            </div>
            <Button 
              onClick={handleCopyLink}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
            >
              <LinkIcon className="w-4 h-4 mr-2" />
              Copiar Link
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default MentorTurmas
