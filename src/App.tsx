
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/AppSidebar"
import { AdminSidebar } from "@/components/layout/AdminSidebar"
import { MentorSidebar } from "@/components/layout/MentorSidebar"
import Index from "@/pages/Index"
import { StudentRoutes } from "@/routes/studentRoutes"
import { AdminRoutes } from "@/routes/adminRoutes"
import { MentorRoutes } from "@/routes/mentorRoutes"
import { ThemeProvider } from "next-themes"

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Student routes with sidebar */}
          <Route
            path="/*"
            element={
              <SidebarProvider>
                <div className="flex min-h-screen w-full">
                  <AppSidebar />
                  <main className="flex-1">
                    <StudentRoutes />
                  </main>
                </div>
              </SidebarProvider>
            }
          />

          {/* Admin routes with sidebar */}
          <Route
            path="admin/*"
            element={
              <SidebarProvider>
                <div className="flex min-h-screen w-full">
                  <AdminSidebar />
                  <main className="flex-1">
                    <AdminRoutes />
                  </main>
                </div>
              </SidebarProvider>
            }
          />

          {/* Mentor routes with sidebar */}
          <Route
            path="mentor/*"
            element={
              <SidebarProvider>
                <div className="flex min-h-screen w-full">
                  <MentorSidebar />
                  <main className="flex-1">
                    <MentorRoutes />
                  </main>
                </div>
              </SidebarProvider>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
