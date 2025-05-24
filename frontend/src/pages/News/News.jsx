import './news.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '../../components/Loading/Loading.jsx'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { formatDistanceToNow } from 'date-fns'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

function News() {

    const { id } = useParams()
    const [news, setNews] = useState(null)
    const [comment, setComment] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { user } = useAuth()

    useEffect(() => {
        async function fetchNews() {
            try {
                const response = await axios.get(`http://localhost:3000/news/${id}`)
                setNews(response.data)
            } catch (error) {
                console.error('Erro ao carregar notícia:', error)
            }
        }

        fetchNews()
    }, [id])

    if (!news) {
        return <Loading />
    }

    const date = parseISO(news.createdAt)
    const formattedDate = format(date, 'dd/MM/yyyy')
    const formattedTime = format(date, 'HH:mm')

    async function handleCommentSubmit(e) {
        e.preventDefault()
        if (!comment.trim()) return

        try {
            setIsSubmitting(true)

            await axios.post(`http://localhost:3000/news/${id}/comments`, {
                user: user.id,
                content: comment.trim()
            })

            const response = await axios.get(`http://localhost:3000/news/${id}`)
            setNews(response.data)

            setComment('')
        } catch (error) {
            console.error('Erro ao enviar comentário:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className='page'>
            <h1 className='news-title'>{news.title}</h1>
            <p className='info'>
                Por <strong className='author'>{news.author}</strong> em {formattedDate} às {formattedTime}
            </p>

            {news.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}

            <img
                src={news.image}
                alt={news.imageDescription || news.title}
                className="news-image"
            />

            {news.imageDescription && (
                <p className="news-image-description">{news.imageDescription}</p>
            )}

            {/* Seção de Comentários */}
            <div className="comments-section">
                <h3>Comentários</h3>

                {user ? (
                    <form onSubmit={handleCommentSubmit} className="comment-form">
                        <textarea
                            className="comment-input"
                            placeholder="Adicione um comentário..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows="3"
                            required
                        />
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Enviando...' : 'Comentar'}
                        </button>
                    </form>
                ) : (
                    <p className="login-to-comment">Faça login para comentar.</p>
                )}

                {news.comments && news.comments.length > 0 ? (
                    news.comments.map((c) => (
                        <div key={c._id} className="comment">
                            <p className="comment-header">
                                <span className="comment-user">{c.user?.name || 'Usuário desconhecido'}</span>
                                <span className="comment-date">
                                    • {formatDistanceToNow(new Date(c.createdAt), {
                                        addSuffix: true,
                                        locale: ptBR
                                    })}
                                </span>
                            </p>
                            <p className="comment-content">{c.content}</p>
                        </div>
                    ))
                ) : (
                    <p className="no-comments">Nenhum comentário ainda.</p>
                )}
            </div>
        </div>
    )
}

export default News
