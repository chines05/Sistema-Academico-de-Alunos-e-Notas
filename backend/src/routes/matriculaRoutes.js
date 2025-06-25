import { Router } from 'express'
import { getMatriculasAluno } from '../controllers/matriculaController.js'
import { verifyToken } from '../middlewares/authMiddleware.js'

const router = Router()

router.get('/aluno/:alunoId', verifyToken, getMatriculasAluno)

export default router
