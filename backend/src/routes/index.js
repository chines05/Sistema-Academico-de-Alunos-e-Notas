import { Router } from 'express'
import authRoutes from './authRoutes.js'
import disciplinaRoutes from './disciplinaRoutes.js'
import notaRoutes from './notaRoutes.js'
import matriculaRoutes from './matriculaRoutes.js'
import mediaRoutes from './mediaRoutes.js'

const router = Router()

router.use('/auth', authRoutes)
router.use('/disciplinas', disciplinaRoutes)
router.use('/notas', notaRoutes)
router.use('/matriculas', matriculaRoutes)
router.use('/medias', mediaRoutes)

export default router
