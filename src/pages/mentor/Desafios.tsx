import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Trophy, Users, Target, Plus, Clock, PlusCircle, CheckCircle2, Award, BarChart } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

// Mock de desafios
const initialChallenges = [
  {
    id: "1",
    title: "Maratona de Redação",
    status: "in_progress",
    participants: 32,
    daysLeft: 5,
    totalTasks: 7,
    completedTasks: 5,
    xp: 500,
    description: "Complete 7 redações em 7 dias para desenvolver suas habilidades de escrita"
  },
  {
    id: "2",
    title: "100 Exercícios",
    status: "planned",
    participants: 0,
    daysLeft: 30,
    totalTasks: 100,
    completedTasks: 0,
    xp: 1000,
    description: "Resolva 100 exercícios de matemática em um mês para dominar os conceitos fundamentais"
  },
  {
    id: "3",
    title: "Desafio de Matemática",
    status: "completed",
    participants: 45,
    daysLeft: 0,
    totalTasks: 50,
    completedTasks: 50,
    xp: 750,
    description: "Pratique álgebra e geometria com exercícios selecionados"
  }
]

const MentorDesafios = () => {
  const [search, setSearch] = useState("")
  const [challenges, setChallenges] = useState(initialChallenges)
  const navigate = useNavigate()

  const handleNewChallenge = () => {
    navigate("/mentor/desafios/novo")
    toast.success("Criar novo desafio", {
      description: "Prepare-se para criar um novo desafio motivador!",
      action: {
        label: "Cancelar",
        onClick: () => {
          navigate("/mentor/desafios")
          toast.dismiss()
        }
      }
    })
  }

  const handleStartChallenge = (challengeId: string) => {
    setChallenges(prev => 
      prev.map(challenge => 
        challenge.id === challengeId
          ? { ...challenge, status: "in_progress" }
          : challenge
      )
    )
    toast.success("Desafio iniciado!", {
      description: "Os alunos serão notificados.",
      action: {
        label: "Desfazer",
        onClick: () => handleCancelChallenge(challengeId)
      }
    })
  }

  const handleCancelChallenge = (challengeId: string) => {
    setChallenges(prev => 
      prev.map(challenge => 
        challenge.id === challengeId
          ? { ...challenge, status: "planned" }
          : challenge
      )
    )
    toast.info("Desafio cancelado")
  }

  const handleViewDetails = (challengeId: string) => {
    navigate(`/mentor/desafios/${challengeId}`)
    toast.success("Abrindo detalhes do desafio", {
      description: "Você poderá ver todas as informações e gerenciar o desafio.",
      action: {
        label: "Voltar",
        onClick: () => {
          navigate("/mentor/desafios")
          toast.dismiss()
        }
      }
    })
  }

  const filteredChallenges = challenges.filter(challenge =>
    challenge.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="container py-8 space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Gerenciar Desafios
          </h1>
          <p className="text-slate-400">
            Crie e monitore desafios para seus alunos
          </p>
        </div>
        <Button 
          className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white shadow-lg shadow-purple-500/20"
          onClick={handleNewChallenge}
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Desafio
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Buscar desafios..." 
            className="pl-8 bg-slate-900/50 border-slate-800 text-white placeholder:text-slate-400 focus-visible:ring-purple-500" 
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredChallenges.map(challenge => (
          <Card 
            key={challenge.id} 
            className="group hover:shadow-lg transition-all hover:-translate-y-1 bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800 hover:border-slate-700 h-[420px] flex flex-col"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-base font-medium text-white">{challenge.title}</CardTitle>
              <Badge 
                className={
                  challenge.status === "in_progress" 
                    ? "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30" 
                    : challenge.status === "completed"
                    ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                    : "bg-slate-500/20 text-slate-400 hover:bg-slate-500/30"
                }
              >
                {challenge.status === "in_progress" ? "Em Andamento" : 
                  challenge.status === "planned" ? "Planejado" : "Concluído"}
              </Badge>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <p className="text-sm text-slate-400 mb-6">{challenge.description}</p>
              <div className="space-y-4 flex-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Users className="w-4 h-4" />
                      <span>{challenge.participants} participantes</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Clock className="w-4 h-4" />
                      <span>{challenge.daysLeft} dias restantes</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Target className="w-4 h-4" />
                      <span>{challenge.completedTasks}/{challenge.totalTasks} tarefas</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      <span>{challenge.xp} XP</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 mt-auto">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Progresso Geral</span>
                    <span className="text-white">{Math.round((challenge.completedTasks / challenge.totalTasks) * 100)}%</span>
                  </div>
                  <Progress 
                    value={(challenge.completedTasks / challenge.totalTasks) * 100} 
                    className="h-2 bg-slate-800"
                  />
                </div>

                {challenge.status === "planned" ? (
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => handleStartChallenge(challenge.id)}
                  >
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Iniciar Desafio
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    className="w-full border-slate-800 hover:bg-slate-800 text-white"
                    onClick={() => handleViewDetails(challenge.id)}
                  >
                    <BarChart className="w-4 h-4 mr-2" />
                    Ver Detalhes
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default MentorDesafios
