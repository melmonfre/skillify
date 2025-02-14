
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

interface RankingUser {
  position: number
  name: string
  xp: number
  avatar: string
  isUser?: boolean
}

interface RankingSectionProps {
  users: RankingUser[]
}

export const RankingSection = ({ users }: RankingSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ranking Global</CardTitle>
        <CardDescription>Sua posição entre todos os alunos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.position}
              className={cn(
                "flex items-center gap-4 p-4 rounded-lg",
                user.isUser ? "bg-primary-50" : "hover:bg-gray-50"
              )}
            >
              <span className="font-bold w-8">{user.position}º</span>
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.xp} XP</p>
              </div>
              {user.position <= 3 && (
                <Trophy
                  className={cn(
                    "w-6 h-6",
                    user.position === 1
                      ? "text-yellow-500"
                      : user.position === 2
                      ? "text-gray-400"
                      : "text-orange-500"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
