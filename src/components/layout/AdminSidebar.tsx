
import {
  Users,
  BookOpen,
  LayoutDashboard,
  UserCog,
  Package,
  GraduationCap,
} from "lucide-react"
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

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/admin/dashboard" },
  { title: "Mentores", icon: UserCog, url: "/admin/mentores" },
  { title: "Cursos", icon: BookOpen, url: "/admin/cursos" },
  { title: "Alunos", icon: Users, url: "/admin/alunos" },
  { title: "Turmas", icon: GraduationCap, url: "/admin/turmas" },
  { title: "Planos", icon: Package, url: "/admin/planos" },
]

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
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
