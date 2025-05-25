import './home.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Home() {

  const navigate = useNavigate()
  const [newsList, setNewsList] = useState([])

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await axios.get('http://localhost:3000/news')
        setNewsList(response.data)
      } catch (error) {
        console.error('Erro ao buscar notícias:', error)
      }
    }

    fetchNews()
  }, [])

  const goToNews = (id) => {
    navigate(`/news/${id}`)
  }

  const firstNews = newsList[0]
  const otherNews = newsList.slice(1)

  return (
    <div className='page'>

      {firstNews && (
        <div className='featured-news' onClick={() => goToNews(firstNews._id)}>
          <img src={firstNews.image} alt={firstNews.title} className='featured-image' />
          <h1 className='featured-title'>{firstNews.title}</h1>
        </div>
      )}

      <div className='news-grid'>
        {otherNews.map((news) => (
          <div key={news._id} className='news-card' onClick={() => goToNews(news._id)}>
            <img src={news.image} alt={news.title} className='news-card-image' />
            <h2 className='news-card-title'>{news.title}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
