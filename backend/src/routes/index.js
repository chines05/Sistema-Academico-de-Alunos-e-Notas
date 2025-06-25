import { Router } from 'express'
import authRoutes from './authRoutes.js'
import disciplinaRoutes from './disciplinaRoutes.js'
import notaRoutes from './notaRoutes.js'
import matriculaRoutes from './matriculaRoutes.js'

const router = Router()

router.use('/auth', authRoutes)
router.use('/disciplinas', disciplinaRoutes)
router.use('/notas', notaRoutes)
router.use('/matriculas', matriculaRoutes)

export default router
