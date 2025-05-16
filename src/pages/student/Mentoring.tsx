import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { UserResponseDTO } from '@/api/dtos/userDtos'
import { UserStudentAPI } from "@/api/student/controllers/UserStudentAPI"

// Mock data for fields not in UserResponseDTO
const mockMentorDetails = {
  avatar: "https://github.com/shadcn.png", // Default avatar
}

const Mentoring = () => {
  const navigate = useNavigate()
  const [mentors, setMentors] = useState<UserResponseDTO[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const availableMentors = await UserStudentAPI.findAvailableMentors()
        setMentors(availableMentors)
      } catch (error) {
        toast.error("Erro ao carregar mentores disponíveis")
      } finally {
        setLoading(false)
      }
    }

    fetchMentors()
  }, [])

  const handleScheduleMentoring = (mentorId: string) => {
    navigate(`/dashboard/mentoria/agendar/${mentorId}`)
    toast.success("Redirecionando para agendamento...")
  }

  if (loading) {
    return (
      <div className="container py-8">
        <p>Carregando mentores...</p>
      </div>
    )
  }

  return (
    <div className="container py-8 space-y-8 animate-fadeIn">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Mentoria</h1>
        <p className="text-muted-foreground">
          Conecte-se com mentores experientes para acelerar seu aprendizado
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mentors.map((mentor) => (
          <Card key={mentor.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <img
                  src={mentor.avatar? mentor.avatar : ""}
                  alt={mentor.name.substring(0,1)}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <CardTitle className="text-xl">{mentor.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {mentor.biography.substring(0, 50) + "..."}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow space-y-4">
              <Button 
                className="w-full mt-auto" 
                onClick={() => handleScheduleMentoring(mentor.id)}
              >
                Agendar Mentoria
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Mentoring