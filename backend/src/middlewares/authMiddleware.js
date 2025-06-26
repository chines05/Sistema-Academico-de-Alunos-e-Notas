import jwt from 'jsonwebtoken'
import db from '../config/database.js'

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_temporario_em_dev'

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).send({
      erro: 'Token não fornecido. Faça login para acessar.',
    })
  }

  const parts = authHeader.split(' ')

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).send({
      erro: 'Formato de token inválido. Use: Bearer <token>',
    })
  }

  const token = parts[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET)

    const [user] = await db.query('SELECT id FROM alunos WHERE id = ?', [
      decoded.id,
    ])

    if (!user.length) {
      return res.status(401).send({ erro: 'Usuário não encontrado' })
    }

    req.userId = decoded.id

    next()
  } catch (error) {
    console.error('Erro na verificação do token:', error)

    const message =
      error.name === 'TokenExpiredError'
        ? 'Token expirado. Faça login novamente.'
        : 'Token inválido. Autentique-se novamente.'

    return res.status(401).send({ erro: message })
  }
}
