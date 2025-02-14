
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, GraduationCap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ClassCard } from "@/components/admin/classes/ClassCard"
import { NewClassDialog } from "@/components/admin/classes/NewClassDialog"
import { EditClassDialog } from "@/components/admin/classes/EditClassDialog"
import { DeleteClassDialog } from "@/components/admin/classes/DeleteClassDialog"
import { RegistrationLinkDialog } from "@/components/admin/classes/RegistrationLinkDialog"

const mockClasses = [
  {
    name: "Turma A - React Avançado",
    mentor: "João Silva",
    status: "Em andamento",
    students: 24,
    startDate: "15/03/2024",
    progress: 65,
  },
  {
    name: "Turma B - Node.js",
    mentor: "Maria Santos",
    status: "Iniciando",
    students: 18,
    startDate: "01/04/2024",
    progress: 0,
  },
  {
    name: "Turma C - TypeScript",
    mentor: "Pedro Oliveira",
    status: "Em andamento",
    students: 32,
    startDate: "10/02/2024",
    progress: 85,
  },
]

const AdminClasses = () => {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [isNewClassOpen, setIsNewClassOpen] = useState(false)
  const [isEditClassOpen, setIsEditClassOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [registrationLink, setRegistrationLink] = useState("")

  const handleNewClass = (e: React.FormEvent) => {
    e.preventDefault()
    setIsNewClassOpen(false)
    toast({
      title: "Turma criada",
      description: "A nova turma foi criada com sucesso.",
    })
  }

  const handleEditClass = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditClassOpen(false)
    toast({
      title: "Turma atualizada",
      description: "A turma foi atualizada com sucesso.",
    })
  }

  const handleDeleteClass = () => {
    setIsDeleteDialogOpen(false)
    toast({
      title: "Turma removida",
      description: "A turma foi removida com sucesso.",
    })
  }

  const generateLink = (className: string) => {
    setSelectedClass(className)
    setRegistrationLink(`https://plataforma.exemplo.com/register?class=${encodeURIComponent(className)}`)
    setIsLinkDialogOpen(true)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(registrationLink)
    toast({
      title: "Link copiado",
      description: "O link de cadastro foi copiado para a área de transferência.",
    })
  }

  return (
    <div className="container py-8 space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Turmas
            <span className="text-primary ml-2">{mockClasses.length}</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Gerencie as turmas e seus mentores
          </p>
        </div>
        <Button 
          onClick={() => setIsNewClassOpen(true)}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
        >
          <GraduationCap className="w-5 h-5 mr-2" />
          Nova Turma
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar turmas por nome, mentor ou curso..." 
            className="pl-10 py-6 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockClasses.map((classItem) => (
          <ClassCard
            key={classItem.name}
            {...classItem}
            onGenerateLink={generateLink}
            onEdit={(name) => {
              setSelectedClass(name)
              setIsEditClassOpen(true)
            }}
            onDelete={(name) => {
              setSelectedClass(name)
              setIsDeleteDialogOpen(true)
            }}
          />
        ))}
      </div>

      <NewClassDialog
        open={isNewClassOpen}
        onOpenChange={setIsNewClassOpen}
        onSubmit={handleNewClass}
      />

      <EditClassDialog
        open={isEditClassOpen}
        onOpenChange={setIsEditClassOpen}
        onSubmit={handleEditClass}
        selectedClass={selectedClass}
      />

      <DeleteClassDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteClass}
        selectedClass={selectedClass}
      />

      <RegistrationLinkDialog
        open={isLinkDialogOpen}
        onOpenChange={setIsLinkDialogOpen}
        onCopyLink={copyLink}
        selectedClass={selectedClass}
        registrationLink={registrationLink}
      />
    </div>
  )
}

export default AdminClasses
