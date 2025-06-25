import { Router } from 'express'
import { verifyToken } from '../middlewares/authMiddleware.js'
import { getDisciplinasAluno } from '../controllers/alunoController.js'

const router = Router()

router.get('/:id/disciplinas', verifyToken, getDisciplinasAluno)

export default router
