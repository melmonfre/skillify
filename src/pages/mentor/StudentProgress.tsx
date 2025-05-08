import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BookOpen, Search, Star, Target, Trophy } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react"
import { UserMentorAPI } from "@/api/mentor/controllers/UserMentorAPI"
import { ClassroomMentorAPI } from "@/api/mentor/controllers/ClassroomMentorAPI"
import { MentorProgressStudent } from "@/api/dtos/mentorProgressDtos"
import { ClassroomResponseDTO } from "@/api/dtos/classroomDtos"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const StudentProgress = () => {
  const [search, setSearch] = useState("")
  const [students, setStudents] = useState<MentorProgressStudent[]>([])
  const [classrooms, setClassrooms] = useState<ClassroomResponseDTO[]>([])
  const [selectedClassroomId, setSelectedClassroomId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch all classrooms on mount
  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const classroomResponse = await ClassroomMentorAPI.getAllClassrooms()
        const validClassrooms = classroomResponse.filter(
          (classroom) => classroom.id && classroom.id.trim() !== ""
        )
        setClassrooms(validClassrooms)
        if (validClassrooms.length > 0) {
          setSelectedClassroomId(validClassrooms[0].id)
        }
      } catch (err) {
        setError("Falha ao carregar turmas")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchClassrooms()
  }, [])

  // Fetch students for the selected classroom
  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedClassroomId) return
      setLoading(true)
      try {
        const response = await UserMentorAPI.getStudentsForClassroom(selectedClassroomId)
        setStudents(response)
      } catch (err) {
        setError("Falha ao carregar alunos da turma selecionada")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [selectedClassroomId])

  const filteredStudents = students.filter(student =>
    student.user.name.toLowerCase().includes(search.toLowerCase()) ||
    student.user.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="container py-8 space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-bold text-primary">Progresso dos Alunos</h1>
        <p className="text-muted-foreground">
          Acompanhe o desenvolvimento e evolução dos seus alunos
        </p>
      </div>

      <div className="space-y-2 max-w-md">
        <Label htmlFor="classroom-select" className="text-white">Selecionar Turma</Label>
        <Select
          value={selectedClassroomId ?? "none"}
          onValueChange={(value) => setSelectedClassroomId(value === "none" ? null : value)}
          disabled={loading || classrooms.length === 0}
        >
          <SelectTrigger id="classroom-select" className="bg-white/5 border-slate-800 text-white">
            <SelectValue placeholder="Selecione uma turma" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-800">
            {classrooms.length === 0 ? (
              <SelectItem value="none" disabled className="text-white">
                Nenhuma turma disponível
              </SelectItem>
            ) : (
              classrooms.map((classroom) => (
                <SelectItem
                  key={classroom.id}
                  value={classroom.id}
                  className="text-white hover:bg-slate-800"
                >
                  {classroom.name || `Turma ${classroom.id}`}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar alunos..." 
            className="pl-8" 
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading && <p>Carregando alunos...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && students.length === 0 && <p>Nenhum aluno encontrado para a turma selecionada</p>}
      {!loading && !error && students.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredStudents.map(student => (
            <Card key={student.user.id} className="hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{student.user.name}</span>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-primary">{student.user.xp} XP</span>
                  </div>
                </CardTitle>
                <p className="text-sm text-muted-foreground">{student.user.email}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <Star className="w-4 h-4 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">Nível</p>
                    <p className="text-2xl font-bold text-primary">{student.user.level}</p>
                  </div>
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <BookOpen className="w-4 h-4 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">Cursos Iniciados</p>
                    <p className="text-2xl font-bold text-primary">{student.initiatedCourses}</p>
                  </div>
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <Target className="w-4 h-4 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">Sequência</p>
                    <p className="text-2xl font-bold text-primary">{student.sequence}d</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default StudentProgress