
import { Book, Home, MessageCircle, Award, ChartBar, User, PenTool, FileText } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const mainMenuItems = [
  { title: "Home", icon: Home, url: "/dashboard" },
  { title: "Cursos", icon: Book, url: "/cursos" },
  { title: "Redações", icon: PenTool, url: "/redacoes" },
  { title: "Simulados", icon: FileText, url: "/simulados" },
  { title: "Mentoria", icon: MessageCircle, url: "/mentoria" },
  { title: "Desafios", icon: Award, url: "/desafios" },
  { title: "Progresso", icon: ChartBar, url: "/progresso" },
  { title: "Perfil", icon: User, url: "/configuracoes" },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
