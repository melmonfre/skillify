// src/components/redacoes/EssayAssignmentCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

interface EssayAssignmentCardProps {
  title: string
  classroom: string // Changed from student to classroom for assignment context
  deadline: string // Renamed from date for clarity
  onView: () => void
}

export const EssayAssignmentCard = ({ title, classroom, deadline, onView }: EssayAssignmentCardProps) => (
  <Card className="overflow-hidden bg-gradient-to-br from-black/40 to-black/20 border-slate-800 hover:border-slate-700 transition-all duration-300">
    <CardHeader className="p-4 pb-0">
      <CardTitle className="text-lg text-white">{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col justify-between h-[calc(100%-60px)] p-4">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span>{classroom}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Clock className="w-4 h-4" />
          <span>Prazo: {deadline}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 mt-4">
        <Button 
          variant="outline" 
          className="w-full bg-white/5 border-slate-800 hover:bg-white/10 hover:border-slate-700 text-white"
          onClick={onView}
        >
          Ver Detalhes
        </Button>
      </div>
    </CardContent>
  </Card>
)