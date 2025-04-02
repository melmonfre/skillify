import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { useParams, useNavigate } from "react-router-dom"
import { EssayExecutionStudentAPI } from "@/api/student/controllers/EssayExecutionStudentAPI"
import { EssayStudentAPI } from "@/api/student/controllers/EssayStudentAPI"
import { EssayExecutionCreateDTO } from "@/api/dtos/essayExecutionDtos"
import { EssayResponseDTO } from "@/api/dtos/essayDtos"

const EssayEditor = () => {
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(true)
  const [essay, setEssay] = useState<EssayResponseDTO | null>(null)
  const { id: essayId } = useParams<{ id: string }>()
  const navigate = useNavigate() // Add navigation hook

  // Load essay data
  useEffect(() => {
    const loadEssay = async () => {
      if (!essayId) return;

      try {
        const essayData = await EssayStudentAPI.getEssayById(essayId);
        setEssay(essayData);
      } catch (error) {
        toast.error("Erro ao carregar dados da redação");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadEssay();
  }, [essayId]);

  const handleSubmit = async () => {
    if (!essayId) {
      toast.error("ID do essay não encontrado");
      return;
    }

    if (!content.trim()) {
      toast.error("O conteúdo da redação não pode estar vazio");
      return;
    }

    try {
      const executionDTO: EssayExecutionCreateDTO = {
        essayId,
        text: content,
        studentId: localStorage.getItem("userId") || ""
      };

      await EssayExecutionStudentAPI.createEssayExecution(executionDTO);
      toast.success("Redação enviada para correção!");
      navigate("/dashboard/redacoes"); // Navigate after successful submission
    } catch (error) {
      toast.error("Erro ao enviar redação");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="container py-8">
        <p>Carregando editor...</p>
      </div>
    );
  }

  if (!essay) {
    return (
      <div className="container py-8">
        <p>Redação não encontrada</p>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Editor de Redação</h1>
          <p className="text-muted-foreground">
            {essay.theme}
            {essay.maxDate && (
              <span className="ml-2">(Prazo: {new Date(essay.maxDate).toLocaleDateString()})</span>
            )}
          </p>
        </div>
        <div className="space-x-4">
          <Button variant="outline" disabled>
            Salvar Rascunho
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!content.trim()}
          >
            Enviar para Correção
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="p-6 space-y-4">
          <div className="prose dark:prose-invert max-w-none">
            <h2>Texto de Apoio</h2>
            <p>{essay.description}</p>
            <h3>Proposta de Redação</h3>
            <p>
              Com base nos textos motivadores e em seus conhecimentos, redija um texto
              dissertativo-argumentativo sobre o tema "{essay.theme}". Apresente proposta 
              de intervenção que respeite os direitos humanos.
              {essay.minWords > 0 && (
                <span> (Mínimo de {essay.minWords} palavras)</span>
              )}
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <Textarea
            className="min-h-[500px] resize-none"
            placeholder="Digite sua redação aqui..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="mt-4 text-sm text-muted-foreground text-right">
            {content.length} caracteres
            {essay.minWords > 0 && (
              <span> (Recomendado: {essay.minWords} palavras)</span>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EssayEditor;