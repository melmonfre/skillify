import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Trophy,
  Target,
  Zap,
  Clock,
  BarChart,
  BookOpen,
} from "lucide-react"
import { PracticeExecutionStudentAPI } from "@/api/student/controllers/PracticeExecutionStudentAPI"
import { PracticeExecutionResponseDTO } from "@/api/dtos/practiceExecutionDtos"

export default function ExamResults() {
  const { id } = useParams<{ id: string }>()
  const [execution, setExecution] = useState<PracticeExecutionResponseDTO | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchExecution = async () => {
      if (!id) return

      try {
        setLoading(true)
        const data = await PracticeExecutionStudentAPI.getPracticeExecutionById(id)
        setExecution(data)
      } catch (err) {
        setError("Failed to load exam results")
      } finally {
        setLoading(false)
      }
    }

    fetchExecution()
  }, [id])

  // Calculate results from execution data
  const results = execution ? {
    score: execution.correctAnswers * 100, // Assuming 100 points per correct answer
    maxScore: execution.practice.numberOfQuestions * 100,
    correctAnswers: execution.correctAnswers,
    totalQuestions: execution.practice.numberOfQuestions,
    timeSpent: execution.practice.duracao ? `${execution.practice.duracao} min` : "N/A",
    xpEarned: execution.correctAnswers * 10, // Mocked XP: 10 points per correct answer
    subjectBreakdown: [
      // This is mocked since we don't have subject-specific data in the DTO
      { subject: "Matemática", score: Math.round((execution.correctAnswers / execution.practice.numberOfQuestions) * 85), color: "text-blue-500" },
      { subject: "Português", score: Math.round((execution.correctAnswers / execution.practice.numberOfQuestions) * 92), color: "text-green-500" },
      { subject: "Ciências", score: Math.round((execution.correctAnswers / execution.practice.numberOfQuestions) * 78), color: "text-yellow-500" },
      { subject: "Humanas", score: Math.round((execution.correctAnswers / execution.practice.numberOfQuestions) * 88), color: "text-purple-500" },
    ],
  } : null

  if (loading) {
    return <div className="container py-8 text-center">Loading...</div>
  }

  if (error || !results) {
    return <div className="container py-8 text-center text-red-500">{error || "No results found"}</div>
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Resultado do Simulado</h1>
        <div className="flex justify-center items-center gap-4">
          <Badge variant="secondary" className="text-xl py-2 px-4">
            {results.score} / {results.maxScore}
          </Badge>
          <Badge variant="outline" className="flex gap-2 py-2 px-4">
            <Trophy className="w-5 h-5 text-yellow-500" />
            +{results.xpEarned} XP
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Target className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Acertos</p>
              <p className="text-2xl font-bold">
                {results.correctAnswers} / {results.totalQuestions}
              </p>
            </div>
          </div>
          <Progress 
            value={(results.correctAnswers / results.totalQuestions) * 100} 
            className="mt-4"
          />
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Clock className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Tempo Total</p>
              <p className="text-2xl font-bold">{results.timeSpent}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Zap className="w-8 h-8 text-yellow-500" />
            <div>
              <p className="text-sm text-muted-foreground">XP Ganho</p>
              <p className="text-2xl font-bold">+{results.xpEarned}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-bold mb-6">Desempenho por Área</h2>
        <div className="space-y-6">
          {results.subjectBreakdown.map((subject) => (
            <div key={subject.subject} className="space-y-2">
              <div className="flex justify-between">
                <span className={subject.color}>{subject.subject}</span>
                <span>{subject.score}%</span>
              </div>
              <Progress value={subject.score} />
            </div>
          ))}
        </div>
      </Card>

      <div className="flex justify-center gap-4">
        <Button variant="outline">
          <BarChart className="w-4 h-4 mr-2" />
          Ver Detalhes
        </Button>
        <Button>
          <BookOpen className="w-4 h-4 mr-2" />
          Novo Simulado
        </Button>
      </div>
    </div>
  )
}