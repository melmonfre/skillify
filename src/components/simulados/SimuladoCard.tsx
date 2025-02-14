
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Clock, Target, BarChart } from "lucide-react"

interface SimuladoCardProps {
  onViewResults: () => void
}

export function SimuladoCard({ onViewResults }: SimuladoCardProps) {
  return (
    <Card className="group overflow-hidden bg-gradient-to-br from-black/40 to-black/20 border-slate-800 hover:border-slate-700 transition-all duration-300">
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="text-lg text-white">Simulado ENEM 2024</CardTitle>
          <Badge className="bg-amber-500/20 text-amber-400 hover:bg-amber-500/30">
            Em Andamento
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Users className="w-4 h-4" />
              <span>45 alunos participando</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Clock className="w-4 h-4" />
              <span>Termina em 2 dias</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Target className="w-4 h-4" />
              <span>90 questões</span>
            </div>
          </div>
          
          <div className="pt-4">
            <Button
              variant="outline"
              onClick={onViewResults}
              className="w-full bg-white/5 border-slate-800 hover:bg-white/10 hover:border-slate-700 text-white"
            >
              <BarChart className="w-4 h-4 mr-2" />
              Ver Resultados Parciais
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
