import User from '../../models/User.js'

export async function deleteUser(req, res) {
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