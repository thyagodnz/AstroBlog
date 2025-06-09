import User from '../../models/User.js'
import { generateToken } from '../../utils/generateToken.js'
import bcrypt from 'bcrypt'

export async function createUser(req, res) {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ res: 'Nome, email e senha são obrigatórios' })
        }

        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(409).json({ res: 'Já existe um usuário com esse e-mail!' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const token = generateToken(newUser)

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json({ res: 'Usuário criado com sucesso' })

    } catch (error) {
        return res.status(500).json({ res: 'Erro ao criar usuário', error: error.message })
    }
}