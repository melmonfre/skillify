
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { SimuladoCard } from "@/components/simulados/SimuladoCard"
import { NovoSimuladoDialog } from "@/components/simulados/NovoSimuladoDialog"
import { ResultadosDialog } from "@/components/simulados/ResultadosDialog"

interface SimuladoForm {
  title: string
  totalQuestions: string
  duration: string
  date: string
  class: string
  subjects: string[]
}

const MentorSimulados = () => {
  const { toast } = useToast()
  const [isNewSimuladoOpen, setIsNewSimuladoOpen] = useState(false)
  const [isResultsOpen, setIsResultsOpen] = useState(false)
  const [simuladoForm, setSimuladoForm] = useState<SimuladoForm>({
    title: "",
    totalQuestions: "",
    duration: "",
    date: "",
    class: "",
    subjects: []
  })

  const handleNewSimulado = () => {
    if (!simuladoForm.title || !simuladoForm.totalQuestions || !simuladoForm.duration || !simuladoForm.date) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Simulado criado!",
      description: "O simulado foi criado com sucesso e já está disponível para os alunos.",
      variant: "default"
    })
    setIsNewSimuladoOpen(false)
    setSimuladoForm({
      title: "",
      totalQuestions: "",
      duration: "",
      date: "",
      class: "",
      subjects: []
    })
  }

  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-white to-white/70 bg-clip-text">
            Gerenciar Simulados
          </h1>
          <p className="text-slate-400">
            Crie e acompanhe o desempenho dos alunos nos simulados
          </p>
        </div>
        <Button 
          className="bg-purple-600 hover:bg-purple-700 text-white border-none"
          onClick={() => setIsNewSimuladoOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Simulado
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input 
          placeholder="Buscar simulados..." 
          className="pl-10 bg-white/5 border-slate-800 text-white placeholder:text-slate-400"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <SimuladoCard onViewResults={() => setIsResultsOpen(true)} />
        <SimuladoCard onViewResults={() => setIsResultsOpen(true)} />
        <SimuladoCard onViewResults={() => setIsResultsOpen(true)} />
      </div>

      <NovoSimuladoDialog
        open={isNewSimuladoOpen}
        onOpenChange={setIsNewSimuladoOpen}
        form={simuladoForm}
        onFormChange={setSimuladoForm}
        onSubmit={handleNewSimulado}
      />

      <ResultadosDialog
        open={isResultsOpen}
        onOpenChange={setIsResultsOpen}
      />
    </div>
  )
}

export default MentorSimulados
