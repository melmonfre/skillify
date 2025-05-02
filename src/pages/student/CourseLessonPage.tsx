import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, BookOpen } from "lucide-react";
import { CourseStudentAPI } from "@/api/student/controllers/CourseStudentAPI";
import { CourseLessonContentStudentAPI } from "@/api/student/controllers/CourseLessonContentStudentAPI";
import { CourseLessonResponseDTO } from "@/api/dtos/courseLessonDtos";
import { CourseLessonContentResponseDTO, CourseLessonContentType } from "@/api/dtos/courseLessonContentDtos";
import { useToast } from "@/hooks/use-toast";

export default function CourseLessonPage() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId?: string }>();
  const [lessons, setLessons] = useState<CourseLessonResponseDTO[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<CourseLessonResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchLessons() {
      console.log("Starting fetchLessons with courseId:", courseId, "and lessonId:", lessonId);
      try {
        setLoading(true);
        if (!courseId) {
          console.error("Course ID is undefined or empty");
          throw new Error("Course ID is missing");
        }

        // Fetch all lessons for the course
        console.log("Fetching lessons for courseId:", courseId);
        const courseLessons = await CourseStudentAPI.getCourseLessons(courseId);
        console.log("Fetched lessons:", courseLessons);

        // Fetch content for each lesson
        const lessonsWithContent = await Promise.all(
          courseLessons.map(async (lesson) => {
            console.log("Fetching content for lessonId:", lesson.id);
            const content = await CourseLessonContentStudentAPI.getContentByLessonId(lesson.id);
            return { ...lesson, content };
          })
        );
        console.log("Lessons with content:", lessonsWithContent);

        // Sort lessons by name for consistent ordering
        const sortedLessons = lessonsWithContent.sort((a, b) => a.name.localeCompare(b.name));
        console.log("Sorted lessons:", sortedLessons);

        setLessons(sortedLessons);

        // Select lesson based on lessonId; if no lessonId or invalid, default to first lesson
        let initialLesson: CourseLessonResponseDTO | null = null;
        if (lessonId) {
          console.log("Attempting to find lesson with lessonId:", lessonId);
          initialLesson = sortedLessons.find((lesson) => lesson.id === lessonId) || null;
          if (!initialLesson && sortedLessons.length > 0) {
            console.warn("No lesson found for lessonId:", lessonId, "defaulting to first lesson");
            initialLesson = sortedLessons[0];
          }
        } else if (sortedLessons.length > 0) {
          console.log("No lessonId provided, selecting first lesson");
          initialLesson = sortedLessons[0];
        }
        console.log("Selected initial lesson:", initialLesson);
        setSelectedLesson(initialLesson);

        if (!sortedLessons.length) {
          console.warn("No lessons found for courseId:", courseId);
          toast({
            title: "Nenhuma aula encontrada",
            description: "O curso não possui aulas cadastradas.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error in fetchLessons:", error);
        toast({
          title: "Erro ao carregar aulas",
          description: "Não foi possível carregar as aulas do curso. Tente novamente mais tarde.",
          variant: "destructive",
        });
      } finally {
        console.log("Setting loading to false");
        setLoading(false);
      }
    }

    fetchLessons();
  }, [courseId, lessonId, toast]);

  const handleLessonSelect = (lesson: CourseLessonResponseDTO) => {
    console.log("Selected lesson:", lesson);
    setSelectedLesson(lesson);
  };

  console.log("Rendering with loading:", loading, "lessons length:", lessons.length, "selectedLesson:", selectedLesson);

  if (loading) {
    return (
      <div className="container py-8">
        <p className="text-center">Carregando aulas...</p>
      </div>
    );
  }

  if (!lessons.length) {
    return (
      <div className="container py-8">
        <p className="text-center">Nenhuma aula encontrada para este curso.</p>
      </div>
    );
  }

  return (
    <div className="container py-8 flex flex-col md:flex-row gap-8 min-h-screen">
      {/* Navbar for lessons */}
      <div className="md:w-1/4">
        <Card className="sticky top-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Aulas do Curso</span>
              <Link to={`/dashboard/cursos/${courseId}`}>
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Voltar ao Curso
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="space-y-2">
                {lessons.map((lesson) => (
                  <Button
                    key={lesson.id}
                    variant={selectedLesson?.id === lesson.id ? "default" : "ghost"}
                    className="w-full justify-start text-left"
                    onClick={() => handleLessonSelect(lesson)}
                    asChild
                  >
                    <Link to={`/dashboard/cursos/${courseId}/visualizar/aulas/${lesson.id}`}>
                      <BookOpen className="h-4 w-4 mr-2" />
                      {lesson.name}
                    </Link>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Main content area */}
      <div className="flex-1">
        <Card>
          <CardHeader>
            <CardTitle>{selectedLesson?.name || "Selecione uma aula"}</CardTitle>
            {selectedLesson && (
              <p className="text-sm text-muted-foreground">Duração: {selectedLesson.duration} minutos</p>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {selectedLesson ? (
              selectedLesson.content
                .sort((a, b) => a.position - b.position)
                .map((content: CourseLessonContentResponseDTO) => (
                  <div key={content.id} className="border-b pb-4 last:border-b-0">
                    {content.type === CourseLessonContentType.TEXT && (
                      <div className="prose max-w-none">
                        <p className="whitespace-pre-wrap">{content.value}</p>
                      </div>
                    )}
                    {content.type === CourseLessonContentType.IMAGE && (
                      <div className="mt-2">
                        <img
                          src={content.value}
                          alt="Lesson content"
                          className="max-w-full h-auto rounded-md border"
                          onError={(e) => (e.currentTarget.style.display = "none")}
                        />
                      </div>
                    )}
                    {content.type === CourseLessonContentType.VIDEO && (
                      <div className="mt-2">
                        <video
                          src={content.value}
                          controls
                          className="max-w-full h-auto rounded-md border"
                          onError={(e) => (e.currentTarget.style.display = "none")}
                        />
                      </div>
                    )}
                  </div>
                ))
            ) : (
              <p className="text-muted-foreground">Selecione uma aula para visualizar o conteúdo.</p>
            )}
            {selectedLesson && selectedLesson.content.length === 0 && (
              <p className="text-muted-foreground">Nenhum conteúdo disponível para esta aula.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}