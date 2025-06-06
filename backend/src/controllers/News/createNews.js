import News from '../../models/News.js'
import cloudinary from '../../config/cloudinary.js'

export async function createNews(req, res) {
    try {
        const { title, content, imageDescription } = req.body
        const user = req.user

        if (!user) {
            return res.status(401).json({ res: 'Usuário não autenticado' })
        }

        if (!user.collaborator) {
            return res.status(403).json({ res: 'Apenas colaboradores podem publicar notícias' })
        }

        if (!req.file) {
            return res.status(400).json({ res: 'Imagem é obrigatória' })
        }

        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'news' },
                (error, result) => {
                    if (error) reject(error)
                    else resolve(result)
                }
            )
            stream.end(req.file.buffer)
        })

        const contentArray = content
            .split(/\n\s*\n/)
            .map(p => p.trim())
            .filter(p => p.length > 0)

        const newNews = await News.create({
            title,
            author: user._id,
            content: contentArray,
            image: result.secure_url,
            imageDescription
        })

        const populatedNews = await News.findById(newNews._id)
            .populate('author', 'name _id collaborator')

        return res.status(201).json(populatedNews)
    } catch (error) {
        return res.status(500).json({ res: 'Erro ao criar notícia', error: error.message })
    }
}