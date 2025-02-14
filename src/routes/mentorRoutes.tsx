
import { Route, Routes, Navigate } from "react-router-dom"
import MentorDashboard from "@/pages/mentor/Dashboard"
import MentorStudents from "@/pages/mentor/Students"
import MentorCourses from "@/pages/mentor/Courses"
import MentorRedacoes from "@/pages/mentor/Redacoes"
import MentorSimulados from "@/pages/mentor/Simulados"
import MentorMentoria from "@/pages/mentor/Mentoria"
import MentorDesafios from "@/pages/mentor/Desafios"
import MentorTurmas from "@/pages/mentor/Turmas"
import StudentProgress from "@/pages/mentor/StudentProgress"
import MentorMessages from "@/pages/mentor/Messages"

export const MentorRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/mentor/dashboard" replace />} />
      <Route path="dashboard" element={<MentorDashboard />} />
      <Route path="alunos" element={<MentorStudents />} />
      <Route path="turmas" element={<MentorTurmas />} />
      <Route path="cursos" element={<MentorCourses />} />
      <Route path="redacoes" element={<MentorRedacoes />} />
      <Route path="simulados" element={<MentorSimulados />} />
      <Route path="mentoria" element={<MentorMentoria />} />
      <Route path="desafios" element={<MentorDesafios />} />
      <Route path="mensagens" element={<MentorMessages />} />
      <Route path="progresso" element={<StudentProgress />} />
    </Routes>
  )
}
