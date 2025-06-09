import News from '../../models/News.js'

export async function getNews(req, res) {
    try {
        const allNews = await News.find()
            .select('title image')
            .sort({ createdAt: -1 })

        return res.status(200).json(allNews)
    } catch (error) {
        return res.status(500).json({ res: 'Erro ao buscar notícias', error: error.message })
    }
}