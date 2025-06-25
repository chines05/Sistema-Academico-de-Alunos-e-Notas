import db from '../config/database.js'

export const getMatriculasAluno = async (req, res) => {
  try {
    const { alunoId } = req.params
    const [matriculas] = await db.query(
      `
      SELECT d.id, d.nome, d.semestre 
      FROM matriculas m
      JOIN disciplinas d ON m.disciplina_id = d.id
      WHERE m.aluno_id = ?
    `,
      [alunoId]
    )

    if (matriculas.length === 0) {
      return res
        .status(404)
        .send({ erro: 'Nenhuma matrícula encontrada para este aluno' })
    }

    res.status(200).send({
      alunoId,
      matriculas: matriculas.map((matricula) => ({
        id: matricula.id,
        nome: matricula.nome,
        semestre: matricula.semestre,
      })),
    })
  } catch (error) {
    console.error('Erro ao buscar matrículas:', error)
    res.status(500).send({ erro: 'Erro no servidor' })
  }
}
