import News from '../../models/News.js'

export async function addComment(req, res) {
    const { content } = req.body
    const { id } = req.params
    const userId = req.user.id 

    if (!content) {
        return res.status(400).json({ error: 'O conteúdo é obrigatório' })
    }

    try {
        const news = await News.findById(id)
        if (!news) {
            return res.status(404).json({ error: 'Notícia não encontrada' })
        }

        news.comments.push({ user: userId, content })
        await news.save()

        const updatedNews = await News.findById(id)
            .populate('comments.user', 'name _id collaborator')
            .populate('author', 'name _id collaborator')

        updatedNews.comments.sort((a, b) => b.createdAt - a.createdAt)

        res.status(201).json(updatedNews.comments)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar comentário', details: error.message })
    }
}