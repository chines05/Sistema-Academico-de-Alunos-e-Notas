import { Router } from 'express'
import { getMediasAluno } from '../controllers/mediaController.js'
import { verifyToken } from '../middlewares/authMiddleware.js'

const router = Router()

// Rota protegida
router.get(
  '/aluno/:alunoId/disciplina/:disciplinaId',
  verifyToken,
  getMediasAluno
)

export default router
