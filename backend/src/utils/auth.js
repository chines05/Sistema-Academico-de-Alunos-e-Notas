import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_temporario'

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' })
}

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10)
}

export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash)
}
