import User from '../../models/User.js'
import formatUser from '../../utils/formatUser.js'

export async function loginUser(req, res) {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email, password })

        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas' })
        }

        return res.status(200).json(formatUser(user))

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Erro interno no servidor' })
    }
}