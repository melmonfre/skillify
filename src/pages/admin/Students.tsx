
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Edit, Trash2, GraduationCap, BookOpen, Medal, Star, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const AdminStudents = () => {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)

  const handleDeleteStudent = () => {
    setIsDeleteDialogOpen(false)
    toast({
      title: "Aluno removido",
      description: `O aluno ${selectedStudent} foi removido com sucesso.`,
    })
  }

  const handleEditStudent = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditDialogOpen(false)
    toast({
      title: "Aluno atualizado",
      description: `As informações de ${selectedStudent} foram atualizadas com sucesso.`,
    })
  }

  const openDeleteDialog = (studentName: string) => {
    setSelectedStudent(studentName)
    setIsDeleteDialogOpen(true)
  }

  const openEditDialog = (studentName: string) => {
    setSelectedStudent(studentName)
    setIsEditDialogOpen(true)
  }

  return (
    <div className="container py-8 space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Alunos
            <span className="text-primary ml-2">48</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Visualize e gerencie os alunos da plataforma
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar alunos por nome, email ou turma..." 
            className="pl-10 py-6 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {["Maria Santos", "João Silva", "Ana Oliveira"].map((student) => (
          <Card key={student} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-primary/5">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start mb-4">
                <Badge variant="outline" className="bg-primary/10 text-primary hover:bg-primary/20">
                  Premium
                </Badge>
                <div className="flex items-center gap-2">
                  <Medal className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium">Nível 3</span>
                </div>
              </div>
              <CardTitle className="text-xl">{student}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-muted-foreground">{student.toLowerCase().replace(' ', '.')}@exemplo.com</p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Último acesso: há 2 dias</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <BookOpen className="w-4 h-4" />
                      <span className="text-sm">Cursos</span>
                    </div>
                    <p className="text-2xl font-semibold">3</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <GraduationCap className="w-4 h-4" />
                      <span className="text-sm">Concluídos</span>
                    </div>
                    <p className="text-2xl font-semibold">1</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Star className="w-4 h-4" />
                      <span className="text-sm">Média</span>
                    </div>
                    <p className="text-2xl font-semibold">8.5</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span className="text-sm">Progresso Total</span>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300"
                      style={{ width: "65%" }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-primary/20 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 py-6"
                    onClick={() => openEditDialog(student)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="flex-1 py-6 hover:bg-red-700 transition-all duration-300"
                    onClick={() => openDeleteDialog(student)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remover
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog de Edição */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Aluno</DialogTitle>
            <DialogDescription>
              Atualize as informações do aluno {selectedStudent}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditStudent} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input id="name" defaultValue={selectedStudent || ""} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                defaultValue={selectedStudent?.toLowerCase().replace(' ', '.') + "@exemplo.com"} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Plano</Label>
              <Select defaultValue="premium">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um plano" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Gratuito</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="pro">Profissional</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
              >
                Salvar Alterações
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog de Confirmação de Remoção */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover Aluno</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover o aluno {selectedStudent}? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteStudent}
              className="bg-red-600 hover:bg-red-700 text-white transition-colors"
            >
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default AdminStudents
