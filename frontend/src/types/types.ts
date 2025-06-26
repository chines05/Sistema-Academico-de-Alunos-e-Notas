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

export type NotaDisciplinaAlunoType = {
  alunoId: number
  disciplinaId: number
  notas: NotaType
}

export type NotaType = {
  nota1: number
  nota2: number
  nota3: number
}
