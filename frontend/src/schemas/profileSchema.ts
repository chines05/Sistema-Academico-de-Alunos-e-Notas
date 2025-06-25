import { z } from 'zod'

export const profileSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
})

export const passwordSchema = z
  .object({
    senhaAtual: z.string().min(6, 'Senha atual é obrigatória'),
    novaSenha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
    confirmarSenha: z.string(),
  })
  .refine((data) => data.novaSenha === data.confirmarSenha, {
    message: 'Senhas não coincidem',
    path: ['confirmarSenha'],
  })

export type ProfileFormData = z.infer<typeof profileSchema>
export type PasswordFormData = z.infer<typeof passwordSchema>
