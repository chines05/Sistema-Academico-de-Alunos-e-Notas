import { Router } from 'express'
import authRoutes from './authRoutes.js'
import disciplinaRoutes from './disciplinaRoutes.js'
import notaRoutes from './notaRoutes.js'

const router = Router()

router.use('/auth', authRoutes)
router.use('/disciplinas', disciplinaRoutes)
router.use('/notas', notaRoutes)

export default router
