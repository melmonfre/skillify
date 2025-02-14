
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Star, Target, Trophy, BookOpen, BarChart3 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"

const studentsMock = [
  {
    id: "1",
    name: "Ana Silva",
    email: "ana.silva@email.com",
    xp: 2500,
    level: 5,
    progress: {
      courses: 3,
      completedCourses: 2,
      exercises: 150,
      completedExercises: 120,
      currentStreak: 7
    }
  },
  {
    id: "2",
    name: "Carlos Oliveira",
    email: "carlos.o@email.com",
    xp: 1800,
    level: 4,
    progress: {
      courses: 2,
      completedCourses: 1,
      exercises: 100,
      completedExercises: 75,
      currentStreak: 3
    }
  }
]

const StudentProgress = () => {
  const [search, setSearch] = useState("")

  const filteredStudents = studentsMock.filter(student =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="container py-8 space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-bold text-primary">Progresso dos Alunos</h1>
        <p className="text-muted-foreground">
          Acompanhe o desenvolvimento e evolução dos seus alunos
        </p>
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

      <div className="grid gap-6 md:grid-cols-2">
        {filteredStudents.map(student => (
          <Card key={student.id} className="hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{student.name}</span>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span className="text-primary">{student.xp} XP</span>
                </div>
              </CardTitle>
              <p className="text-sm text-muted-foreground">{student.email}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <Star className="w-4 h-4 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Nível</p>
                  <p className="text-2xl font-bold text-primary">{student.level}</p>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <BookOpen className="w-4 h-4 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Cursos</p>
                  <p className="text-2xl font-bold text-primary">
                    {student.progress.completedCourses}/{student.progress.courses}
                  </p>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <Target className="w-4 h-4 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Sequência</p>
                  <p className="text-2xl font-bold text-primary">{student.progress.currentStreak}d</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Exercícios Concluídos</span>
                    <span className="text-primary">
                      {student.progress.completedExercises}/{student.progress.exercises}
                    </span>
                  </div>
                  <Progress 
                    value={(student.progress.completedExercises / student.progress.exercises) * 100}
                    className="h-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Cursos Concluídos</span>
                    <span className="text-primary">
                      {student.progress.completedCourses}/{student.progress.courses}
                    </span>
                  </div>
                  <Progress 
                    value={(student.progress.completedCourses / student.progress.courses) * 100}
                    className="h-2"
                  />
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <BarChart3 className="w-4 h-4 mr-2" />
                Ver Detalhes
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default StudentProgress
