import './addNews.css'

function AddNews() {

    return (
        <div className='page'>
            <div className='add-news-container'>
                <h1 className='add-news'>Adicionar notícia</h1>

                <textarea
                    className='add-news-title'
                    placeholder='Insira aqui o título...'
                    required
                />

                <textarea
                    className='add-news-content'
                    placeholder='Insira aqui o conteúdo...'
                    required
                />

                <div className='add-image'>
                    <button className='add-image-button'>
                        Anexar imagem
                    </button>
                    <textarea
                        className='add-image-description'
                        placeholder='Insira aqui a descrição da imagem...'
                        required
                    />
                </div>

                <button className='publish-news'>
                    Publicar
                </button>
            </div>
        </div>
    )
}

export default AddNews
