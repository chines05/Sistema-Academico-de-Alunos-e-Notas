export type Aluno = {
  id: number
  nome: string
  email: string
}

export interface HomeProps {
  user: {
    id: number
    nome: string
    email: string
  }
  token: string
  disciplinaId: number
}
