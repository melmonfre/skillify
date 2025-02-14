
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { XPChart } from "@/components/progress/XPChart"
import { Users, BookOpen, FileText, Target, Trophy } from "lucide-react"

const MentorDashboard = () => {
  const stats = [
    {
      title: "Total de Alunos",
      value: "127",
      change: "+12% em relação ao mês anterior",
      icon: Users,
      trend: "up",
    },
    {
      title: "Média de Desempenho",
      value: "85%",
      change: "+5% em relação ao mês anterior",
      icon: Target,
      trend: "up",
    },
    {
      title: "Redações Corrigidas",
      value: "324",
      change: "48 pendentes de correção",
      icon: FileText,
      trend: "neutral",
    },
    {
      title: "Cursos Ativos",
      value: "8",
      change: "2 em planejamento",
      icon: BookOpen,
      trend: "up",
    },
  ]

  const performanceData = [
    { month: "Jan", completed: 45, xp: 2300 },
    { month: "Fev", completed: 52, xp: 2800 },
    { month: "Mar", completed: 49, xp: 2600 },
    { month: "Abr", completed: 63, xp: 3200 },
    { month: "Mai", completed: 58, xp: 2900 },
    { month: "Jun", completed: 69, xp: 3500 },
  ]

  const recentAchievements = [
    {
      title: "Super Mentor",
      description: "Alcançou 100 mentorias realizadas",
      icon: Trophy,
      date: "Hoje",
    },
    {
      title: "Mestre das Correções",
      description: "Corrigiu 300 redações",
      icon: FileText,
      date: "2 dias atrás",
    },
  ]

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Dashboard do Mentor
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Bem-vindo de volta! Aqui está um resumo das suas atividades.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-primary/5">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className={`text-sm ${
                stat.trend === "up" 
                  ? "text-green-600" 
                  : stat.trend === "down" 
                  ? "text-red-600" 
                  : "text-muted-foreground"
              }`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-primary/5">
          <CardHeader>
            <CardTitle>Desempenho dos Alunos</CardTitle>
          </CardHeader>
          <CardContent>
            <XPChart data={performanceData} />
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-primary/5">
          <CardHeader>
            <CardTitle>Conquistas Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentAchievements.map((achievement) => (
                <div key={achievement.title} className="flex items-start gap-4 p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <achievement.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{achievement.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-primary/5 md:col-span-2">
          <CardHeader>
            <CardTitle>Próximas Atividades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-primary/5">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">Mentoria em Grupo</h4>
                  <p className="text-sm text-muted-foreground">Turma React Avançado - 15:00</p>
                </div>
                <Badge variant="outline" className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                  Hoje
                </Badge>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-primary/5">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">Correção de Redações</h4>
                  <p className="text-sm text-muted-foreground">12 redações pendentes para hoje</p>
                </div>
                <Badge variant="outline" className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                  Pendente
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-primary/5">
          <CardHeader>
            <CardTitle>Metas do Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center text-sm mb-2">
                  <span>Mentorias Realizadas</span>
                  <span className="font-medium">24/30</span>
                </div>
                <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300"
                    style={{ width: "80%" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center text-sm mb-2">
                  <span>Redações Corrigidas</span>
                  <span className="font-medium">87/100</span>
                </div>
                <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300"
                    style={{ width: "87%" }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default MentorDashboard
