
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, PackagePlus, Edit, Trash2, Users } from "lucide-react"
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
import type { Plan } from "@/types"

const AdminPlans = () => {
  const { toast } = useToast()
  const [isNewPlanOpen, setIsNewPlanOpen] = useState(false)
  const [isEditPlanOpen, setIsEditPlanOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const handleNewPlan = (e: React.FormEvent) => {
    e.preventDefault()
    setIsNewPlanOpen(false)
    toast({
      title: "Plano criado",
      description: "O novo plano foi criado com sucesso.",
    })
  }

  const handleEditPlan = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditPlanOpen(false)
    toast({
      title: "Plano atualizado",
      description: "O plano foi atualizado com sucesso.",
    })
  }

  const handleDeletePlan = () => {
    setIsDeleteDialogOpen(false)
    toast({
      title: "Plano removido",
      description: "O plano foi removido com sucesso.",
    })
  }

  const openEditDialog = (planTitle: string) => {
    setSelectedPlan(planTitle)
    setIsEditPlanOpen(true)
  }

  const openDeleteDialog = (planTitle: string) => {
    setSelectedPlan(planTitle)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Gerenciar Planos
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Configure os planos disponíveis na plataforma
          </p>
        </div>
        <Button 
          onClick={() => setIsNewPlanOpen(true)}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
        >
          <PackagePlus className="w-5 h-5 mr-2" />
          Novo Plano
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Buscar planos..." 
            className="pl-10 py-6 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-primary/5">
          <CardHeader>
            <div className="flex justify-between items-start mb-4">
              <CardTitle className="text-2xl font-bold">Plano Premium</CardTitle>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">234 assinantes</span>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Preço mensal</div>
                <div className="text-2xl font-bold text-purple-600">R$ 99,90</div>
              </div>
              <div className="text-sm text-muted-foreground">
                Acesso completo a todos os recursos da plataforma
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                className="w-full border-primary/20 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300"
                onClick={() => openEditDialog("Plano Premium")}
              >
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </Button>
              <Button 
                variant="destructive" 
                className="w-full hover:bg-red-700 transition-all duration-300"
                onClick={() => openDeleteDialog("Plano Premium")}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remover
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal Novo Plano */}
      <Dialog open={isNewPlanOpen} onOpenChange={setIsNewPlanOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Criar Novo Plano</DialogTitle>
            <DialogDescription>
              Preencha as informações do novo plano abaixo.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleNewPlan} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do plano</Label>
              <Input id="name" required className="text-lg py-6" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea 
                id="description" 
                required 
                className="min-h-[100px] text-lg"
                placeholder="Descreva os benefícios do plano"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Preço mensal (R$)</Label>
                <Input 
                  id="price" 
                  type="number" 
                  step="0.01" 
                  required 
                  className="text-lg py-6"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interval">Intervalo</Label>
                <Select>
                  <SelectTrigger className="text-lg py-6">
                    <SelectValue placeholder="Selecione o intervalo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Mensal</SelectItem>
                    <SelectItem value="yearly">Anual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="features">Recursos (um por linha)</Label>
              <Textarea 
                id="features" 
                required 
                className="min-h-[150px] text-lg"
                placeholder="Digite os recursos do plano, um por linha&#13;&#10;Exemplo:&#13;&#10;✓ Acesso a todos os cursos&#13;&#10;✓ Mentoria semanal&#13;&#10;✓ Certificados premium"
              />
            </div>
            <DialogFooter>
              <Button 
                type="submit"
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
              >
                Criar Plano
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal Editar Plano */}
      <Dialog open={isEditPlanOpen} onOpenChange={setIsEditPlanOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Editar Plano</DialogTitle>
            <DialogDescription>
              Edite as informações do plano {selectedPlan}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditPlan} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="editName">Nome do plano</Label>
              <Input 
                id="editName" 
                defaultValue={selectedPlan || ""} 
                required 
                className="text-lg py-6"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editDescription">Descrição</Label>
              <Textarea 
                id="editDescription" 
                required 
                className="min-h-[100px] text-lg"
                defaultValue="Acesso ilimitado a todos os cursos e recursos premium."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editPrice">Preço mensal (R$)</Label>
                <Input 
                  id="editPrice" 
                  type="number" 
                  step="0.01" 
                  defaultValue="99.90"
                  required 
                  className="text-lg py-6"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editInterval">Intervalo</Label>
                <Select defaultValue="monthly">
                  <SelectTrigger className="text-lg py-6">
                    <SelectValue placeholder="Selecione o intervalo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Mensal</SelectItem>
                    <SelectItem value="yearly">Anual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="editFeatures">Recursos (um por linha)</Label>
              <Textarea 
                id="editFeatures" 
                required 
                className="min-h-[150px] text-lg"
                defaultValue="✓ Acesso a todos os cursos&#13;&#10;✓ Mentoria semanal&#13;&#10;✓ Certificados premium&#13;&#10;✓ Suporte prioritário"
              />
            </div>
            <DialogFooter>
              <Button 
                type="submit"
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
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
            <AlertDialogTitle className="text-2xl">Remover Plano</AlertDialogTitle>
            <AlertDialogDescription className="text-lg">
              Tem certeza que deseja remover o plano {selectedPlan}? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="text-lg">Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeletePlan}
              className="bg-red-600 hover:bg-red-700 text-lg transition-colors"
            >
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default AdminPlans
