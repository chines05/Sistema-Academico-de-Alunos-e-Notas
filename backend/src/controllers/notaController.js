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

    const [disciplinaRows] = await db.query(
      `SELECT nome FROM disciplinas WHERE id = ?`,
      [disciplinaId]
    )

    if (!disciplinaRows.length) {
      return res.status(404).send({ erro: 'Disciplina não encontrada' })
    }

    res.send({
      disciplina: {
        id: disciplinaId,
        nome: disciplinaRows[0].nome,
      },
      notas: notas[0],
    })
  } catch (error) {
    console.error('Erro:', error)
    res.status(500).send({ erro: 'Erro no servidor' })
  }
}
