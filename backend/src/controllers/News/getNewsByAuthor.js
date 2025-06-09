import News from '../../models/News.js'

export async function getNewsByAuthor(req, res) {
    const author = req.params.author

    try {
        const newsByAuthor = await News.find({ author })
            .select('title image')
            .sort({ createdAt: -1 })
        
        return res.status(200).json(newsByAuthor)
    } catch (error) {
        return res.status(500).json({ res: 'Erro ao buscar notícias por autor', error: error.message })
    }
}