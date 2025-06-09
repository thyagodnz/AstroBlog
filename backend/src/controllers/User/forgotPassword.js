export async function forgotPassword(req, res) {
    const { email } = req.body

    if (!email) {
        return res.status(400).json({ res: 'E-mail é obrigatório' })
    }

    // Aqui você pode buscar usuário, gerar token e enviar e-mail.
    
    return res.status(200).json({ res: 'Instruções enviadas para o e-mail' })
}