export const getDisciplinasAluno = async (req, res) => {
  try {
    const { id } = req.params

    const [disciplinas] = await db.query(
      `
      SELECT d.id, d.nome, d.semestre 
      FROM matriculas m
      JOIN disciplinas d ON m.disciplina_id = d.id
      WHERE m.aluno_id = ?
    `,
      [id]
    )

    res.send(disciplinas)
  } catch (error) {
    console.error('Erro:', error)
    res.status(500).send({ erro: 'Erro no servidor' })
  }
}
