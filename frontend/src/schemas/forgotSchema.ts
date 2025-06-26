import { z } from 'zod'

export const forgotPasswordSchema = z.object({
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
})
