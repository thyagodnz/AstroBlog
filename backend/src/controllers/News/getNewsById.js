import News from '../../models/News.js'

export async function getNewsById(req, res) {
    const id = req.params.id
    try {
        const news = await News.findById(id)
            .populate('author', 'name _id collaborator')
            .populate('comments.user', 'name _id collaborator')

        if (!news) {
            return res.status(404).json({ res: 'Notícia não encontrada' })
        }

        news.comments.sort((a, b) => b.createdAt - a.createdAt)

        return res.status(200).json(news)
    } catch (error) {
        return res.status(500).json({ res: 'Erro ao buscar notícia', error: error.message })
    }
}