
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"

interface CorrectionForm {
  generalComments: string
  structureScore: string
  argumentationScore: string
  proposalScore: string
  languageScore: string
  competencyScore: string
}

interface CorrectionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  form: CorrectionForm
  onFormChange: (form: CorrectionForm) => void
  onSubmit: () => void
}

export const CorrectionDialog = ({ 
  open, 
  onOpenChange, 
  form, 
  onFormChange,
  onSubmit 
}: CorrectionDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-slate-900 border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-white">Corrigir Redação</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label className="text-white">Texto do Aluno</Label>
            <Card className="p-4 bg-white/5 border-slate-800">
              <p className="text-sm text-slate-400 whitespace-pre-line">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </Card>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comments" className="text-white">Comentários Gerais</Label>
            <Textarea
              id="comments"
              value={form.generalComments}
              onChange={(e) => onFormChange({ ...form, generalComments: e.target.value })}
              placeholder="Digite seus comentários sobre a redação..."
              className="min-h-[100px] bg-white/5 border-slate-800 text-white placeholder:text-slate-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="structure" className="text-white">Nota - Estrutura e Coesão (200)</Label>
              <Input
                id="structure"
                type="number"
                max="200"
                value={form.structureScore}
                onChange={(e) => onFormChange({ ...form, structureScore: e.target.value })}
                className="bg-white/5 border-slate-800 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="argumentation" className="text-white">Nota - Argumentação (200)</Label>
              <Input
                id="argumentation"
                type="number"
                max="200"
                value={form.argumentationScore}
                onChange={(e) => onFormChange({ ...form, argumentationScore: e.target.value })}
                className="bg-white/5 border-slate-800 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="proposal" className="text-white">Nota - Proposta de Intervenção (200)</Label>
              <Input
                id="proposal"
                type="number"
                max="200"
                value={form.proposalScore}
                onChange={(e) => onFormChange({ ...form, proposalScore: e.target.value })}
                className="bg-white/5 border-slate-800 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language" className="text-white">Nota - Domínio da Língua (200)</Label>
              <Input
                id="language"
                type="number"
                max="200"
                value={form.languageScore}
                onChange={(e) => onFormChange({ ...form, languageScore: e.target.value })}
                className="bg-white/5 border-slate-800 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="competency" className="text-white">Nota - Competências (200)</Label>
              <Input
                id="competency"
                type="number"
                max="200"
                value={form.competencyScore}
                onChange={(e) => onFormChange({ ...form, competencyScore: e.target.value })}
                className="bg-white/5 border-slate-800 text-white"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="bg-white/5 border-slate-800 hover:bg-white/10 hover:border-slate-700 text-white"
          >
            Cancelar
          </Button>
          <Button 
            onClick={onSubmit}
            className="bg-purple-600 hover:bg-purple-700 text-white border-none"
          >
            Enviar Correção
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
