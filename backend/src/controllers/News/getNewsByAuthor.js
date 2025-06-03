import News from '../../models/News.js'

export async function getNewsByAuthor(req, res) {
    const author = req.params.author

    try {
        const newsByAuthor = await News.find({ author })
            .sort({ createdAt: -1 })
            .populate('author', 'name _id collaborator')

        if (newsByAuthor.length === 0) {
            return res.status(404).json({ res: 'Nenhuma notícia encontrada para este autor' })
        }

        return res.status(200).json(newsByAuthor)
    } catch (error) {
        return res.status(500).json({ res: 'Erro ao buscar notícias por autor', error: error.message })
    }
}