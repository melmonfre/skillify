import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Trophy, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { PracticeStudentAPI } from "@/api/student/controllers/PracticeStudentAPI"
import { PracticeResponseDTO } from "@/api/dtos/practiceDtos"
import { QuestionResponseDTO } from "@/api/dtos/questionDtos" // Updated import path

type UserAnswer = {
  questionId: string;
  optionId: string | null;
};

export default function ExamPage() {
  const { id } = useParams<{ id: string }>()
  const [practice, setPractice] = useState<PracticeResponseDTO | null>(null)
  const [questions, setQuestions] = useState<QuestionResponseDTO[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])

  useEffect(() => {
    const fetchPractice = async () => {
      if (!id) return
      
      try {
        setIsLoading(true)
        const practiceData = await PracticeStudentAPI.getPracticeById(id)
        setPractice(practiceData)
        const questionsArray = Array.from(practiceData.questions)
        setQuestions(questionsArray)
        setTimeLeft(practiceData.duracao * 60)
        
        setUserAnswers(questionsArray.map(question => ({
          questionId: question.id,
          optionId: null
        })))
      } catch (err) {
        setError("Failed to load practice. Please try again later.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPractice()
  }, [id])

  useEffect(() => {
    if (timeLeft <= 0 || isFinished) return

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, isFinished])

  const handleOptionSelect = (optionId: string) => {
    setUserAnswers(prev => {
      const newAnswers = [...prev]
      newAnswers[currentQuestionIndex] = {
        questionId: questions[currentQuestionIndex].id,
        optionId
      }
      return newAnswers
    })
  }

  const handleFinishExam = () => {
    setIsFinished(true)
    toast.success("Simulado concluído! Parabéns!")
    window.location.href = `/simulados/resultado/${id}`
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (isLoading) {
    return <div className="container py-8">Loading practice...</div>
  }

  if (error) {
    return <div className="container py-8 text-destructive">{error}</div>
  }

  if (!practice) {
    return <div className="container py-8">Practice not found</div>
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100 // Use questions.length instead of practice.numberOfQuestions
  const currentAnswer = userAnswers[currentQuestionIndex]?.optionId

  return (
    <div className="container py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{practice.title}</h1>
          <p className="text-muted-foreground">
            Questão {currentQuestionIndex + 1} de {questions.length} {/* Use questions.length here */}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="flex gap-2">
            <Trophy className="w-4 h-4 text-yellow-500" />
            {questions.length * 10} XP {/* Use questions.length here */}
          </Badge>
          <Badge variant={timeLeft < 300 ? "destructive" : "secondary"} className="flex gap-2">
            <Clock className="w-4 h-4" />
            {formatTime(timeLeft)}
          </Badge>
        </div>
      </div>

      <Progress value={progress} className="w-full" />

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <Card className="p-6 space-y-6">
          {currentQuestion ? (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Questão {currentQuestionIndex + 1}
              </h3>
              <p className="text-muted-foreground">
                {currentQuestion.title}
              </p>
              <div className="space-y-2">
                {Array.from(currentQuestion.options).map((option, index) => (
                  <Button
                    key={option.id}
                    variant={
                      currentAnswer === option.id 
                        ? "secondary" 
                        : "outline"
                    }
                    className="w-full justify-start h-auto py-4 px-6"
                    onClick={() => handleOptionSelect(option.id)}
                  >
                    <span className="font-semibold mr-4">
                      {String.fromCharCode(65 + index)})
                    </span>
                    {option.title}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div>Question not available</div>
          )}

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
            >
              Anterior
            </Button>
            {currentQuestionIndex === questions.length - 1 ? ( // Use questions.length here
              <Button onClick={handleFinishExam}>
                Finalizar Simulado
              </Button>
            ) : (
              <Button 
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                disabled={currentQuestionIndex === questions.length - 1} // Use questions.length here
              >
                Próxima
              </Button>
            )}
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            Questões Respondidas
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((_, idx) => (
              <Button
                key={idx}
                variant={
                  idx === currentQuestionIndex 
                    ? "default" 
                    : userAnswers[idx]?.optionId 
                      ? "secondary" 
                      : "outline"
                }
                className="w-full h-10"
                onClick={() => setCurrentQuestionIndex(idx)}
              >
                {idx + 1}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}