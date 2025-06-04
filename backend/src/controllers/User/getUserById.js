import User from '../../models/User.js'
import formatUser from '../../utils/formatUser.js'

export async function getUserById(req, res) {
    const { id } = req.params

    try {
        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({ res: 'Usuário não encontrado' })
        }

        return res.status(200).json(formatUser(user))
    } catch (error) {
        return res.status(500).json({ res: 'Erro ao buscar usuário', error: error.message })
    }
}