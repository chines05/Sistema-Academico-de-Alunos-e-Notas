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

    const emailValido = /^[^\s@]+@(aluno\.ifnmg\.edu\.br|ifnmg\.edu\.br)$/.test(
      email
    )

    if (!emailValido) {
      return res.status(400).send({
        erro: 'Use um email institucional (@aluno.ifnmg.edu.br ou @ifnmg.edu.br)',
      })
    }

    if (senha.length < 6) {
      return res
        .status(400)
        .send({ erro: 'Senha deve ter pelo menos 6 caracteres' })
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

  profileNome: async (req, res) => {
    const { id } = req.params
    const { nome } = req.body

    if (!nome) {
      return res.status(400).send({ erro: 'Nome é obrigatório' })
    }

    try {
      await db.query('UPDATE alunos SET nome = ? WHERE id = ?', [nome, id])
      res.send({ message: 'Nome atualizado com sucesso' })
    } catch (error) {
      console.error('Erro ao atualizar nome:', error)
      res.status(500).send({ erro: 'Erro no servidor' })
    }
  },

  profileSenha: async (req, res) => {
    const { id } = req.params
    const { senhaAtual, novaSenha } = req.body

    if (!senhaAtual || !novaSenha) {
      return res
        .status(400)
        .send({ erro: 'Senha atual e nova senha são obrigatórias' })
    }

    if (novaSenha.length < 6) {
      return res
        .status(400)
        .send({ erro: 'Nova senha deve ter pelo menos 6 caracteres' })
    }

    try {
      // Busca usuário
      const [user] = await db.query('SELECT senha FROM alunos WHERE id = ?', [
        id,
      ])

      if (user.length === 0) {
        return res.status(404).send({ erro: 'Usuário não encontrado' })
      }

      // Compara senhas
      const senhaValida = await comparePassword(senhaAtual, user[0].senha)
      if (!senhaValida) {
        return res.status(401).send({ erro: 'Senha atual inválida' })
      }

      // Hash da nova senha
      const novaSenhaHash = await hashPassword(novaSenha)

      // Atualiza no banco
      await db.query('UPDATE alunos SET senha = ? WHERE id = ?', [
        novaSenhaHash,
        id,
      ])

      res.send({ message: 'Senha atualizada com sucesso' })
    } catch (error) {
      console.error('Erro ao atualizar senha:', error)
      res.status(500).send({ erro: 'Erro no servidor' })
    }
  },
}

export default AuthController
