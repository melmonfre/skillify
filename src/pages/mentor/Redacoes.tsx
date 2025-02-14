
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { EssayCard } from "@/components/redacoes/EssayCard"
import { CorrectionDialog } from "@/components/redacoes/CorrectionDialog"
import { NewEssayDialog } from "@/components/redacoes/NewEssayDialog"

interface CorrectionForm {
  generalComments: string
  structureScore: string
  argumentationScore: string
  proposalScore: string
  languageScore: string
  competencyScore: string
}

interface NewEssayForm {
  title: string
  description: string
  deadline: string
  minWords: string
  class: string
}

const MentorRedacoes = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isCorrectionOpen, setIsCorrectionOpen] = useState(false)
  const [isNewEssayOpen, setIsNewEssayOpen] = useState(false)
  const [selectedEssay, setSelectedEssay] = useState("")
  const [correctionForm, setCorrectionForm] = useState<CorrectionForm>({
    generalComments: "",
    structureScore: "",
    argumentationScore: "",
    proposalScore: "",
    languageScore: "",
    competencyScore: ""
  })
  const [newEssayForm, setNewEssayForm] = useState<NewEssayForm>({
    title: "",
    description: "",
    deadline: "",
    minWords: "",
    class: ""
  })

  const handleStartCorrection = (essayId: string) => {
    setSelectedEssay(essayId)
    setIsCorrectionOpen(true)
  }

  const handleSubmitCorrection = () => {
    toast({
      title: "Correção enviada",
      description: "A correção foi salva com sucesso!"
    })
    setIsCorrectionOpen(false)
  }

  const handleCreateEssay = () => {
    toast({
      title: "Redação criada",
      description: "A redação foi criada com sucesso!"
    })
    setIsNewEssayOpen(false)
  }

  const handleViewCorrection = (essayId: string) => {
    navigate(`/redacoes/correcao/${essayId}`)
    toast({
      title: "Visualizando correção",
      description: "Carregando detalhes da correção..."
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Gerenciar Redações
          </h1>
          <p className="text-slate-400">
            Corrija e avalie as redações dos alunos
          </p>
        </div>
        <Button 
          onClick={() => setIsNewEssayOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white border-none"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Redação
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input 
          placeholder="Buscar redações..." 
          className="pl-10 bg-white/5 border-slate-800 text-white placeholder:text-slate-400"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <EssayCard 
          title="Os Desafios da Educação"
          student="Maria Silva"
          status="pending"
          date="Enviada há 2 dias"
          onCorrect={() => handleStartCorrection("1")}
          onView={() => handleViewCorrection("1")}
        />

        <EssayCard 
          title="Tecnologia e Sociedade"
          student="João Santos"
          status="corrected"
          date="Corrigida há 1 dia"
          score={850}
          onCorrect={() => handleStartCorrection("2")}
          onView={() => handleViewCorrection("2")}
        />
      </div>

      <CorrectionDialog 
        open={isCorrectionOpen}
        onOpenChange={setIsCorrectionOpen}
        form={correctionForm}
        onFormChange={setCorrectionForm}
        onSubmit={handleSubmitCorrection}
      />

      <NewEssayDialog
        open={isNewEssayOpen}
        onOpenChange={setIsNewEssayOpen}
        form={newEssayForm}
        onFormChange={setNewEssayForm}
        onSubmit={handleCreateEssay}
      />
    </div>
  )
}

export default MentorRedacoes
