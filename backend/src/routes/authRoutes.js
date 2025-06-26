import { Router } from 'express'
import AuthController from '../controllers/AuthController.js'
import { verifyToken } from '../middlewares/authMiddleware.js'

const router = Router()

// Rotas de autenticação publicas
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

// Rota protegida
router.put('/profile/:id/nome', verifyToken, AuthController.profileNome)
router.put('/profile/:id/senha', verifyToken, AuthController.profileSenha)

// Rota protegida
router.post('/logout', verifyToken, AuthController.logout)

export default router
