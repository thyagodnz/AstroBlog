import User from '../../models/User.js'
import { formatUser } from '../../utils/formatUser.js'
import bcrypt from 'bcrypt'

export async function updateUser(req, res) {
    const { id } = req.params
    const { name, bio, password } = req.body

    try {
        const updateData = { name, bio }

        if (password) {
            const saltRounds = 10
            const hashedPassword = await bcrypt.hash(password, saltRounds)
            updateData.password = hashedPassword
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        )

        if (!updatedUser) {
            return res.status(404).json({ res: 'Usuário não encontrado' })
        }

        return res.status(200).json(formatUser(updatedUser))

    } catch (error) {
        return res.status(500).json({ res: 'Erro ao atualizar usuário', error: error.message })
    }
}