import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Trophy, BarChart, Award } from "lucide-react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { PracticeResponseDTO } from "@/api/dtos/practiceDtos"
import { PracticeStudentAPI } from "@/api/student/controllers/PracticeStudentAPI"

const StudentExams = () => {
  const [examProgress] = useState(0)
  const [practices, setPractices] = useState<PracticeResponseDTO[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPractices = async () => {
      try {
        const data = await PracticeStudentAPI.getAllPractices()
        console.log("Fetched practices:", data)
        setPractices(data)
        setError(null)
      } catch (error) {
        console.error("Error fetching practices:", error)
        setError("Não foi possível carregar os simulados. Tente novamente mais tarde.")
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchPractices()
  }, [])

  const handleStartExam = (practiceId: string) => {
    navigate(`/dashboard/simulados/prova/${practiceId}`)
    toast.success("Iniciando simulado...")
  }

  const handleViewResults = (practiceId: string) => {
    navigate(`/simulados/resultado/${practiceId}`)
    toast.success("Carregando resultados...")
  }

  const getPracticeStatus = (practice: PracticeResponseDTO) => {
    const now = new Date().toISOString(); // Convert current time to UTC string for consistent comparison
    const openingDate = new Date(practice.openingDate).toISOString();
    const maximumDate = new Date(practice.maximumDate).toISOString();
  
    // Compare as strings or convert back to Date objects after ensuring UTC
    const nowDate = new Date(now);
    const openingDateObj = new Date(openingDate);
    const maximumDateObj = new Date(maximumDate);

    console.log("Now:", now);
console.log("Opening Date:", openingDate);
console.log("Maximum Date:", maximumDate);
  
    if (openingDateObj >= maximumDateObj) {
      return { status: "Datas Inválidas", variant: "destructive" as const };
    }
  
    if (nowDate < openingDateObj) {
      return { status: "Agendado", variant: "outline" as const };
    }
    if (nowDate > maximumDateObj) {
      return { status: "Concluído", variant: "secondary" as const };
    }
    return { status: "Disponível", variant: "default" as const };
  };

  if (isLoading) {
    return (
      <div className="container py-8 flex justify-center">
        <div className="animate-pulse text-lg">Carregando simulados...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-medium text-red-800">{error}</h3>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setIsLoading(true)
              setError(null)
              PracticeStudentAPI.getAllPractices()
                .then(data => {
                  setPractices(data)
                  setIsLoading(false)
                })
                .catch(() => {
                  setIsLoading(false)
                  setError("Falha ao tentar recarregar. Verifique sua conexão.")
                })
            }}
          >
            Tentar novamente
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Simulados</h1>
          <p className="text-muted-foreground">
            Prepare-se para o sucesso com nossos simulados completos
          </p>
        </div>
      </div>

      <Card className="bg-gradient-to-r from-primary-100 to-primary-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-primary" />
            Seu Progresso
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Progresso Geral</span>
            <span className="text-sm font-medium">{examProgress}%</span>
          </div>
          <Progress value={examProgress} className="h-2" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="flex items-center gap-3 bg-white/50 rounded-lg p-4">
              <Award className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm font-medium">Simulados Completos</p>
                <p className="text-2xl font-bold">
                  {practices.filter(p => {
                    const maxDate = new Date(p.maximumDate)
                    return maxDate < new Date() && new Date(p.openingDate) < maxDate
                  }).length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/50 rounded-lg p-4">
              <BarChart className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm font-medium">Média Geral</p>
                <p className="text-2xl font-bold">--</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/50 rounded-lg p-4">
              <Clock className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm font-medium">Tempo Médio</p>
                <p className="text-2xl font-bold">--</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {practices.length === 0 ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-medium text-blue-800">Nenhum simulado disponível</h3>
          <p className="text-blue-600 mt-2">Quando houver simulados disponíveis, eles aparecerão aqui.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {practices.map((practice) => {
            const { status, variant } = getPracticeStatus(practice)
            const isInvalid = status === "Datas Inválidas"
            const isCompleted = status === "Concluído"
            const isAvailable = status === "Disponível"

            return (
              <Card key={practice.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{practice.title}</CardTitle>
                    <Badge variant={variant}>{status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {isCompleted 
                      ? `Simulado realizado em ${new Date(practice.openingDate).toLocaleDateString()}`
                      : `Criado por: ${practice.mentor.name}`}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Duração: {Math.floor(practice.duracao / 60)}h{practice.duracao % 60}m</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BarChart className="w-4 h-4" />
                      <span>{practice.numberOfQuestions} questões</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  {isInvalid ? (
                    <Button variant="destructive" className="w-full" disabled>
                      Datas inválidas
                    </Button>
                  ) : isAvailable ? (
                    <Button className="w-full" onClick={() => handleStartExam(practice.id)}>
                      Começar Simulado
                    </Button>
                  ) : isCompleted ? (
                    <Button variant="outline" className="w-full" onClick={() => handleViewResults(practice.id)}>
                      Ver Resultados
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full" disabled>
                      Aguardando abertura
                    </Button>
                  )}
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default StudentExams