import db from '../config/database.js'

export const getNotasDisciplina = async (req, res) => {
  try {
    const { alunoId, disciplinaId } = req.params

    const [notas] = await db.query(
      `
      SELECT nota1, nota2, nota3 
      FROM notas 
      WHERE aluno_id = ? AND disciplina_id = ?
    `,
      [alunoId, disciplinaId]
    )

    if (!notas.length) {
      return res.status(404).send({ erro: 'Notas não encontradas' })
    }

    res.send({
      alunoId,
      disciplinaId,
      notas: notas[0],
    })
  } catch (error) {
    console.error('Erro:', error)
    res.status(500).send({ erro: 'Erro no servidor' })
  }
}
