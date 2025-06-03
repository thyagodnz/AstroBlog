import User from '../../models/User.js'
import formatUser from '../../utils/formatUser.js'
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

        
        return res.status(200).json({
            message: 'Login bem-sucedido',
            user: formatUser(user)
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Erro interno no servidor' })
    }
}
