import { Router } from 'express'
import register from '@/controller/v1/auth/register'

const router = Router()

router.post('/register', register)

export default router
