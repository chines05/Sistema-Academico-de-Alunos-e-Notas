import { Router } from 'express'
import authRoutes from './authRoutes.js'

const router = Router()

router.use('/auth', authRoutes)

router.get('/test', (req, res) => {
  res.json({ message: 'API funcionando!' })
})

export default router
