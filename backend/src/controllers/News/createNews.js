import News from '../../models/News.js'
import User from '../../models/User.js'

export async function createNews(req, res) {
    try {
        const { title, author, content, image, imageDescription } = req.body

        const user = await User.findById(author)

        if (!user) {
            return res.status(404).json({ res: 'Usuário não encontrado' })
        }

        if (!user.collaborator) {
            return res.status(403).json({ res: 'Apenas colaboradores podem publicar notícias' })
        }

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

        const populatedNews = await News.findById(newNews._id)
            .populate('author', 'name _id collaborator')

        return res.status(201).json(populatedNews)
    } catch (error) {
        return res.status(500).json({ res: 'Erro ao criar notícia', error: error.message })
    }
}