export async function logoutUser(req, res) {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        })

        return res.status(200).json({ message: 'Logout realizado com sucesso' })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Erro interno no servidor' })
    }
}