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
            return res.status(409).json({ res: 'E-mail já cadastrado' })
        }

        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const token = generateToken(newUser)
        return res.status(201).json({ token })

    } catch (error) {
        return res.status(500).json({ res: 'Erro ao criar usuário', error: error.message })
    }
}