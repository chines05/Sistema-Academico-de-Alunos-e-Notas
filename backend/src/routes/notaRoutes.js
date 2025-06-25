import { Router } from 'express'
import { getNotasDisciplina } from '../controllers/notaController.js'
import { verifyToken } from '../middlewares/authMiddleware.js'

const router = Router()
router.get(
  '/aluno/:alunoId/disciplina/:disciplinaId',
  verifyToken,
  getNotasDisciplina
)

export default router
