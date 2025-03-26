
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock, Plus, Users, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

// Mock data for challenges
const challenges = [
  {
    id: "1",
    title: "Desafio de Programação Web",
    description: "Criar uma aplicação web com React e Firebase",
    xp: 1000,
    daysLeft: 5,
    studentsCompleted: 12,
    totalStudents: 30,
    status: "active"
  },
  {
    id: "2",
    title: "Algoritmos e Estruturas de Dados",
    description: "Resolver problemas de algoritmos e implementar estruturas de dados",
    xp: 800,
    daysLeft: 3,
    studentsCompleted: 8,
    totalStudents: 25,
    status: "active"
  },
  {
    id: "3",
    title: "Fundamentos de Banco de Dados",
    description: "Implementar um banco de dados relacional e queries SQL",
    xp: 500,
    daysLeft: 0,
    studentsCompleted: 22,
    totalStudents: 28,
    status: "completed"
  },
  {
    id: "4",
    title: "Desenvolvimento Mobile",
    description: "Criar um aplicativo móvel utilizando React Native",
    xp: 1200,
    daysLeft: 0,
    studentsCompleted: 15,
    totalStudents: 20,
    status: "completed"
  },
  {
    id: "5",
    title: "Deploy de Aplicações",
    description: "Fazer deploy de aplicações em ambientes de produção",
    xp: 700,
    daysLeft: -1,
    studentsCompleted: 5,
    totalStudents: 25,
    status: "draft"
  }
];

export default function MentorDesafios() {
  const [activeTab, setActiveTab] = useState("active");
  
  const filteredChallenges = challenges.filter(challenge => {
    if (activeTab === "active") return challenge.status === "active";
    if (activeTab === "completed") return challenge.status === "completed";
    if (activeTab === "draft") return challenge.status === "draft";
    return true;
  });
  
  return (
    <div className="container py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Desafios</h1>
          <p className="text-muted-foreground">
            Gerencie os desafios para seus alunos
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Link to="/mentor/desafios/novo">
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Novo Desafio
            </Button>
          </Link>
          
          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">Ativos</TabsTrigger>
          <TabsTrigger value="completed">Concluídos</TabsTrigger>
          <TabsTrigger value="draft">Rascunhos</TabsTrigger>
          <TabsTrigger value="all">Todos</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredChallenges.length > 0 ? (
              filteredChallenges.map((challenge) => (
                <Card key={challenge.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{challenge.title}</CardTitle>
                      {challenge.status === "active" && (
                        <Badge>Ativo</Badge>
                      )}
                      {challenge.status === "completed" && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                          Concluído
                        </Badge>
                      )}
                      {challenge.status === "draft" && (
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800">
                          Rascunho
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {challenge.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                        <span>{challenge.xp} XP</span>
                      </div>
                      {challenge.status === "active" && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{challenge.daysLeft} dias restantes</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{challenge.studentsCompleted}/{challenge.totalStudents} alunos completaram</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex gap-2 w-full">
                      <Button variant="outline" className="flex-1">
                        {challenge.status === "draft" ? "Editar" : "Ver Resultados"}
                      </Button>
                      {challenge.status === "draft" && (
                        <Button className="flex-1">Publicar</Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">
                  Nenhum desafio encontrado nesta categoria.
                </p>
                <Link to="/mentor/desafios/novo">
                  <Button className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Criar Novo Desafio
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
