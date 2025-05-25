import News from '../models/News.js'

async function getNews(req, res) {
    try {
        const allNews = await News.find().sort({ createdAt: -1 })
        return res.status(200).json(allNews)
    } catch (error) {
        return res.status(500).json({ res: 'Erro ao buscar notícias', error: error.message })
    }
}

async function createNews(req, res) {
    try {
        const { title, author, content, image, imageDescription } = req.body

        const contentArray = content
            .split(/\n\s*\n/)
            .map(p => p.trim())
            .filter(p => p.length > 0)

        const newNews = await News.create({
            title,
            author,
            content: contentArray,
            image,
            imageDescription
        })

        return res.status(201).json(newNews)
    } catch (error) {
        return res.status(500).json({ res: 'Erro ao criar notícia', error: error.message })
    }
}

async function deleteNews(req, res) {
    const id = req.params.id

    try {
        const deletedNews = await News.findByIdAndDelete(id)

        if (!deletedNews) {
            return res.status(404).json({ res: 'Notícia não encontrada' })
        }

        return res.status(200).json({ res: 'Notícia deletada com sucesso' })
    } catch (error) {
        return res.status(500).json({ res: 'Erro ao deletar notícia', error: error.message })
    }
}

async function updateNews(req, res) {
    const id = req.params.id
    const updatedData = req.body

    try {
        const updatedNews = await News.findByIdAndUpdate(id, updatedData, { new: true })

        if (!updatedNews) {
            return res.status(404).json({ res: 'Notícia não encontrada' })
        }

        return res.status(200).json(updatedNews)
    } catch (error) {
        return res.status(500).json({ res: 'Erro ao atualizar notícia', error: error.message })
    }
}

async function getNewsById(req, res) {
    const id = req.params.id
    try {
        const news = await News.findById(id).populate('comments.user', 'name _id')

        if (!news) {
            return res.status(404).json({ res: 'Notícia não encontrada' })
        }

        news.comments.sort((a, b) => b.createdAt - a.createdAt)

        return res.status(200).json(news)
    } catch (error) {
        return res.status(500).json({ res: 'Erro ao buscar notícia', error: error.message })
    }
}

async function addComment(req, res) {
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

        const updateNews = await News.findById(id).populate('comments.user', 'name _id')

        res.status(201).json(updateNews.comments)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar comentário' })
    }
}

async function deleteComment(req, res) {
    const { newsId, commentId } = req.params
    const { userId } = req.body

    if (!userId) {
        return res.status(400).json({ error: 'O ID do usuário é obrigatório.' })
    }

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

        const updatedNews = await News.findById(newsId).populate('comments.user', 'name _id')
        updatedNews.comments.sort((a, b) => b.createdAt - a.createdAt)

        res.status(200).json(updatedNews.comments)

    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar comentário', details: error.message })
    }
}

export { getNews, createNews, deleteNews, updateNews, getNewsById, addComment, deleteComment }
