
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, BookPlus, Edit, Trash2, StarIcon, GraduationCap, BookOpen, Clock } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import type { Course } from "@/types"

const AdminCourses = () => {
  const { toast } = useToast()
  const [isNewCourseOpen, setIsNewCourseOpen] = useState(false)
  const [isEditCourseOpen, setIsEditCourseOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [courseImage, setCourseImage] = useState("")

  const handleNewCourse = (e: React.FormEvent) => {
    e.preventDefault()
    setIsNewCourseOpen(false)
    toast({
      title: "Curso criado",
      description: "O novo curso foi criado com sucesso.",
    })
  }

  const handleEditCourse = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditCourseOpen(false)
    toast({
      title: "Curso atualizado",
      description: "O curso foi atualizado com sucesso.",
    })
  }

  const handleDeleteCourse = () => {
    setIsDeleteDialogOpen(false)
    toast({
      title: "Curso removido",
      description: "O curso foi removido com sucesso.",
    })
  }

  const openEditDialog = (courseTitle: string) => {
    setSelectedCourse(courseTitle)
    setIsEditCourseOpen(true)
  }

  const openDeleteDialog = (courseTitle: string) => {
    setSelectedCourse(courseTitle)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Cursos
            <span className="text-primary ml-2">3</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Gerencie os cursos da plataforma
          </p>
        </div>
        <Button 
          onClick={() => setIsNewCourseOpen(true)}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
        >
          <BookPlus className="w-5 h-5 mr-2" />
          Novo Curso
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar cursos..." 
            className="pl-10 py-6 text-lg" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-primary/5">
          <CardHeader className="pb-0">
            <div className="flex justify-between items-start mb-4">
              <Badge variant="outline" className="bg-primary/10 text-primary hover:bg-primary/20">
                Programação
              </Badge>
              <div className="flex items-center gap-1 text-yellow-500">
                <StarIcon className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium">4.7</span>
              </div>
            </div>
            <CardTitle className="text-xl mb-2">React Fundamentals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <GraduationCap className="w-4 h-4" />
                    <span className="text-sm">Alunos</span>
                  </div>
                  <p className="text-2xl font-semibold">156</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-sm">Aulas</span>
                  </div>
                  <p className="text-2xl font-semibold">24</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1 border-primary/20 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 py-6"
                  onClick={() => openEditDialog("React Fundamentals")}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
                <Button 
                  variant="destructive" 
                  className="flex-1 py-6 hover:bg-red-700 transition-all duration-300"
                  onClick={() => openDeleteDialog("React Fundamentals")}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remover
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal Novo Curso */}
      <Dialog open={isNewCourseOpen} onOpenChange={setIsNewCourseOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Criar Novo Curso</DialogTitle>
            <DialogDescription>
              Preencha as informações do novo curso abaixo.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleNewCourse} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título do curso</Label>
              <Input id="title" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea id="description" required className="min-h-[100px]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Imagem do curso</Label>
              <div className="grid gap-4">
                <Input
                  id="image"
                  placeholder="URL da imagem (ex: https://...)"
                  value={courseImage}
                  onChange={(e) => setCourseImage(e.target.value)}
                />
                {courseImage && (
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                    <img
                      src={courseImage}
                      alt="Preview"
                      className="object-cover w-full h-full"
                      onError={() => setCourseImage("")}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="programming">Programação</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="business">Negócios</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Nível</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o nível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Iniciante</SelectItem>
                    <SelectItem value="intermediate">Intermediário</SelectItem>
                    <SelectItem value="advanced">Avançado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duração (em horas)</Label>
                <Input id="duration" type="number" min="1" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lessons">Número de aulas</Label>
                <Input id="lessons" type="number" min="1" required />
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                Criar Curso
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal Editar Curso */}
      <Dialog open={isEditCourseOpen} onOpenChange={setIsEditCourseOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Editar Curso</DialogTitle>
            <DialogDescription>
              Edite as informações do curso {selectedCourse}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditCourse} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="editTitle">Título do curso</Label>
              <Input id="editTitle" defaultValue={selectedCourse || ""} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editDescription">Descrição</Label>
              <Textarea 
                id="editDescription" 
                required 
                className="min-h-[100px]"
                defaultValue="Aprenda os fundamentos do React, desde componentes até hooks."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editImage">Imagem do curso</Label>
              <div className="grid gap-4">
                <Input
                  id="editImage"
                  placeholder="URL da imagem (ex: https://...)"
                  value={courseImage}
                  onChange={(e) => setCourseImage(e.target.value)}
                />
                {courseImage && (
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                    <img
                      src={courseImage}
                      alt="Preview"
                      className="object-cover w-full h-full"
                      onError={() => setCourseImage("")}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editCategory">Categoria</Label>
                <Select defaultValue="programming">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="programming">Programação</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="business">Negócios</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="editLevel">Nível</Label>
                <Select defaultValue="beginner">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o nível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Iniciante</SelectItem>
                    <SelectItem value="intermediate">Intermediário</SelectItem>
                    <SelectItem value="advanced">Avançado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editDuration">Duração (em horas)</Label>
                <Input id="editDuration" type="number" min="1" defaultValue="8" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editLessons">Número de aulas</Label>
                <Input id="editLessons" type="number" min="1" defaultValue="24" required />
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
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
            <AlertDialogTitle>Remover Curso</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover o curso {selectedCourse}? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteCourse}
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

export default AdminCourses
