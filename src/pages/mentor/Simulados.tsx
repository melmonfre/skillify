import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { SimuladoCard } from "@/components/simulados/SimuladoCard";
import { NovoSimuladoDialog } from "@/components/simulados/NovoSimuladoDialog";
import { NewQuestionDialog } from "@/components/simulados/NewQuestionDialog";
import { ResultadosDialog } from "@/components/simulados/ResultadosDialog";
import { PracticeMentorAPI } from "@/api/mentor/controllers/PracticeMentorAPI";
import { OptionMentorAPI } from "@/api/mentor/controllers/OptionMentorAPI";
import { QuestionMentorAPI } from "@/api/mentor/controllers/QuestionMentorAPI";
import { PracticeCreateDTO, PracticeResponseDTO } from "@/api/dtos/practiceDtos";
import { QuestionCreateDTO } from "@/api/dtos/questionDtos";
import { OptionCreateDTO } from "@/api/dtos/optionDtos";
import { EditQuestionsDialog } from "@/components/simulados/EditQuestionDialog";

interface SimuladoForm {
  title: string;
  totalQuestions: string;
  duration: string;
  date: string;
  class: string;
  courses: string[];
}

const MentorSimulados = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isNewSimuladoOpen, setIsNewSimuladoOpen] = useState(false);
  const [isNewQuestionOpen, setIsNewQuestionOpen] = useState(false);
  const [isEditQuestionsOpen, setIsEditQuestionsOpen] = useState(false);
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const [selectedSimulado, setSelectedSimulado] = useState<PracticeResponseDTO | null>(null);
  const [simulados, setSimulados] = useState<PracticeResponseDTO[]>([]);
  const [simuladoForm, setSimuladoForm] = useState<SimuladoForm>({
    title: "",
    totalQuestions: "",
    duration: "",
    date: "",
    class: "",
    courses: [] // Changed from subjects to courses
  });

  const mentorId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchSimulados = async () => {
      try {
        const practices = await PracticeMentorAPI.getAllPractices();
        setSimulados(practices);
      } catch (error) {
        toast({
          title: "Erro",
          description: "Falha ao carregar os simulados",
          variant: "destructive"
        });
      }
    };
    fetchSimulados();
  }, [toast]);


  const handleNewSimulado = async () => {
    if (!simuladoForm.title || !simuladoForm.totalQuestions || !simuladoForm.duration || !simuladoForm.date) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos",
        variant: "destructive"
      });
      return;
    }
  
    const selectedDate = new Date(simuladoForm.date);
    const now = new Date();
  
    if (selectedDate <= now) {
      toast({
        title: "Erro",
        description: "A data final deve ser no futuro",
        variant: "destructive"
      });
      return;
    }
  
    const duration = parseInt(simuladoForm.duration);
    if (duration <= 0) {
      toast({
        title: "Erro",
        description: "A duração deve ser maior que zero",
        variant: "destructive"
      });
      return;
    }
  
    const totalQuestions = parseInt(simuladoForm.totalQuestions);
    if (totalQuestions <= 0) {
      toast({
        title: "Erro",
        description: "O número de questões deve ser maior que zero",
        variant: "destructive"
      });
      return;
    }
  
    try {
      const timezoneOffset = now.getTimezoneOffset() * 60000;
      const openingDateUTC = new Date(now.getTime() - timezoneOffset);
      const maximumDateUTC = new Date(selectedDate.getTime() - timezoneOffset);

      const practiceData: PracticeCreateDTO = {
        mentorId: mentorId || "",
        classroomId: simuladoForm.class,
        title: simuladoForm.title,
        numberOfQuestions: totalQuestions,
        duracao: duration,
        openingDate: openingDateUTC.toISOString(),
        maximumDate: maximumDateUTC.toISOString(),
        courseIds: simuladoForm.courses, // Added courseIds
        questionIds: new Set<string>()
      };
  
      console.log("Creating practice with:", practiceData);
  
      const createdPractice = await PracticeMentorAPI.createPractice(practiceData);
      setSimulados([...simulados, createdPractice]);
      toast({
        title: "Simulado criado!",
        description: "O simulado foi criado com sucesso.",
        variant: "default"
      });
      setIsNewSimuladoOpen(false);
      setSimuladoForm({
        title: "",
        totalQuestions: "",
        duration: "",
        date: "",
        class: "",
        courses: []
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao criar o simulado",
        variant: "destructive"
      });
      console.error("Error creating practice:", error);
    }
  };

  const handleAddQuestion = async (data: { title: string; options: { title: string; correct: boolean }[] }) => {
    if (!selectedSimulado) return;

    try {
      const questionData: QuestionCreateDTO = {
        title: data.title,
        mentorId: mentorId || ""
      };
      const createdQuestion = await QuestionMentorAPI.createQuestion(questionData);

      for (const option of data.options) {
        const optionData: OptionCreateDTO = {
          questionId: createdQuestion.id,
          title: option.title,
          correct: option.correct
        };
        await OptionMentorAPI.createOption(optionData);
      }

      const updatedPractice = await PracticeMentorAPI.addQuestionToPractice(
        selectedSimulado.id,
        createdQuestion.id
      );

      setSimulados(simulados.map(s => s.id === selectedSimulado.id ? updatedPractice : s));
      
      toast({
        title: "Questão adicionada!",
        description: "A questão foi adicionada ao simulado com sucesso.",
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao adicionar a questão",
        variant: "destructive"
      });
    }
  };

  const handleQuestionRemoved = (updatedSimulado: PracticeResponseDTO) => {
    setSimulados(simulados.map(s => s.id === updatedSimulado.id ? updatedSimulado : s));
  };

  const handleEditQuestions = async (simuladoId: string) => {
    try {
      const freshSimulado = await PracticeMentorAPI.getPracticeById(simuladoId);
      setSelectedSimulado(freshSimulado);
      setIsEditQuestionsOpen(true);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao carregar os detalhes do simulado",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-white to-white/70 bg-clip-text">
            Gerenciar Simulados
          </h1>
          <p className="text-slate-400">
            Crie e acompanhe o desempenho dos alunos nos simulados
          </p>
        </div>
        <Button 
          className="bg-purple-600 hover:bg-purple-700 text-white border-none"
          onClick={() => setIsNewSimuladoOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Simulado
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input 
          placeholder="Buscar simulados..." 
          className="pl-10 bg-white/5 border-slate-800 text-white placeholder:text-slate-400"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {simulados.map((simulado) => (
          <SimuladoCard 
            key={simulado.id}
            simulado={simulado}
            onViewResults={() => setIsResultsOpen(true)}
            onAddQuestion={() => {
              setSelectedSimulado(simulado);
              setIsNewQuestionOpen(true);
            }}
            onViewSimulado={() => navigate(`/mentor/simulados/${simulado.id}`)}
            onEditQuestions={() => handleEditQuestions(simulado.id)}
          />
        ))}
        {simulados.length === 0 && (
          <>
            <SimuladoCard 
              onViewResults={() => setIsResultsOpen(true)} 
              onAddQuestion={() => setIsNewQuestionOpen(true)}
              onViewSimulado={() => {}}
              onEditQuestions={() => setIsEditQuestionsOpen(true)}
            />
            <SimuladoCard 
              onViewResults={() => setIsResultsOpen(true)} 
              onAddQuestion={() => setIsNewQuestionOpen(true)}
              onViewSimulado={() => {}}
              onEditQuestions={() => setIsEditQuestionsOpen(true)}
            />
            <SimuladoCard 
              onViewResults={() => setIsResultsOpen(true)} 
              onAddQuestion={() => setIsNewQuestionOpen(true)}
              onViewSimulado={() => {}}
              onEditQuestions={() => setIsEditQuestionsOpen(true)}
            />
          </>
        )}
      </div>

      <NovoSimuladoDialog
        open={isNewSimuladoOpen}
        onOpenChange={setIsNewSimuladoOpen}
        form={simuladoForm}
        onFormChange={setSimuladoForm}
        onSubmit={handleNewSimulado}
      />

      <NewQuestionDialog
        open={isNewQuestionOpen}
        onOpenChange={setIsNewQuestionOpen}
        onSubmit={handleAddQuestion}
      />

      <EditQuestionsDialog
        open={isEditQuestionsOpen}
        onOpenChange={setIsEditQuestionsOpen}
        simulado={selectedSimulado}
        onQuestionRemoved={handleQuestionRemoved}
        onAddQuestion={() => {
          setIsEditQuestionsOpen(false);
          setIsNewQuestionOpen(true);
        }}
      />

      <ResultadosDialog
        open={isResultsOpen}
        onOpenChange={setIsResultsOpen}
      />
    </div>
  );
};

export default MentorSimulados;