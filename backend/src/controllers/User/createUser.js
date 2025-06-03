import User from '../../models/User.js'
import bcrypt from 'bcrypt'
import formatUser from '../../utils/formatUser.js'

export async function createUser(req, res) {
    try {
        const { name, email, password, bio } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ res: 'Nome, email e senha são obrigatórios' })
        }


        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({ res: 'Email já cadastrado' })
        }

        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newUser = await User.create({
            name,
            email,
            bio,
            password: hashedPassword
        })

        return res.status(201).json(formatUser(newUser))

    } catch (error) {
        return res.status(500).json({ res: 'Erro ao criar usuário', error: error.message })
    }
}
