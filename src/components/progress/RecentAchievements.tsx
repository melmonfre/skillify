
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Achievement } from "@/types"
import { Award } from "lucide-react"

interface RecentAchievementsProps {
  achievements: Achievement[]
}

export const RecentAchievements = ({ achievements }: RecentAchievementsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="w-5 h-5" />
          Conquistas Recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {achievements.slice(0, 3).map((achievement) => (
            <div
              key={achievement.id}
              className="flex items-center gap-3 p-3 bg-primary-50 rounded-lg"
            >
              <div className="p-2 bg-white rounded-full">
                <span className="text-2xl">{achievement.icon}</span>
              </div>
              <div>
                <p className="font-medium">{achievement.title}</p>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
                {achievement.progress && achievement.maxProgress && (
                  <Progress
                    value={(achievement.progress / achievement.maxProgress) * 100}
                    className="h-1 mt-2"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
