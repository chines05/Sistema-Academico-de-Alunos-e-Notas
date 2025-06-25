export type UserType = {
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

export interface MatriculasResponseType {
  alunoId: string
  matriculas: MatriculaType[]
}

export interface MatriculaType {
  id: number
  nome: string
  semestre: number
}
