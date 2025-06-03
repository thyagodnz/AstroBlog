import News from '../../models/News.js'

export async function addComment(req, res) {
    const { user, content } = req.body
    const { id } = req.params

    if (!user || !content) {
        return res.status(400).json({ error: 'Campos obrigatórios' })
    }

    try {
        const news = await News.findById(id)
        if (!news) {
            return res.status(404).json({ error: 'Notícia não encontrada' })
        }

        news.comments.push({ user, content })
        await news.save()

        const updateNews = await News.findById(id)
            .populate('comments.user', 'name _id collaborator')
            .populate('author', 'name _id collaborator')

        updateNews.comments.sort((a, b) => b.createdAt - a.createdAt)

        res.status(201).json(updateNews.comments)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar comentário' })
    }
}