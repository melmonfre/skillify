import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Plus, Trash2, ImageIcon, TextCursorInput } from 'lucide-react';
import { QuestionContentType, QuestionResponseDTO } from '@/api/dtos/questionDtos';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { CourseMentorAPI } from '@/api/mentor/controllers/CourseMentorAPI';
import { CourseResponseDTO } from '@/api/dtos/courseDtos';
import { useToast } from '@/hooks/use-toast';

interface QuestionOption {
  id?: string; // Include id for existing options
  title: string;
  correct: boolean;
}

interface QuestionContentItem {
  id: string;
  type: QuestionContentType | null;
  value: string;
}

interface EditQuestionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  question: QuestionResponseDTO | null;
  onSubmit: (question: { 
    title: string; 
    options: QuestionOption[]; 
    courseId?: string 
  }, contentItems: QuestionContentItem[]) => void;
}

export function EditQuestionDialog({ isOpen, onOpenChange, question, onSubmit }: EditQuestionDialogProps) {
  const { toast } = useToast();
  const [editQuestion, setEditQuestion] = useState({
    title: '',
    courseId: undefined as string | undefined,
    options: [] as QuestionOption[],
  });

  const [contentItems, setContentItems] = useState<QuestionContentItem[]>([
    { id: crypto.randomUUID(), type: null, value: '' }
  ]);

  const [courses, setCourses] = useState<CourseResponseDTO[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(false);

  // Load courses and populate form when dialog opens
  useEffect(() => {
    if (isOpen && question) {
      loadCourses();
      // Populate form with existing question data
      setEditQuestion({
        title: question.title,
        courseId: question.course?.id,
        options: question.options.map(opt => ({
          id: opt.id,
          title: opt.title,
          correct: opt.correct,
        })),
      });
      // Populate content items
      setContentItems(
        question.content.length > 0
          ? question.content.map(content => ({
              id: content.id,
              type: content.type,
              value: content.value,
            }))
          : [{ id: crypto.randomUUID(), type: null, value: '' }]
      );
    }
  }, [isOpen, question]);

  const loadCourses = async () => {
    setIsLoadingCourses(true);
    try {
      const courses = await CourseMentorAPI.getAllCoursesByMentor();
      setCourses(courses);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Falha ao carregar cursos',
        variant: 'destructive',
      });
    } finally {
      setIsLoadingCourses(false);
    }
  };

  const handleOptionChange = (index: number, field: string, value: string | boolean) => {
    const updatedOptions = [...editQuestion.options];
    updatedOptions[index] = {
      ...updatedOptions[index],
      [field]: value,
    };
    setEditQuestion({
      ...editQuestion,
      options: updatedOptions,
    });
  };

  const handleCourseChange = (value: string) => {
    setEditQuestion({
      ...editQuestion,
      courseId: value === 'none' ? undefined : value
    });
  };

  const addOption = () => {
    setEditQuestion({
      ...editQuestion,
      options: [...editQuestion.options, { title: '', correct: false }],
    });
  };

  const removeOption = (index: number) => {
    const updatedOptions = [...editQuestion.options];
    updatedOptions.splice(index, 1);
    setEditQuestion({
      ...editQuestion,
      options: updatedOptions,
    });
  };

  const addContentItem = () => {
    setContentItems([...contentItems, { id: crypto.randomUUID(), type: null, value: '' }]);
  };

  const removeContentItem = (id: string) => {
    if (contentItems.length > 1) {
      setContentItems(contentItems.filter(item => item.id !== id));
    }
  };

  const updateContentItem = (id: string, field: 'type' | 'value', newValue: string | QuestionContentType) => {
    setContentItems(
      contentItems.map(item =>
        item.id === id ? { ...item, [field]: newValue } : item
      )
    );
  };

  const handleSubmit = () => {
    onSubmit({
      title: editQuestion.title,
      options: editQuestion.options,
      courseId: editQuestion.courseId
    }, contentItems);
    
    // Reset form
    setEditQuestion({
      title: '',
      courseId: undefined,
      options: [],
    });
    setContentItems([{ id: crypto.randomUUID(), type: null, value: '' }]);
    onOpenChange(false);
  };

  const renderContentBuilder = () => (
    <div className="space-y-4">
      <Label>Conteúdo da Questão</Label>
      <div className="space-y-3">
        {contentItems.map((item) => (
          <div key={item.id} className="relative group">
            {item.type === null ? (
              <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center hover:border-slate-600 transition-colors">
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    className="border-slate-700 hover:bg-slate-800"
                    onClick={() => updateContentItem(item.id, 'type', QuestionContentType.TEXT)}
                  >
                    <TextCursorInput className="h-4 w-4 mr-2" />
                    Texto
                  </Button>
                  <Button
                    variant="outline"
                    className="border-slate-700 hover:bg-slate-800"
                    onClick={() => updateContentItem(item.id, 'type', QuestionContentType.IMAGE)}
                  >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Imagem
                  </Button>
                </div>
              </div>
            ) : (
              <div className="border border-slate-800 rounded-lg p-4 bg-white/5">
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="outline" className="bg-slate-900 text-slate-300">
                    {item.type === QuestionContentType.TEXT ? 'Texto' : 'Imagem'}
                  </Badge>
                  {contentItems.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-red-400 hover:text-red-300"
                      onClick={() => removeContentItem(item.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                
                {item.type === QuestionContentType.TEXT ? (
                  <Textarea
                    className="bg-slate-900 border-slate-800 text-white"
                    value={item.value}
                    onChange={(e) => updateContentItem(item.id, 'value', e.target.value)}
                    placeholder="Digite o conteúdo textual..."
                    rows={3}
                  />
                ) : (
                  <div className="space-y-2">
                    <Input
                      className="bg-slate-900 border-slate-800 text-white"
                      value={item.value}
                      onChange={(e) => updateContentItem(item.id, 'value', e.target.value)}
                      placeholder="URL da imagem..."
                    />
                    {item.value && (
                      <div className="mt-2">
                        <img 
                          src={item.value} 
                          alt="Preview" 
                          className="max-h-40 rounded-md border border-slate-800"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        className="mt-2 border-slate-800 text-white"
        onClick={addContentItem}
      >
        <Plus className="h-4 w-4 mr-2" />
        Adicionar Seção
      </Button>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/80 border-slate-800 text-white max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Questão</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="question-title">Título da Questão</Label>
            <Input
              id="question-title"
              className="bg-white/5 border-slate-800 mt-1"
              value={editQuestion.title}
              onChange={(e) => setEditQuestion({ ...editQuestion, title: e.target.value })}
              placeholder="Digite o enunciado da questão"
            />
          </div>

          <div>
            <Label htmlFor="question-course">Curso (Opcional)</Label>
            <Select 
              value={editQuestion.courseId || 'none'} 
              onValueChange={handleCourseChange}
              disabled={isLoadingCourses}
            >
              <SelectTrigger className="bg-white/5 border-slate-800 text-white">
                <SelectValue placeholder={isLoadingCourses ? "Carregando cursos..." : "Selecione um curso"} />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-800">
                <SelectItem value="none">Nenhum curso (opcional)</SelectItem>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {renderContentBuilder()}

          <div className="space-y-2">
            <Label>Opções de Resposta</Label>
            {editQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  className="bg-white/5 border-slate-800 flex-1"
                  value={option.title}
                  onChange={(e) => handleOptionChange(index, 'title', e.target.value)}
                  placeholder={`Opção ${index + 1}`}
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={option.correct}
                    onChange={(e) => handleOptionChange(index, 'correct', e.target.checked)}
                    className="h-4 w-4 rounded border-slate-800 bg-white/5"
                  />
                  <span className="text-sm">Correta</span>
                </div>
                {editQuestion.options.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-400 hover:text-red-300"
                    onClick={() => removeOption(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              variant="outline"
              className="mt-2 border-slate-800 text-white"
              onClick={addOption}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Opção
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-slate-800 text-white"
          >
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Salvar Alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}