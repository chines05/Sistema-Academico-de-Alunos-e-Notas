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
