import jwt from 'jsonwebtoken'
import db from '../config/database.js'

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_temporario_em_dev'

export const verifyToken = async (req, res, next) => {
  // 1. Verifica se o header Authorization existe
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({
      erro: 'Token não fornecido. Faça login para acessar.',
    })
  }

  // 2. Extrai o token (formato: Bearer <token>)
  const parts = authHeader.split(' ')

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({
      erro: 'Formato de token inválido. Use: Bearer <token>',
    })
  }

  const token = parts[1]

  try {
    // 3. Verifica e decodifica o token
    const decoded = jwt.verify(token, JWT_SECRET)

    // 4. Verifica se o usuário ainda existe no banco (opcional)
    const [user] = await db.query('SELECT id FROM alunos WHERE id = ?', [
      decoded.id,
    ])

    if (!user.length) {
      return res.status(401).json({ erro: 'Usuário não encontrado' })
    }

    // 5. Adiciona o ID do usuário à requisição
    req.userId = decoded.id

    // 6. Permite o acesso à próxima função/controller
    next()
  } catch (error) {
    console.error('Erro na verificação do token:', error)

    // Tratamento de erros específicos
    const message =
      error.name === 'TokenExpiredError'
        ? 'Token expirado. Faça login novamente.'
        : 'Token inválido. Autentique-se novamente.'

    return res.status(401).json({ erro: message })
  }
}
