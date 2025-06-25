import { Router } from 'express'
import { getDisciplinas } from '../controllers/disciplinaController.js'
import { verifyToken } from '../middlewares/authMiddleware.js'

const router = Router()

router.get('/', verifyToken, getDisciplinas)

export default router
