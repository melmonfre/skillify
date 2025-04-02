import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { QuestionMentorAPI } from '@/api/mentor/controllers/QuestionMentorAPI';
import { OptionMentorAPI } from '@/api/mentor/controllers/OptionMentorAPI';
import { QuestionResponseDTO } from '@/api/dtos/questionDtos';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function MentorQuestionBank() {
  const { toast } = useToast();
  const [mentorQuestions, setMentorQuestions] = useState<QuestionResponseDTO[]>([]);
  const [superAdminQuestions, setSuperAdminQuestions] = useState<QuestionResponseDTO[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    options: [
      { title: '', correct: false },
      { title: '', correct: false },
      { title: '', correct: false },
      { title: '', correct: false },
    ],
  });

  const mentorId = localStorage.getItem('userId') || '';

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const [mentorQs, superAdminQs] = await Promise.all([
          QuestionMentorAPI.getAllQuestions(),
          QuestionMentorAPI.getSuperAdminQuestions(),
        ]);
        setMentorQuestions(mentorQs);
        setSuperAdminQuestions(superAdminQs);
      } catch (error) {
        toast({
          title: 'Erro',
          description: 'Falha ao carregar as questões',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, [toast]);

  const filterQuestions = (questions: QuestionResponseDTO[]) =>
    questions.filter(question =>
      question.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const filteredMentorQuestions = filterQuestions(mentorQuestions);
  const filteredSuperAdminQuestions = filterQuestions(superAdminQuestions);

  const toggleQuestionExpansion = (questionId: string) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedQuestions(newExpanded);
  };

  const handleDeleteQuestion = async () => {
    if (!questionToDelete) return;

    try {
      await QuestionMentorAPI.deleteQuestion(questionToDelete);
      setMentorQuestions(mentorQuestions.filter(q => q.id !== questionToDelete));
      toast({
        title: 'Sucesso',
        description: 'Questão removida com sucesso',
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Falha ao remover a questão',
        variant: 'destructive',
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setQuestionToDelete(null);
    }
  };

  const handleCreateQuestion = async () => {
    if (!newQuestion.title.trim()) {
      toast({
        title: 'Erro',
        description: 'O título da questão é obrigatório',
        variant: 'destructive',
      });
      return;
    }

    const hasCorrectOption = newQuestion.options.some(option => option.correct);
    if (!hasCorrectOption) {
      toast({
        title: 'Erro',
        description: 'Pelo menos uma opção deve estar correta',
        variant: 'destructive',
      });
      return;
    }

    try {
      const createdQuestion = await QuestionMentorAPI.createQuestion({
        title: newQuestion.title,
        mentorId,
      });

      for (const option of newQuestion.options) {
        if (option.title.trim()) {
          await OptionMentorAPI.createOption({
            questionId: createdQuestion.id,
            title: option.title,
            correct: option.correct,
          });
        }
      }

      const updatedQuestions = await QuestionMentorAPI.getAllQuestions();
      setMentorQuestions(updatedQuestions);

      toast({
        title: 'Sucesso',
        description: 'Questão criada com sucesso',
        variant: 'default',
      });

      setNewQuestion({
        title: '',
        options: [
          { title: '', correct: false },
          { title: '', correct: false },
          { title: '', correct: false },
          { title: '', correct: false },
        ],
      });
      setIsCreateDialogOpen(false);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Falha ao criar a questão',
        variant: 'destructive',
      });
    }
  };

  const handleOptionChange = (index: number, field: string, value: string | boolean) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index] = {
      ...updatedOptions[index],
      [field]: value,
    };
    setNewQuestion({
      ...newQuestion,
      options: updatedOptions,
    });
  };

  const addOption = () => {
    setNewQuestion({
      ...newQuestion,
      options: [...newQuestion.options, { title: '', correct: false }],
    });
  };

  const removeOption = (index: number) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions.splice(index, 1);
    setNewQuestion({
      ...newQuestion,
      options: updatedOptions,
    });
  };

  const renderQuestionList = (questions: QuestionResponseDTO[], editable: boolean) => (
    isLoading ? (
      <div className="flex justify-center items-center h-64">
        <p className="text-slate-400">Carregando questões...</p>
      </div>
    ) : questions.length === 0 ? (
      <div className="flex justify-center items-center h-64">
        <p className="text-slate-400">
          {searchTerm ? 'Nenhuma questão encontrada' : 'Nenhuma questão disponível'}
        </p>
      </div>
    ) : (
      <div className="space-y-4">
        {questions.map((question) => (
          <div
            key={question.id}
            className="p-4 bg-white/5 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <button
                  className="w-full text-left"
                  onClick={() => toggleQuestionExpansion(question.id)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-white">{question.title}</h3>
                    {expandedQuestions.has(question.id) ? (
                      <ChevronUp className="h-5 w-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-400" />
                    )}
                  </div>
                  <p className="text-sm text-slate-400 mt-1">
                    {Array.from(question.options).length} opções | Criada por: {question.mentor.name}
                  </p>
                </button>
              </div>
              {editable && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-400 hover:text-red-300"
                  onClick={() => {
                    setQuestionToDelete(question.id);
                    setIsDeleteDialogOpen(true);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            {expandedQuestions.has(question.id) && (
              <div className="mt-4 pt-4 border-t border-slate-800 space-y-3">
                <h4 className="text-sm font-medium text-slate-300">Opções:</h4>
                <div className="space-y-2">
                  {Array.from(question.options).map((option) => (
                    <div
                      key={option.id}
                      className={`p-3 rounded-md ${option.correct ? 'bg-green-900/30 border border-green-800' : 'bg-white/5'}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={option.correct ? 'text-green-400' : 'text-white'}>
                          {option.title}
                        </span>
                        {option.correct && (
                          <Badge variant="secondary" className="bg-green-900/50 text-green-400">
                            Correta
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Banco de Questões</h1>
          <p className="text-slate-400">
            Gerencie suas questões disponíveis para uso em simulados
          </p>
        </div>
        <Button
          className="bg-purple-600 hover:bg-purple-700 text-white"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Questão
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Buscar questões..."
          className="pl-10 bg-white/5 border-slate-800 text-white placeholder:text-slate-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="my-questions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 bg-white/5">
          <TabsTrigger value="my-questions">Minhas Questões</TabsTrigger>
          <TabsTrigger value="ready-questions">Questões Prontas</TabsTrigger>
        </TabsList>
        <TabsContent value="my-questions">
          {renderQuestionList(filteredMentorQuestions, true)}
        </TabsContent>
        <TabsContent value="ready-questions">
          {renderQuestionList(filteredSuperAdminQuestions, false)}
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-black/80 border-slate-800 text-white">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <p>Tem certeza que deseja excluir esta questão permanentemente?</p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-slate-800 text-white"
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteQuestion}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Question Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="bg-black/80 border-slate-800 text-white max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Criar Nova Questão</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="question-title">Título da Questão</Label>
              <Input
                id="question-title"
                className="bg-white/5 border-slate-800 mt-1"
                value={newQuestion.title}
                onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                placeholder="Digite o enunciado da questão"
              />
            </div>

            <div className="space-y-2">
              <Label>Opções de Resposta</Label>
              {newQuestion.options.map((option, index) => (
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
                  {newQuestion.options.length > 1 && (
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
              onClick={() => setIsCreateDialogOpen(false)}
              className="border-slate-800 text-white"
            >
              Cancelar
            </Button>
            <Button onClick={handleCreateQuestion}>
              Criar Questão
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}