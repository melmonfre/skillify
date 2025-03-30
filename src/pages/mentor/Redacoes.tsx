// src/components/mentor/MentorRedacoes.tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { EssayCard } from "@/components/redacoes/EssayCard"
import { CorrectionDialog } from "@/components/redacoes/CorrectionDialog"
import { NewEssayDialog } from "@/components/redacoes/NewEssayDialog"
import { EssayMentorAPI } from "@/api/mentor/controllers/EssayMentorAPI"
import { EssayCreateDTO, EssayResponseDTO } from "@/api/dtos/essayDtos"
import { ClassroomMentorAPI } from "@/api/mentor/controllers/ClassroomMentorAPI"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CorrectionForm {
  generalComments: string
  structureScore: string
  argumentationScore: string
  proposalScore: string
  languageScore: string
  competencyScore: string
}

const MentorRedacoes = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isCorrectionOpen, setIsCorrectionOpen] = useState(false)
  const [isNewEssayOpen, setIsNewEssayOpen] = useState(false)
  const [selectedEssay, setSelectedEssay] = useState<string>("")
  const [essays, setEssays] = useState<EssayResponseDTO[]>([])
  const [classrooms, setClassrooms] = useState<{ id: string; name: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [correctionForm, setCorrectionForm] = useState<CorrectionForm>({
    generalComments: "",
    structureScore: "",
    argumentationScore: "",
    proposalScore: "",
    languageScore: "",
    competencyScore: ""
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const classroomData = await ClassroomMentorAPI.getAllClassrooms()
        setClassrooms(classroomData.map(c => ({ id: c.id, name: c.name })))
        if (classroomData.length > 0) {
          const essayData = await EssayMentorAPI.getEssaysByClassroom(classroomData[0].id)
          setEssays(essayData)
        }
      } catch (error) {
        toast({
          title: "Erro",
          description: "Falha ao carregar os dados",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [toast])

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

  const handleCreateEssay = async (values: EssayCreateDTO) => {
    try {
      const createdEssay = await EssayMentorAPI.createEssay(values)
      setEssays([...essays, createdEssay])
      toast({
        title: "Redação criada",
        description: "A redação foi criada com sucesso!"
      })
      setIsNewEssayOpen(false)
    } catch (error) {
      toast({
        title: "Erro ao criar redação",
        description: "Não foi possível criar a redação",
        variant: "destructive",
      })
    }
  }

  const handleViewCorrection = (essayId: string) => {
    navigate(`/redacoes/correcao/${essayId}`)
    toast({
      title: "Visualizando correção",
      description: "Carregando detalhes da correção..."
    })
  }

  const filteredEssays = essays.filter(essay =>
    essay.theme.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return <div className="p-6">Carregando...</div>
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

      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Buscar redações..." 
            className="pl-10 bg-white/5 border-slate-800 text-white placeholder:text-slate-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-[200px] grid-cols-2 bg-white/5">
            <TabsTrigger value="all" className="text-white data-[state=active]:bg-purple-600">
              Todas
            </TabsTrigger>
            <TabsTrigger value="correct" className="text-white data-[state=active]:bg-purple-600">
              Corrigir
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
              {filteredEssays.map(essay => (
                <EssayCard 
                  key={essay.id}
                  title={essay.theme}
                  student={essay.classroom.students.values().next().value?.name || "Estudante"}
                  status="pending"
                  date={`Prazo: ${new Date(essay.maxDate).toLocaleDateString()}`}
                  onCorrect={() => handleStartCorrection(essay.id)}
                  onView={() => handleViewCorrection(essay.id)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="correct">
            <div className="mt-4 text-slate-400">
              {/* Empty state for essays to be corrected */}
              <p>Nenhuma redação para corrigir no momento.</p>
            </div>
          </TabsContent>
        </Tabs>
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
        onSubmit={handleCreateEssay}
        classrooms={classrooms}
      />
    </div>
  )
}

export default MentorRedacoes