
import { User } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera } from "lucide-react"

interface ProfileTabProps {
  user: User
  onUserUpdate: (user: User) => void
  onSubmit: (e: React.FormEvent) => void
}

export function ProfileTab({ user, onUserUpdate, onSubmit }: ProfileTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações do Perfil</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <Button
                size="icon"
                variant="outline"
                className="absolute bottom-0 right-0 rounded-full"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-lg font-medium">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <div className="grid gap-6 mt-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                value={user.name}
                onChange={(e) =>
                  onUserUpdate({ ...user, name: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) =>
                  onUserUpdate({ ...user, email: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Telefone</Label>
              <div className="flex gap-2">
                <Select defaultValue="BR">
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="País" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BR">+55</SelectItem>
                    <SelectItem value="US">+1</SelectItem>
                    <SelectItem value="PT">+351</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bio">Biografia</Label>
              <Textarea
                id="bio"
                placeholder="Conte um pouco sobre você..."
                rows={4}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline">Cancelar</Button>
            <Button type="submit">Salvar Alterações</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
