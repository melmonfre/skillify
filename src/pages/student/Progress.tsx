
import { currentUser } from "@/data/mock"
import { HeroSection } from "@/components/progress/HeroSection"
import { RecentAchievements } from "@/components/progress/RecentAchievements"
import { LearningStats } from "@/components/progress/LearningStats"
import { XPChart } from "@/components/progress/XPChart"
import { RankingSection } from "@/components/progress/RankingSection"

const performanceData = [
  { month: "Jan", completed: 4, xp: 1200 },
  { month: "Fev", completed: 3, xp: 900 },
  { month: "Mar", completed: 6, xp: 1800 },
  { month: "Abr", completed: 8, xp: 2400 },
  { month: "Mai", completed: 7, xp: 2100 },
  { month: "Jun", completed: 9, xp: 2700 },
]

const rankingData = [
  { position: 1, name: "João Silva", xp: 15000, avatar: "/placeholder.svg" },
  { position: 2, name: "Maria Santos", xp: 14500, avatar: "/placeholder.svg" },
  { position: 3, name: "Você", xp: 14000, avatar: currentUser.avatar, isUser: true },
  { position: 4, name: "Pedro Oliveira", xp: 13800, avatar: "/placeholder.svg" },
]

const Progress = () => {
  return (
    <div className="container py-8 space-y-8 animate-fade-in">
      <HeroSection user={currentUser} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <RecentAchievements achievements={currentUser.achievements} />
        <LearningStats />
        <XPChart data={performanceData} />
      </div>

      <RankingSection users={rankingData} />
    </div>
  )
}

export default Progress
