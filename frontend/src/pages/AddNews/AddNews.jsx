import './addNews.css'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import api from '../../services/api'

function AddNews() {
    const { token } = useAuth()
    const navigate = useNavigate()

    const [imageFile, setImageFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [imageDescription, setImageDescription] = useState('')
    const [loading, setLoading] = useState(false)

    const titleRef = useRef()
    const contentRef = useRef()
    const fileInputRef = useRef(null)

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImageFile(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleFileButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handlePublish = async () => {
        if (!token) {
            alert('Você precisa estar logado para publicar!')
            navigate('/login')
            return
        }

        const title = titleRef.current.value.trim()
        const content = contentRef.current.value.trim()

        if (!title || !content || !imageFile || !imageDescription.trim()) {
            alert('Preencha todos os campos e selecione uma imagem!')
            return
        }

        try {
            setLoading(true)

            const formData = new FormData()
            formData.append('title', title)
            formData.append('content', content)
            formData.append('imageDescription', imageDescription.trim())
            formData.append('image', imageFile)

            const response = await api.post('/news', formData)

            if (response.status === 201) {
                alert('Publicação feita com sucesso!')
                navigate('/')
            }
        } catch (error) {
            console.error(error)
            if (error.response?.status === 403) {
                alert('Você não tem permissão para publicar')
            } else {
                alert('Erro ao publicar')
            }
        } finally {
            setLoading(false)
        }
    }

    const handleRemoveImage = () => {
        setPreview(null)
        setImageFile(null)
        setImageDescription('')
        if (fileInputRef.current) {
            fileInputRef.current.value = null
        }
    }

    return (
        <div className='page'>
            <div className='add-news-container'>
                <h1 className='add-news'>Adicionar publicação</h1>

                <input
                    className='add-news-title'
                    placeholder='Insira aqui o título...'
                    type='text'
                    ref={titleRef}
                    required
                />

                <textarea
                    className='add-news-content'
                    placeholder='Insira aqui o conteúdo...'
                    ref={contentRef}
                    required
                />

                {!preview && (
                    <button
                        type='button'
                        className='add-image-button'
                        onClick={handleFileButtonClick}
                    >
                        Anexar imagem
                    </button>
                )}

                <input
                    id='fileInput'
                    type='file'
                    accept='image/*'
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                />

                {preview && (
                    <div className='image-section'>
                        <div className='image-preview'>
                            <img src={preview} alt='Preview da imagem' />
                            <button
                                className='remove-image-button'
                                onClick={handleRemoveImage}
                                type='button'
                                title='Remover imagem'
                            >
                                ✕
                            </button>
                        </div>

                        <input
                            className='add-image-description'
                            placeholder='Insira aqui a descrição da imagem...'
                            type='text'
                            value={imageDescription}
                            onChange={(e) => setImageDescription(e.target.value)}
                            required
                        />
                    </div>
                )}

                <button
                    className='publish-news'
                    onClick={handlePublish}
                    disabled={loading}
                >
                    {loading ? 'Publicando...' : 'Publicar'}
                </button>
            </div>
        </div>
    )
}

export default AddNews
