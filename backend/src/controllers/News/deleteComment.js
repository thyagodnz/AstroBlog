import News from '../../models/News.js'

export async function deleteComment(req, res) {
    const { newsId, commentId } = req.params
    const userId = req.user.id 

    try {
        const news = await News.findById(newsId)
        if (!news) {
            return res.status(404).json({ error: 'Notícia não encontrada' })
        }

        const comment = news.comments.id(commentId)
        if (!comment) {
            return res.status(404).json({ error: 'Comentário não encontrado' })
        }

        if (comment.user.toString() !== userId) {
            return res.status(403).json({ error: 'Você não tem permissão para deletar este comentário' })
        }

        news.comments.pull(commentId)
        await news.save()

        const updatedNews = await News.findById(newsId)
            .populate('comments.user', 'name _id collaborator')
            .populate('author', 'name _id collaborator')

        updatedNews.comments.sort((a, b) => b.createdAt - a.createdAt)

        res.status(200).json(updatedNews.comments)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar comentário', details: error.message })
    }
}