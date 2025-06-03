import User from '../models/User.js'
import formatUser from '../utils/formatUser.js'

async function getUsers(req, res) {
    try {
        const users = await User.find()
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ res: 'Erro ao buscar usuários', error: error.message })
    }
}

async function createUser(req, res) {
    try {
        const user = req.body
        const newUser = await User.create(user)
        return res.status(201).json(newUser)
    } catch (error) {
        return res.status(500).json({ res: 'Erro ao criar usuário', error: error.message })
    }
}

async function deleteUser(req, res) {
    const id = req.params.id

    try {
        const deletedUser = await User.findByIdAndDelete({ _id: id })

        if (!deletedUser) {
            return res.status(404).json({ res: 'Usuário não encontrado' })
        }

        return res.status(200).json({ res: 'Usuário deletado com sucesso' })
    } catch (error) {
        return res.status(500).json({ res: 'Erro ao deletar usuário', error: error.message })
    }
}

async function updateUser(req, res) {
    const { id } = req.params
    const { name, bio } = req.body

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, bio },
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

async function loginUser(req, res) {
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

async function getUserById(req, res) {
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

export { getUsers, createUser, deleteUser, updateUser, loginUser, getUserById }
