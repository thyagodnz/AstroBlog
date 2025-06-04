import News from '../../models/News.js'

export async function updateNews(req, res) {
    const id = req.params.id
    const updatedData = req.body

    try {
        const updatedNews = await News.findByIdAndUpdate(id, updatedData, { new: true })
            .populate('author', 'name _id collaborator')

        if (!updatedNews) {
            return res.status(404).json({ res: 'Notícia não encontrada' })
        }

        return res.status(200).json(updatedNews)
    } catch (error) {
        return res.status(500).json({ res: 'Erro ao atualizar notícia', error: error.message })
    }
}