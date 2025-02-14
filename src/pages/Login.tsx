
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"

const formSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  role: z.enum(["student", "mentor", "admin"], {
    required_error: "Selecione seu perfil de acesso",
  }),
})

export default function Login() {
  const { toast } = useToast()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "student",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: Implement real authentication
    console.log(values)
    toast({
      title: "Login realizado com sucesso!",
      description: "Redirecionando para o dashboard...",
    })
    
    // Redireciona baseado no perfil
    switch (values.role) {
      case "admin":
        navigate("/admin/dashboard")
        break
      case "mentor":
        navigate("/mentor/dashboard")
        break
      default:
        navigate("/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container max-w-[400px] bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-8">
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-3xl font-bold text-white">Bem-vindo de volta!</h1>
          <p className="text-slate-300">
            Digite suas credenciais para acessar sua conta
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Perfil de Acesso</FormLabel>
                  <select
                    {...field}
                    className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="student" className="bg-slate-900">Aluno</option>
                    <option value="mentor" className="bg-slate-900">Mentor</option>
                    <option value="admin" className="bg-slate-900">Administrador</option>
                  </select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="seuemail@exemplo.com" 
                      {...field} 
                      className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Senha</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="******" 
                      {...field}
                      className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Entrar
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center text-sm">
          <a href="/registro" className="text-purple-400 hover:text-purple-300 hover:underline">
            Não tem uma conta? Cadastre-se
          </a>
        </div>
      </div>
    </div>
  )
}
