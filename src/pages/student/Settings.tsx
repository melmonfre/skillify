
import { useState, useEffect } from "react"
import { currentUser } from "@/data/mock"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { User } from "@/types"
import { Book, PenLine, User as UserIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { ProfileTab } from "@/components/settings/ProfileTab"
import { PreferencesTab } from "@/components/settings/PreferencesTab"
import { AppearanceTab } from "@/components/settings/AppearanceTab"

const Settings = () => {
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<User>({
    ...currentUser,
    preferences: {
      emailNotifications: true,
      pushNotifications: false,
      weeklyProgress: true,
    },
  })

  // Estado para as configurações de aparência
  const [themeColor, setThemeColor] = useState("purple")
  const [themeStyle, setThemeStyle] = useState("default")

  // Montar componente e aplicar tema inicial
  useEffect(() => {
    setMounted(true)
  }, [])

  // Garantir que o tema escuro seja aplicado ao carregar a página
  useEffect(() => {
    if (!mounted) return
    
    const currentTheme = theme || 'light'
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(currentTheme)

    // Forçar atualização das cores do tema
    if (currentTheme === 'dark') {
      document.documentElement.style.setProperty('color-scheme', 'dark')
    } else {
      document.documentElement.style.setProperty('color-scheme', 'light')
    }
  }, [theme, mounted])

  // Aplicar classes de tema quando as configurações mudarem
  useEffect(() => {
    if (!mounted) return

    document.body.classList.remove(
      "theme-blue",
      "theme-green",
      "theme-pink",
      "theme-orange",
      "theme-minimal",
      "theme-glass"
    )
    document.body.classList.add(`theme-${themeColor}`)
    if (themeStyle !== "default") {
      document.body.classList.add(`theme-${themeStyle}`)
    }
  }, [themeColor, themeStyle, mounted])

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso.",
    })
  }

  const handleTogglePreference = (
    key: keyof NonNullable<User["preferences"]>
  ) => {
    setUser((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences!,
        [key]: !prev.preferences![key],
      },
    }))
  }

  const handleThemeColorChange = (color: string) => {
    setThemeColor(color)
    toast({
      title: "Cor do tema atualizada",
      description: "A cor de destaque foi alterada com sucesso.",
    })
  }

  const handleThemeStyleChange = (style: string) => {
    setThemeStyle(style)
    toast({
      title: "Estilo visual atualizado",
      description: "O estilo visual foi alterado com sucesso.",
    })
  }

  // Prevenir flash de conteúdo não tematizado
  if (!mounted) return null

  return (
    <div className="container max-w-4xl py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie suas informações pessoais e preferências
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          Estudante
        </Badge>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <UserIcon className="w-4 h-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Book className="w-4 h-4" />
            Preferências
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <PenLine className="w-4 h-4" />
            Aparência
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileTab 
            user={user}
            onUserUpdate={setUser}
            onSubmit={handleSaveProfile}
          />
        </TabsContent>

        <TabsContent value="preferences">
          <PreferencesTab 
            user={user}
            onTogglePreference={handleTogglePreference}
          />
        </TabsContent>

        <TabsContent value="appearance">
          <AppearanceTab 
            theme={theme}
            onThemeChange={setTheme}
            themeColor={themeColor}
            onThemeColorChange={handleThemeColorChange}
            themeStyle={themeStyle}
            onThemeStyleChange={handleThemeStyleChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Settings
