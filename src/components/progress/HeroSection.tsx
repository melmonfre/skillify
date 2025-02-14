
import { Progress } from "@/components/ui/progress"
import { User } from "@/types"
import { Flame, Trophy } from "lucide-react"

interface HeroSectionProps {
  user: User
}

export const HeroSection = ({ user }: HeroSectionProps) => {
  const nextLevel = user.level + 1
  const xpForNextLevel = nextLevel * 1000
  const xpProgress = (user.xp % 1000) / 10

  return (
    <div className="bg-gradient-to-r from-primary-100 to-primary-200 rounded-lg p-8 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold">Nível {user.level}</h1>
        <p className="text-xl text-primary-700">
          {user.xp} XP • {xpForNextLevel - user.xp} XP para o próximo nível
        </p>
        <Progress value={xpProgress} className="h-3 mt-4 w-full md:w-64" />
      </div>
      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className="bg-white p-4 rounded-full">
            <Flame className="w-8 h-8 text-orange-500" />
          </div>
          <p className="mt-2 font-semibold">{user.streakDays} dias</p>
          <p className="text-sm text-primary-700">Sequência</p>
        </div>
        <div className="text-center">
          <div className="bg-white p-4 rounded-full">
            <Trophy className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="mt-2 font-semibold">{user.achievements.length}</p>
          <p className="text-sm text-primary-700">Conquistas</p>
        </div>
      </div>
    </div>
  )
}
