import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, Clock, Star, Users, CheckCircle, PlayCircle, FileText, Download, ChevronRight } from "lucide-react";

// Mock data for demonstration
const courseData = {
  id: "1",
  title: "Desenvolvimento Web Completo",
  description: "Aprenda desenvolvimento web do zero ao avançado com HTML, CSS, JavaScript, React, Node.js e muito mais.",
  instructor: {
    name: "João Silva",
    avatar: "https://github.com/shadcn.png",
    role: "Desenvolvedor Senior",
  },
  rating: 4.8,
  students: 1234,
  lessons: 48,
  duration: "32h 45min",
  level: "Intermediário",
  progress: 35,
  lastLesson: "Introdução ao React Hooks",
  tags: ["Frontend", "JavaScript", "React", "Node.js"],
  modules: [
    {
      id: "m1",
      title: "Introdução ao Desenvolvimento Web",
      lessons: [
        { id: "l1", title: "Introdução ao HTML", duration: "15:30", completed: true },
        { id: "l2", title: "Estrutura básica de uma página", duration: "12:45", completed: true },
        { id: "l3", title: "Introdução ao CSS", duration: "18:20", completed: false },
      ]
    },
    {
      id: "m2",
      title: "JavaScript Fundamentos",
      lessons: [
        { id: "l4", title: "Variáveis e tipos de dados", duration: "14:15", completed: false },
        { id: "l5", title: "Funções e escopo", duration: "20:10", completed: false },
      ]
    }
  ]
};

export default function CourseDetails() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("content");
  
  // In a real app, you would fetch the course data based on the ID
  const courseId = id || "1";
  
  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link to="/cursos">
                <Button variant="ghost" size="sm">
                  Cursos
                </Button>
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm text-muted-foreground">Detalhes do curso</span>
            </div>
            <h1 className="text-3xl font-bold">{courseData.title}</h1>
            <p className="text-muted-foreground mt-2">{courseData.description}</p>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={courseData.instructor.avatar} alt={courseData.instructor.name} />
                <AvatarFallback>{courseData.instructor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{courseData.instructor.name}</p>
                <p className="text-xs text-muted-foreground">{courseData.instructor.role}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{courseData.rating}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{courseData.students} alunos</span>
            </div>
            
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{courseData.lessons} aulas</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{courseData.duration}</span>
            </div>
            
            <Badge variant="outline">{courseData.level}</Badge>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {courseData.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Progresso do curso</span>
              <span className="text-sm font-medium">{courseData.progress}%</span>
            </div>
            <Progress value={courseData.progress} className="h-2" />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1">
              <PlayCircle className="mr-2 h-4 w-4" />
              Continuar curso
            </Button>
            <Link to={`/cursos/${courseId}/todas-aulas`}>
              <Button variant="outline" className="flex-1">
                Ver Todas as Aulas
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="md:w-80 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Última aula assistida</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-md">
                  <PlayCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{courseData.lastLesson}</h3>
                  <p className="text-sm text-muted-foreground">Continuar de onde parou</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                Continuar assistindo
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Materiais do curso</CardTitle>
              <CardDescription>Recursos disponíveis para download</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Apostila do curso</span>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Código fonte</span>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="about">Sobre o curso</TabsTrigger>
          <TabsTrigger value="reviews">Avaliações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="space-y-4 mt-6">
          {courseData.modules.map((module) => (
            <Card key={module.id}>
              <CardHeader>
                <CardTitle>{module.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {module.lessons.map((lesson) => (
                  <div key={lesson.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      {lesson.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <PlayCircle className="h-5 w-5 text-muted-foreground" />
                      )}
                      <div>
                        <p className={`${lesson.completed ? 'text-muted-foreground' : 'font-medium'}`}>
                          {lesson.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      {lesson.completed ? "Rever" : "Assistir"}
                    </Button>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <ChevronRight className="mr-2 h-4 w-4" />
                  Ver todas as aulas deste módulo
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="about" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Sobre este curso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Este curso abrangente de desenvolvimento web foi projetado para levar você do nível iniciante ao avançado. 
                Você aprenderá todas as tecnologias necessárias para se tornar um desenvolvedor web completo.
              </p>
              <div>
                <h3 className="font-medium mb-2">O que você aprenderá:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Fundamentos de HTML, CSS e JavaScript</li>
                  <li>Desenvolvimento frontend com React</li>
                  <li>Desenvolvimento backend com Node.js</li>
                  <li>Bancos de dados SQL e NoSQL</li>
                  <li>Autenticação e autorização</li>
                  <li>Deploy de aplicações web</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Pré-requisitos:</h3>
                <p>Conhecimentos básicos de lógica de programação são recomendados, mas não obrigatórios.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Avaliações dos alunos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                As avaliações serão exibidas aqui.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
