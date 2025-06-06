import User from '../../models/User.js'
import { formatMe } from '../../utils/formatUser.js'

export async function getMe(req, res) {
    const userId = req.user.id

    try {
        const user = await User.findById(userId).select('-password')

        if (!user) {
            return res.status(404).json({ res: 'Usuário não encontrado' })
        }

        return res.status(200).json(formatMe(user))
    } catch (error) {
        return res.status(500).json({ res: 'Erro ao obter usuário', error: error.message })
    }
}