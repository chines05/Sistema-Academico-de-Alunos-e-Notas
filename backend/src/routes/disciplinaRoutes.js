import { Router } from 'express'
import {
  getDisciplinaById,
  getDisciplinas,
} from '../controllers/disciplinaController.js'
import { verifyToken } from '../middlewares/authMiddleware.js'

const router = Router()

// Rotas protegidas
router.get('/', verifyToken, getDisciplinas)
router.get('/:id', verifyToken, getDisciplinaById)

export default router
