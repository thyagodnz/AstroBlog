import './addNews.css'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import api from '../../services/api'

function AddNews() {
    const { user } = useAuth()
    const navigate = useNavigate()

    const [imageFile, setImageFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [loading, setLoading] = useState(false)

    const titleRef = useRef()
    const contentRef = useRef()
    const imageDescriptionRef = useRef()

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImageFile(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleFileButtonClick = () => {
        document.getElementById('fileInput').click()
    }

    const handlePublish = async () => {
        const title = titleRef.current.value
        const content = contentRef.current.value
        const imageDescription = imageDescriptionRef.current.value

        if (!title || !content || !imageFile || !imageDescription) {
            alert('Preencha todos os campos e selecione uma imagem!')
            return
        }

        try {
            setLoading(true)

            const formData = new FormData()
            formData.append('file', imageFile)
            formData.append('upload_preset', 'news-astroblog')
            const cloudName = 'dpiificss'

            const cloudinaryResponse = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                {
                    method: 'POST',
                    body: formData
                }
            )

            const cloudinaryData = await cloudinaryResponse.json()
            console.log(cloudinaryData)

            const imageUrl = cloudinaryData.secure_url

            if (!imageUrl) {
                throw new Error('Erro no upload da imagem')
            }

            const response = await api.post('/news', {
                title,
                author: user.id,
                content,
                image: imageUrl,
                imageDescription
            })

            if (response.status === 201) {
                alert('Notícia publicada com sucesso!')
                navigate(`/user-profile/${user.id}`)
            }
        } catch (error) {
            console.error(error)
            alert('Erro ao publicar a notícia')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='page'>
            <div className='add-news-container'>
                <h1 className='add-news'>Adicionar notícia</h1>

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

                <div className='add-image'>
                    <button
                        type='button'
                        className='add-image-button'
                        onClick={handleFileButtonClick}
                    >
                        {imageFile ? 'Imagem selecionada' : 'Anexar imagem'}
                    </button>

                    <input
                        id='fileInput'
                        type='file'
                        accept='image/*'
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />

                    <input
                        className='add-image-description'
                        placeholder='Insira aqui a descrição da imagem...'
                        type='text'
                        ref={imageDescriptionRef}
                        required
                    />
                </div>

                {preview && (
                    <div className='image-preview'>
                        <img src={preview} alt='Preview' />
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
