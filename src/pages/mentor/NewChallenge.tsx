
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Calendar, Clock, Plus, Trash, Trophy, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: string;
}

export default function NewChallenge() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [xpReward, setXpReward] = useState("500");
  const [challengeType, setChallengeType] = useState("weekly");
  const [deadline, setDeadline] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [selectedClass, setSelectedClass] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([
    { 
      id: "1", 
      title: "Exercício 1", 
      description: "Descrição do exercício 1", 
      difficulty: "medium" 
    }
  ]);
  
  const handleAddExercise = () => {
    const newId = (exercises.length + 1).toString();
    setExercises([
      ...exercises,
      {
        id: newId,
        title: `Exercício ${newId}`,
        description: "",
        difficulty: "medium"
      }
    ]);
  };
  
  const handleRemoveExercise = (id: string) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };
  
  const handleExerciseChange = (id: string, field: keyof Exercise, value: string) => {
    setExercises(
      exercises.map(ex => 
        ex.id === id ? { ...ex, [field]: value } : ex
      )
    );
  };
  
  const handleCreateChallenge = () => {
    // Validate form
    if (!title.trim()) {
      toast({
        title: "Erro ao criar desafio",
        description: "O título do desafio é obrigatório",
        variant: "destructive"
      });
      return;
    }
    
    if (exercises.length === 0) {
      toast({
        title: "Erro ao criar desafio",
        description: "Adicione pelo menos um exercício ao desafio",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, you would send this data to your API
    const challengeData = {
      title,
      description,
      xpReward: Number(xpReward),
      challengeType,
      deadline,
      isPublic,
      selectedClass: selectedClass || null,
      exercises
    };
    
    console.log("Challenge data:", challengeData);
    
    toast({
      title: "Desafio criado com sucesso!",
      description: "O desafio foi criado e está pronto para ser publicado.",
    });
    
    // Navigate back to challenges page
    navigate("/mentor/desafios");
  };
  
  return (
    <div className="container py-8 space-y-6">
      <Link to="/mentor/desafios" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para desafios
      </Link>
      
      <div>
        <h1 className="text-3xl font-bold">Novo Desafio</h1>
        <p className="text-muted-foreground">
          Crie um novo desafio para seus alunos
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título do Desafio</Label>
                <Input
                  id="title"
                  placeholder="Ex: Desafio semanal de programação"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva o objetivo do desafio..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="xpReward">Recompensa (XP)</Label>
                  <div className="relative">
                    <Trophy className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="xpReward"
                      type="number"
                      className="pl-10"
                      placeholder="500"
                      value={xpReward}
                      onChange={(e) => setXpReward(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="deadline">Data Limite</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="deadline"
                      type="date"
                      className="pl-10"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Tipo de Desafio</Label>
                <RadioGroup 
                  defaultValue="weekly" 
                  value={challengeType}
                  onValueChange={setChallengeType}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="daily" id="daily" />
                    <Label htmlFor="daily" className="font-normal">Diário</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weekly" id="weekly" />
                    <Label htmlFor="weekly" className="font-normal">Semanal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly" className="font-normal">Mensal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="custom" id="custom" />
                    <Label htmlFor="custom" className="font-normal">Personalizado</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Exercícios</h2>
              <Button onClick={handleAddExercise} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Exercício
              </Button>
            </div>
            
            {exercises.map((exercise, index) => (
              <Card key={exercise.id}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Exercício {index + 1}</h3>
                    {exercises.length > 1 && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRemoveExercise(exercise.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`ex-title-${exercise.id}`}>Título</Label>
                    <Input
                      id={`ex-title-${exercise.id}`}
                      value={exercise.title}
                      onChange={(e) => handleExerciseChange(exercise.id, "title", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`ex-desc-${exercise.id}`}>Descrição</Label>
                    <Textarea
                      id={`ex-desc-${exercise.id}`}
                      value={exercise.description}
                      onChange={(e) => handleExerciseChange(exercise.id, "description", e.target.value)}
                      rows={2}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`ex-diff-${exercise.id}`}>Dificuldade</Label>
                    <Select
                      value={exercise.difficulty}
                      onValueChange={(value) => handleExerciseChange(exercise.id, "difficulty", value)}
                    >
                      <SelectTrigger id={`ex-diff-${exercise.id}`}>
                        <SelectValue placeholder="Selecione a dificuldade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Fácil</SelectItem>
                        <SelectItem value="medium">Médio</SelectItem>
                        <SelectItem value="hard">Difícil</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-bold">Configurações do Desafio</h3>
              
              <div className="flex items-center justify-between py-2">
                <div className="space-y-0.5">
                  <Label>Desafio Público</Label>
                  <p className="text-sm text-muted-foreground">
                    Disponível para todos os alunos
                  </p>
                </div>
                <Switch 
                  checked={isPublic} 
                  onCheckedChange={setIsPublic} 
                />
              </div>
              
              {!isPublic && (
                <div className="space-y-2 pt-2">
                  <Label htmlFor="class">Selecionar Turma</Label>
                  <Select
                    value={selectedClass}
                    onValueChange={setSelectedClass}
                  >
                    <SelectTrigger id="class">
                      <SelectValue placeholder="Selecione uma turma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="t1">Turma 1 - Desenvolvimento Web</SelectItem>
                      <SelectItem value="t2">Turma 2 - Data Science</SelectItem>
                      <SelectItem value="t3">Turma 3 - Mobile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div className="flex items-center justify-between py-2 border-t">
                <div className="space-y-0.5">
                  <Label>Total de Exercícios</Label>
                  <p className="text-sm text-muted-foreground">
                    Exercícios no desafio
                  </p>
                </div>
                <span className="font-bold">{exercises.length}</span>
              </div>
              
              <div className="flex items-center justify-between py-2 border-t">
                <div className="space-y-0.5">
                  <Label>Recompensa</Label>
                  <p className="text-sm text-muted-foreground">
                    Pontos de experiência
                  </p>
                </div>
                <span className="font-bold flex items-center">
                  <Trophy className="h-4 w-4 mr-1 text-yellow-500" />
                  {xpReward} XP
                </span>
              </div>
              
              <div className="flex items-center justify-between py-2 border-t">
                <div className="space-y-0.5">
                  <Label>Duração</Label>
                  <p className="text-sm text-muted-foreground">
                    Tipo de desafio
                  </p>
                </div>
                <span className="font-bold flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {challengeType === "daily" ? "Diário" : 
                   challengeType === "weekly" ? "Semanal" : 
                   challengeType === "monthly" ? "Mensal" : "Personalizado"}
                </span>
              </div>
              
              <Button 
                onClick={handleCreateChallenge}
                className="w-full mt-4"
              >
                Criar Desafio
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-2">Dicas para Desafios</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Crie desafios progressivos, do mais fácil ao mais difícil
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Defina objetivos claros para cada exercício
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Use recompensas proporcionais à dificuldade
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Forneça descrições detalhadas para melhor compreensão
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
