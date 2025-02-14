import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Users, Plus, Video, FileText, Image, Pencil } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface CourseForm {
  title: string
  description: string
  coverImage?: File
}

interface CourseCardProps {
  title: string
  image: string
  students: number
  lessons: number
  materials: number
  onEdit: () => void
  onNewLesson: () => void
}

const CourseCard = ({ title, image, students, lessons, materials, onEdit, onNewLesson }: CourseCardProps) => (
  <Card className="overflow-hidden bg-gradient-to-br from-black/40 to-black/20 border-slate-800 hover:border-slate-700 transition-all duration-300">
    <CardHeader className="p-0">
      <div className="relative w-full h-48">
        <img 
          src={image}
          alt={title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
        <div className="absolute bottom-0 p-4">
          <CardTitle className="text-xl text-white">{title}</CardTitle>
        </div>
      </div>
    </CardHeader>
    <CardContent className="p-4 space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <div className="p-3 rounded-lg bg-white/5 text-center">
          <Users className="w-4 h-4 mx-auto mb-1 text-purple-400" />
          <p className="text-sm font-medium text-white">{students}</p>
          <p className="text-xs text-slate-400">Alunos</p>
        </div>
        <div className="p-3 rounded-lg bg-white/5 text-center">
          <Video className="w-4 h-4 mx-auto mb-1 text-indigo-400" />
          <p className="text-sm font-medium text-white">{lessons}</p>
          <p className="text-xs text-slate-400">Aulas</p>
        </div>
        <div className="p-3 rounded-lg bg-white/5 text-center">
          <FileText className="w-4 h-4 mx-auto mb-1 text-blue-400" />
          <p className="text-sm font-medium text-white">{materials}</p>
          <p className="text-xs text-slate-400">Materiais</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button 
          variant="outline"
          onClick={onEdit}
          className="bg-white/5 border-slate-800 hover:bg-white/10 hover:border-slate-700 text-white"
        >
          <Pencil className="w-4 h-4 mr-2" />
          Editar
        </Button>
        <Button
          onClick={onNewLesson}
          className="bg-purple-600 hover:bg-purple-700 text-white border-none"
        >
          <Video className="w-4 h-4 mr-2" />
          Nova Aula
        </Button>
      </div>
    </CardContent>
  </Card>
)

const MentorCourses = () => {
  const { toast } = useToast()
  const [isNewCourseOpen, setIsNewCourseOpen] = useState(false)
  const [isEditCourseOpen, setIsEditCourseOpen] = useState(false)
  const [isNewLessonOpen, setIsNewLessonOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<string>("")
  const [courseForm, setCourseForm] = useState<CourseForm>({
    title: "",
    description: ""
  })

  const handleNewCourse = () => {
    toast({
      title: "Curso criado",
      description: "O novo curso foi criado com sucesso!"
    })
    setIsNewCourseOpen(false)
  }

  const handleEditCourse = () => {
    toast({
      title: "Curso atualizado",
      description: "O curso foi atualizado com sucesso!"
    })
    setIsEditCourseOpen(false)
  }

  const handleNewLesson = () => {
    toast({
      title: "Aula adicionada",
      description: "A nova aula foi adicionada com sucesso!"
    })
    setIsNewLessonOpen(false)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setCourseForm(prev => ({ ...prev, coverImage: file }))
      toast({
        title: "Imagem selecionada",
        description: "A imagem de capa foi selecionada com sucesso!"
      })
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Meus Cursos
          </h1>
          <p className="text-slate-400">
            Gerencie os cursos que você ministra
          </p>
        </div>
        <Button onClick={() => setIsNewCourseOpen(true)} 
          className="bg-purple-600 hover:bg-purple-700 text-white border-none">
          <Plus className="w-4 h-4 mr-2" />
          Novo Curso
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input 
          placeholder="Buscar cursos..." 
          className="pl-10 bg-white/5 border-slate-800 text-white placeholder:text-slate-400"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <CourseCard 
          title="TypeScript Avançado"
          image="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
          students={45}
          lessons={12}
          materials={8}
          onEdit={() => {
            setSelectedCourse("typescript")
            setIsEditCourseOpen(true)
          }}
          onNewLesson={() => {
            setSelectedCourse("typescript")
            setIsNewLessonOpen(true)
          }}
        />

        <CourseCard 
          title="React Fundamentals"
          image="https://images.unsplash.com/photo-1633356122544-f134324a6cee"
          students={38}
          lessons={15}
          materials={10}
          onEdit={() => {
            setSelectedCourse("react")
            setIsEditCourseOpen(true)
          }}
          onNewLesson={() => {
            setSelectedCourse("react")
            setIsNewLessonOpen(true)
          }}
        />
      </div>

      {/* Diálogo de Novo Curso */}
      <Dialog open={isNewCourseOpen} onOpenChange={setIsNewCourseOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Novo Curso</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título do Curso</Label>
              <Input
                id="title"
                value={courseForm.title}
                onChange={(e) => setCourseForm(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                value={courseForm.description}
                onChange={(e) => setCourseForm(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cover">Imagem de Capa</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="cover"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <Image className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewCourseOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleNewCourse}>Criar Curso</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de Editar Curso */}
      <Dialog open={isEditCourseOpen} onOpenChange={setIsEditCourseOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Curso</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Título do Curso</Label>
              <Input
                id="edit-title"
                value={courseForm.title}
                onChange={(e) => setCourseForm(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Descrição</Label>
              <Input
                id="edit-description"
                value={courseForm.description}
                onChange={(e) => setCourseForm(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-cover">Nova Imagem de Capa</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="edit-cover"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <Image className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditCourseOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditCourse}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de Nova Aula */}
      <Dialog open={isNewLessonOpen} onOpenChange={setIsNewLessonOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Nova Aula</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="lesson-title">Título da Aula</Label>
              <Input id="lesson-title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lesson-video">Vídeo da Aula</Label>
              <Input id="lesson-video" type="file" accept="video/*" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lesson-description">Descrição da Aula</Label>
              <Input id="lesson-description" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewLessonOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleNewLesson}>Adicionar Aula</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default MentorCourses
