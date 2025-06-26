export type UserType = {
  id: number
  nome: string
  email: string
}

export type HomeProps = {
  user: {
    id: number
    nome: string
    email: string
  }
  token: string
  disciplina: {
    id: number
    nome: string
    semestre: number
  }
}

export type MatriculasResponseType = {
  alunoId: string
  matriculas: MatriculaType[]
}

export type MatriculaType = {
  id: number
  nome: string
  semestre: number
}

export type MediaDisciplinaType = {
  disciplina: DisciplinaType
  media: MediaType
}

export type DisciplinaType = {
  id: number
  nome: string
}

export type MediaType = {
  media: number
  status: 'aprovado' | 'reprovado'
}

enum Status {
  APROVADO = 'aprovado',
  REPROVADO = 'reprovado',
}

export type NotasDisciplinaType = {
  disciplina: DisciplinaType
  notas: NotaType
}

export type NotaType = {
  nota1: number
  nota2: number
  nota3: number
}
