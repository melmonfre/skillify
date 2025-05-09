import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"
import {
  Users,
  BookOpen,
  BarChart,
  TrendingUp,
  Bell,
  FileText,
  UserCog,
  Plus,
  Send,
  FileBarChart
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const AdminDashboard = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [showMentorDialog, setShowMentorDialog] = useState(false)
  const [showCourseDialog, setShowCourseDialog] = useState(false)
  const [showNotificationDialog, setShowNotificationDialog] = useState(false)

  const handleAddMentor = () => {
    toast({
      title: "Novo Mentor",
      description: "Redirecionando para página de mentores...",
      className: "bg-green-500 text-white",
    })
    navigate("/admin/mentores?action=new")
  }

  const handleCreateCourse = () => {
    setShowCourseDialog(true)
    toast({
      title: "Novo Curso",
      description: "Abrindo formulário de criação de curso...",
      className: "bg-blue-500 text-white",
    })
  }

  const handleSendNotification = () => {
    setShowNotificationDialog(true)
    toast({
      title: "Enviar Notificação",
      description: "Abrindo painel de notificações...",
      className: "bg-purple-500 text-white",
    })
  }

  const handleGenerateReport = () => {
    toast({
      title: "Gerando Relatório",
      description: "Iniciando geração do relatório...",
      className: "bg-orange-500 text-white",
    })
    
    // Simulação da geração do relatório
    setTimeout(() => {
      toast({
        title: "Relatório Gerado",
        description: "O relatório foi gerado com sucesso! Baixando arquivo...",
        className: "bg-green-500 text-white",
      })
      
      // Dados detalhados para o CSV
      const csvData = [
        ["Data", "Total Alunos", "Novos Alunos", "Cursos Ativos", "Taxa Conclusão", "Receita Mensal", "Mentores Ativos", "Redações Enviadas"],
        ["2024-03-01", "2543", "156", "156", "78%", "R$ 125.432", "48", "867"],
        ["2024-03-02", "2565", "22", "157", "77%", "R$ 126.890", "48", "892"],
        ["2024-03-03", "2589", "24", "157", "79%", "R$ 127.543", "49", "915"],
        ["2024-03-04", "2612", "23", "158", "78%", "R$ 128.765", "49", "943"],
        ["2024-03-05", "2634", "22", "158", "80%", "R$ 129.987", "50", "978"]
      ].map(row => row.join(",")).join("\n")

      const blob = new Blob([csvData], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `relatorio-plataforma-${new Date().toISOString().split("T")[0]}.csv`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    }, 2000)
  }

  return (
    <div className="container py-8 space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-900 bg-clip-text text-transparent">
            Dashboard Administrativo
          </h1>
          <p className="text-muted-foreground">
            Gestão geral da plataforma
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">Disponível em breve</div>
      
    </div>
  )
}

export default AdminDashboard


/*   <Card className="group hover:shadow-lg transition-all hover:-translate-y-1 bg-gradient-to-br from-background to-primary/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alunos Ativos</CardTitle>
            <Users className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,543</div>
            <div className="text-xs text-emerald-500 font-medium flex items-center gap-1">
              +15% este mês
              <div className="animate-pulse h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all hover:-translate-y-1 bg-gradient-to-br from-background to-primary/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mentores</CardTitle>
            <UserCog className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <div className="text-xs text-emerald-500 font-medium flex items-center gap-1">
              +3 este mês
              <div className="animate-pulse h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all hover:-translate-y-1 bg-gradient-to-br from-background to-primary/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cursos Ativos</CardTitle>
            <BookOpen className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <div className="text-xs text-emerald-500 font-medium flex items-center gap-1">
              +12 este mês
              <div className="animate-pulse h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all hover:-translate-y-1 bg-gradient-to-br from-background to-primary/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conclusão</CardTitle>
            <BarChart className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <div className="text-xs text-emerald-500 font-medium flex items-center gap-1">
              +5% que o mês anterior
              <div className="animate-pulse h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all hover:-translate-y-1 bg-gradient-to-br from-background to-primary/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Redações Enviadas</CardTitle>
            <FileText className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">867</div>
            <div className="text-xs text-emerald-500 font-medium flex items-center gap-1">
              +234 este mês
              <div className="animate-pulse h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all hover:-translate-y-1 bg-gradient-to-br from-background to-primary/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 125.432</div>
            <div className="text-xs text-emerald-500 font-medium flex items-center gap-1">
              +18% que o mês anterior
              <div className="animate-pulse h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="group hover:shadow-lg transition-all hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-primary" />
              Últimas Notificações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              "Novo mentor cadastrado: João Silva",
              "Curso de Python atingiu 100 alunos",
              "5 novas redações aguardando correção",
              "Novo material didático disponível",
            ].map((notification, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent transition-colors cursor-pointer group/item"
              >
                <Bell className="w-4 h-4 text-primary group-hover/item:scale-110 transition-transform" />
                <p className="text-sm">{notification}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-primary" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button 
              onClick={handleAddMentor}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white flex items-center gap-2 shadow-lg hover:shadow-green-500/20 transition-all"
            >
              <UserCog className="w-4 h-4" />
              Adicionar Novo Mentor
            </Button>
            <Button 
              onClick={handleCreateCourse}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white flex items-center gap-2 shadow-lg hover:shadow-blue-500/20 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              Criar Novo Curso
            </Button>
            <Button 
              onClick={handleSendNotification}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white flex items-center gap-2 shadow-lg hover:shadow-purple-500/20 transition-all"
            >
              <Send className="w-4 h-4" />
              Enviar Notificação
            </Button>
            <Button 
              onClick={handleGenerateReport}
              className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white flex items-center gap-2 shadow-lg hover:shadow-orange-500/20 transition-all"
            >
              <FileBarChart className="w-4 h-4" />
              Gerar Relatório
            </Button>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showMentorDialog} onOpenChange={setShowMentorDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Novo Mentor</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mentor-name">Nome do Mentor</Label>
              <Input id="mentor-name" placeholder="Digite o nome completo" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mentor-specialty">Especialidade</Label>
              <Input id="mentor-specialty" placeholder="Ex: Matemática, Português..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mentor-bio">Biografia</Label>
              <Textarea 
                id="mentor-bio" 
                placeholder="Breve descrição sobre o mentor..."
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMentorDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={() => {
              toast({
                title: "Mentor Adicionado",
                description: "O novo mentor foi cadastrado com sucesso!",
                className: "bg-green-500 text-white",
              })
              setShowMentorDialog(false)
            }}>
              Adicionar Mentor
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showCourseDialog} onOpenChange={setShowCourseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Novo Curso</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="course-title">Título do Curso</Label>
              <Input id="course-title" placeholder="Digite o título do curso" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course-description">Descrição</Label>
              <Textarea 
                id="course-description" 
                placeholder="Descreva o curso..."
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course-duration">Duração (horas)</Label>
              <Input id="course-duration" type="number" placeholder="Ex: 40" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCourseDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={() => {
              toast({
                title: "Curso Criado",
                description: "O novo curso foi criado com sucesso!",
                className: "bg-blue-500 text-white",
              })
              setShowCourseDialog(false)
            }}>
              Criar Curso
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showNotificationDialog} onOpenChange={setShowNotificationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enviar Notificação</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notification-title">Título da Notificação</Label>
              <Input id="notification-title" placeholder="Digite o título" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notification-message">Mensagem</Label>
              <Textarea 
                id="notification-message" 
                placeholder="Digite a mensagem da notificação..."
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNotificationDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={() => {
              toast({
                title: "Notificação Enviada",
                description: "A notificação foi enviada com sucesso para todos os usuários!",
                className: "bg-purple-500 text-white",
              })
              setShowNotificationDialog(false)
            }}>
              Enviar Notificação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>  */