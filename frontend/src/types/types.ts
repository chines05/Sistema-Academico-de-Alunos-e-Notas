export type UserType = {
  id: number
  nome: string
  email: string
}

export type DisciplinaType = {
  id: number
  nome: string
  semestre: string
}

export interface DisciplinaRouteParamsType {
  user: UserType
  disciplina: DisciplinaType
  token: string
}

export interface DisciplinaAlunoType {
  aluno: UserType
  disciplinas: DisciplinaType[]
}

export interface NotasPorDisciplinaType {
  aluno_id: number
  disciplina_id: number
  notas: NotasType
}

interface NotasType {
  nota1: number
  nota2: number
  nota3: number
}

export interface MediaDisciplinaType {
  aluno_id: number
  disciplina_id: number
  media: number
  status: string
}
