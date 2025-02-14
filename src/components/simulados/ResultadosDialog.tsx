
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"
import { Trophy, Users, Target } from "lucide-react"

interface ResultadosDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ResultadosDialog({ open, onOpenChange }: ResultadosDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-slate-900 border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-white">Resultados Parciais</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 bg-white/5 border-slate-800">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="text-sm text-slate-400">Participantes</p>
                  <p className="text-2xl font-bold text-white">45</p>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-white/5 border-slate-800">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-amber-400" />
                <div>
                  <p className="text-sm text-slate-400">Média Geral</p>
                  <p className="text-2xl font-bold text-white">720</p>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-white/5 border-slate-800">
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-emerald-400" />
                <div>
                  <p className="text-sm text-slate-400">Taxa de Acerto</p>
                  <p className="text-2xl font-bold text-white">65%</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white">Matemática</span>
                <span className="text-slate-400">75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white">Português</span>
                <span className="text-slate-400">82%</span>
              </div>
              <Progress value={82} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white">Ciências</span>
                <span className="text-slate-400">68%</span>
              </div>
              <Progress value={68} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white">Humanas</span>
                <span className="text-slate-400">71%</span>
              </div>
              <Progress value={71} className="h-2" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
