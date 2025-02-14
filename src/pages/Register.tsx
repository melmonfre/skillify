
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
import { useNavigate, useSearchParams } from "react-router-dom"

const formSchema = z.object({
  name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não conferem",
  path: ["confirmPassword"],
})

export default function Register() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const classId = searchParams.get('classId')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!classId) {
      toast({
        title: "Erro no cadastro",
        description: "É necessário um ID de turma válido para realizar o cadastro.",
        variant: "destructive",
      })
      return
    }

    // TODO: Implement real registration
    console.log({ ...values, classId })
    toast({
      title: "Cadastro realizado com sucesso!",
      description: "Redirecionando para o login...",
    })
    navigate("/login")
  }

  if (!classId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-8 max-w-md w-full">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Link Inválido</h1>
            <p className="text-slate-300 mb-6">
              É necessário um link de convite válido com ID da turma para realizar o cadastro.
            </p>
            <Button
              onClick={() => navigate("/")}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Voltar para a Home
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container max-w-[400px] bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-8">
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-3xl font-bold text-white">Crie sua conta</h1>
          <p className="text-slate-300">
            Preencha seus dados para começar
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Nome completo</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="João Silva" 
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Confirme sua senha</FormLabel>
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
              Cadastrar
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center text-sm">
          <a href="/login" className="text-purple-400 hover:text-purple-300 hover:underline">
            Já tem uma conta? Faça login
          </a>
        </div>
      </div>
    </div>
  )
}
