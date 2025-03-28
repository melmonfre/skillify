import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { CourseLessonCategoryResponseDTO } from "@/api/dtos/courseLessonCategoryDtos"

interface LessonDialogsProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: () => void
    isLoading: boolean
    categories: CourseLessonCategoryResponseDTO[]
    selectedCategoryId: string
    onCategoryChange: (id: string) => void
    onNewCategoryOpen: () => void
  }
  
  export const LessonDialogs = ({
    isOpen,
    onOpenChange,
    onSubmit,
    isLoading,
    categories,
    selectedCategoryId,
    onCategoryChange,
    onNewCategoryOpen
  }: LessonDialogsProps) => {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Nova Aula</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="lesson-title">Nome da Aula</Label>
              <Input id="lesson-title" disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lesson-duration">Duração (minutos)</Label>
              <Input 
                id="lesson-duration" 
                type="number" 
                disabled={isLoading} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lesson-category">Categoria da Aula</Label>
              <div className="flex gap-2">
                <Select 
                  value={selectedCategoryId} 
                  onValueChange={onCategoryChange}
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  onClick={onNewCategoryOpen}
                  disabled={isLoading}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lesson-files">Arquivos da Aula (URLs)</Label>
              <Input 
                id="lesson-files" 
                placeholder="Insira URLs separadas por vírgula" 
                disabled={isLoading}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button 
              onClick={onSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Adicionando..." : "Adicionar Aula"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

interface NewCategoryDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: () => void
  isLoading: boolean
  categoryName: string
  onCategoryNameChange: (name: string) => void
}

export const NewCategoryDialog = ({
  isOpen,
  onOpenChange,
  onSubmit,
  isLoading,
  categoryName,
  onCategoryNameChange
}: NewCategoryDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Nova Categoria</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="category-name">Nome da Categoria</Label>
            <Input
              id="category-name"
              value={categoryName}
              onChange={(e) => onCategoryNameChange(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button 
            onClick={onSubmit}
            disabled={isLoading || !categoryName}
          >
            {isLoading ? "Criando..." : "Criar Categoria"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}