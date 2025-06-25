import db from '../config/database.js'

export const getDisciplinas = async (req, res) => {
  try {
    const [disciplinas] = await db.query('SELECT * FROM disciplinas')
    res.status(200).send(disciplinas)
  } catch (error) {
    console.error('Erro ao buscar disciplinas:', error)
    res.status(500).send({ erro: 'Erro no servidor' })
  }
}

export const getDisciplinaById = async (req, res) => {
  const { id } = req.params
  try {
    const [disciplinas] = await db.query(
      'SELECT * FROM disciplinas WHERE id = ?',
      [id]
    )
    if (disciplinas.length === 0) {
      return res.status(404).send({ erro: 'Disciplina não encontrada' })
    }
    res.status(200).send(disciplinas[0])
  } catch (error) {
    console.error('Erro ao buscar disciplina:', error)
    res.status(500).send({ erro: 'Erro no servidor' })
  }
}
