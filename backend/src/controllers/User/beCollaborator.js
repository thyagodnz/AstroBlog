export async function beCollaborator(req, res) {
    const { cpf, occupation, institution } = req.body

    if (!cpf || !occupation || !institution) {
        return res.status(400).json({ res: 'Todos os campos são obrigatórios' })
    }

    // Lógica para processar o pedido de colaboração

    return res.status(200).json({ res: 'Pedido enviado com sucesso' })
}