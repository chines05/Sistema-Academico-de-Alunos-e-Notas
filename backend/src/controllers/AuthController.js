import db from '../config/database.js'
import { hashPassword, comparePassword, generateToken } from '../utils/auth.js'
import { validarCPF } from '../utils/cpfValidator.js'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const AuthController = {
  register: async (req, res) => {
    const { nome, email, cpf, senha } = req.body

    if (!nome || !email || !cpf || !senha) {
      return res.status(400).send({ erro: 'Preencha todos os campos' })
    }

    if (cpf.length !== 11 || !/^\d+$/.test(cpf)) {
      return res
        .status(400)
        .send({ erro: 'CPF inválido (deve ter 11 dígitos)' })
    }

    if (!validarCPF(cpf)) {
      return res.status(400).send({ erro: 'CPF inválido' })
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
      const [user] = await db.query(
        'SELECT id FROM alunos WHERE email = ? OR cpf = ?',
        [email, cpf]
      )

      if (user.length > 0) {
        return res.status(400).send({ erro: 'Email ou CPF já cadastrado' })
      }

      const senhaHash = await hashPassword(senha)

      const [result] = await db.query(
        'INSERT INTO alunos (nome, email, cpf, senha) VALUES (?, ?, ?, ?)',
        [nome, email, cpf, senhaHash]
      )

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

    if (!email || !senha) {
      return res.status(400).send({ erro: 'Email e senha são obrigatórios' })
    }

    try {
      const [user] = await db.query(
        'SELECT id, nome, email, senha FROM alunos WHERE email = ?',
        [email]
      )

      if (user.length === 0) {
        return res.status(401).send({ erro: 'Email ou senha inválidos' })
      }

      const senhaValida = await comparePassword(senha, user[0].senha)
      if (!senhaValida) {
        return res.status(401).send({ erro: 'Email ou senha inválidos' })
      }

      const token = generateToken(user[0].id)

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

  forgotPassword: async (req, res) => {
    const { email } = req.body

    if (!email) {
      return res.status(400).send({ erro: 'Email é obrigatório' })
    }

    const emailValido = /^[^\s@]+@(aluno\.ifnmg\.edu\.br|ifnmg\.edu\.br)$/.test(
      email
    )

    if (!emailValido) {
      return res.status(400).send({
        erro: 'Use um email institucional (@aluno.ifnmg.edu.br ou @ifnmg.edu.br)',
      })
    }

    try {
      const [user] = await db.query('SELECT id FROM alunos WHERE email = ?', [
        email,
      ])

      if (user.length === 0) {
        return res.status(404).send({ erro: 'Email não cadastrado' })
      }

      const novaSenha = Math.random().toString(36).slice(-8)
      const senhaHash = await hashPassword(novaSenha)

      await db.query('UPDATE alunos SET senha = ? WHERE email = ?', [
        senhaHash,
        email,
      ])

      const transporter = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASS,
        },
      })

      const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #2e7d32; padding: 20px; text-align: center;">
          <h1 style="color: white; margin-top: 10px;">Redefinição de Senha</h1>
        </div>
        
        <div style="padding: 25px;">
          <p style="font-size: 16px;">Olá!</p>
          <p style="font-size: 16px;">Você solicitou a redefinição da sua senha no Sistema Acadêmico IFNMG.</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center;">
            <p style="margin: 0; font-weight: bold; font-size: 18px;">Sua senha temporária:</p>
            <p style="margin: 10px 0 0; font-size: 24px; letter-spacing: 2px; color: #2e7d32;">${novaSenha}</p>
          </div>
          
          <p style="font-size: 16px;">Por segurança, recomendamos que:</p>
          <ul style="font-size: 15px; padding-left: 20px;">
            <li>Faça login imediatamente com esta senha</li>
            <li>Altere para uma senha permanente em seu perfil</li>
            <li>Não compartilhe esta senha com ninguém</li>
          </ul>
          
          <p style="font-size: 16px; margin-top: 25px;">Caso não tenha solicitado esta alteração, por favor ignore este email ou entre em contato com o suporte.</p>
        </div>
        
        <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 14px; color: #666;">
          <p style="margin: 0;">Sistema Acadêmico - IFNMG</p>
          <p style="margin: 5px 0 0;">Campus Almenara</p>
        </div>
      </div>
    `

      await transporter.sendMail({
        from: '"Sistema Acadêmico" <gmmp@aluno.ifnmg.edu.br>',
        to: email,
        subject: 'Sua nova senha temporária',
        text: `Olá!\n\nSua senha temporária é: ${novaSenha}\n\nPor favor, faça login e altere sua senha imediatamente.`,
        html: emailHTML,
      })

      res.send({ message: 'Email com nova senha enviado' })
    } catch (error) {
      console.error('Erro no forgot password:', error)
      res.status(500).send({ erro: 'Erro ao processar solicitação' })
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
      const [user] = await db.query('SELECT senha FROM alunos WHERE id = ?', [
        id,
      ])

      if (user.length === 0) {
        return res.status(404).send({ erro: 'Usuário não encontrado' })
      }

      const senhaValida = await comparePassword(senhaAtual, user[0].senha)
      if (!senhaValida) {
        return res.status(401).send({ erro: 'Senha atual inválida' })
      }

      const novaSenhaHash = await hashPassword(novaSenha)

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
