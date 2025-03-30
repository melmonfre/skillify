import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { MentorSidebar } from "@/components/layout/MentorSidebar";
import Index from "@/pages/Index";
import { StudentRoutes } from "@/routes/studentRoutes";
import { AdminRoutes } from "@/routes/adminRoutes";
import { MentorRoutes } from "@/routes/mentorRoutes";
import { ThemeProvider } from "next-themes";
import Login from "@/pages/Login";
import Register from "./pages/Register";
import { Toaster } from "./components/ui/toaster";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole")?.toUpperCase();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          
          {/* Student routes with sidebar */}
          <Route
            path="/dashboard/*"
            element={
              isAuthenticated && userRole === "ESTUDANTE" ? (
                <SidebarProvider>
                  <div className="flex min-h-screen w-full">
                    <AppSidebar />
                    <main className="flex-1">
                      <StudentRoutes />
                    </main>
                  </div>
                </SidebarProvider>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Admin routes with sidebar */}
          <Route
            path="/admin/*"
            element={
              isAuthenticated && userRole === "ADMIN" ? (
                <SidebarProvider>
                  <div className="flex min-h-screen w-full">
                    <AdminSidebar />
                    <main className="flex-1">
                      <AdminRoutes />
                    </main>
                  </div>
                </SidebarProvider>
              ) : (
                <Navigate to="/registro" replace />
              )
            }
          />

          {/* Mentor routes with sidebar */}
          <Route
            path="/mentor/*"
            element={
              isAuthenticated && userRole === "MENTOR" ? (
                <SidebarProvider>
                  <div className="flex min-h-screen w-full">
                    <MentorSidebar />
                    <main className="flex-1">
                      <MentorRoutes />
                    </main>
                  </div>
                </SidebarProvider>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;