import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import dotenv from 'dotenv'

dotenv.config()

export async function auth(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.id).select('-password')

        if (!user) {
            return res.status(401).json({ error: 'Usuário não encontrado' })
        }

        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' })
    }
}