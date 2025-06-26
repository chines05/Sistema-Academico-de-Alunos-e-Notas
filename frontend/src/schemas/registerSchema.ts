import { z } from 'zod'

export const registerSchema = z
  .object({
    nome: z.string().min(1, 'Nome é obrigatório'),
    email: z
      .string()
      .min(1, 'Email é obrigatório')
      .email('Email inválido')
      .refine(
        (email) =>
          email.endsWith('@aluno.ifnmg.edu.br') ||
          email.endsWith('@ifnmg.edu.br'),
        {
          message:
            'Use um email institucional (@aluno.ifnmg.edu.br ou @ifnmg.edu.br)',
        }
      ),
    cpf: z
      .string()
      .min(11, 'CPF deve ter 11 dígitos')
      .max(11, 'CPF deve ter 11 dígitos')
      .regex(/^\d+$/, 'CPF deve conter apenas números'),
    senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
    confirmarSenha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: 'As senhas não coincidem',
    path: ['confirmarSenha'],
  })

export type RegisterFormData = z.infer<typeof registerSchema>
