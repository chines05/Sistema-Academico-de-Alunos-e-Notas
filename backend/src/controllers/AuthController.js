import db from '../config/database.js'
import { hashPassword, comparePassword, generateToken } from '../utils/auth.js'

const AuthController = {
  register: async (req, res) => {
    const { nome, email, cpf, senha } = req.body

    // Validações
    if (!nome || !email || !cpf || !senha) {
      return res.status(400).send({ erro: 'Preencha todos os campos' })
    }

    if (cpf.length !== 11 || !/^\d+$/.test(cpf)) {
      return res
        .status(400)
        .send({ erro: 'CPF inválido (deve ter 11 dígitos)' })
    }

    try {
      // Verifica se email ou CPF já existem
      const [user] = await db.query(
        'SELECT id FROM alunos WHERE email = ? OR cpf = ?',
        [email, cpf]
      )

      if (user.length > 0) {
        return res.status(400).send({ erro: 'Email ou CPF já cadastrado' })
      }

      // Hash da senha
      const senhaHash = await hashPassword(senha)

      // Insere no banco
      const [result] = await db.query(
        'INSERT INTO alunos (nome, email, cpf, senha) VALUES (?, ?, ?, ?)',
        [nome, email, cpf, senhaHash]
      )

      // Resposta sem dados sensíveis
      res.status(201).send({
        message: 'Usuário cadastrado com sucesso',
        user: {
          id: result.insertId,
          nome,
          email,
          cpf,
          createdAt: new Date().toISOString(),
        },
      })
    } catch (error) {
      console.error('Erro no cadastro:', error)
      res.status(500).send({ erro: 'Erro no servidor' })
    }
  },

  login: async (req, res) => {
    const { email, senha } = req.body

    // Validação básica
    if (!email || !senha) {
      return res.status(400).send({ erro: 'Email e senha são obrigatórios' })
    }

    try {
      // Busca usuário
      const [user] = await db.query(
        'SELECT id, nome, email, senha FROM alunos WHERE email = ?',
        [email]
      )

      if (user.length === 0) {
        return res.status(401).send({ erro: 'Email ou senha inválidos' })
      }

      // Compara senhas
      const senhaValida = await comparePassword(senha, user[0].senha)
      if (!senhaValida) {
        return res.status(401).send({ erro: 'Email ou senha inválidos' })
      }

      // Gera token
      const token = generateToken(user[0].id)

      // Resposta sem dados sensíveis
      res.send({
        message: 'Login realizado com sucesso',
        user: {
          id: user[0].id,
          nome: user[0].nome,
          email: user[0].email,
        },
        token,
      })
    } catch (error) {
      console.error('Erro no login:', error)
      res.status(500).send({ erro: 'Erro no servidor' })
    }
  },

  logout: async (req, res) => {
    try {
      res.status(200).send({
        message: 'Logout realizado com sucesso',
      })
    } catch (error) {
      console.error('Erro no logout:', error)
      res.status(500).send({ erro: 'Erro no servidor' })
    }
  },
}

export default AuthController
