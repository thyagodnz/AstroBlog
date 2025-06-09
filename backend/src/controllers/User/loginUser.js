import User from '../../models/User.js'
import { generateToken } from '../../utils/generateToken.js'
import bcrypt from 'bcrypt'

export async function loginUser(req, res) {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas' })
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Senha incorreta' })
        }

        const token = generateToken(user)

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({ message: 'Login realizado com sucesso' })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Erro interno no servidor' })
    }
}