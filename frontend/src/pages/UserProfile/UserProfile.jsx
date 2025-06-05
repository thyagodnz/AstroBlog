import './userProfile.css'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../../services/api.js'
import EditProfileModal from '../../components/EditProfileModal/EditProfileModal.jsx'
import Loading from '../../components/Loading/Loading.jsx'
import { BsPatchCheckFill } from 'react-icons/bs'

function UserProfile() {
    const { userId, token, logout } = useAuth()
    const navigate = useNavigate()
    const { id } = useParams()

    const [profileUser, setProfileUser] = useState(null)
    const [userNews, setUserNews] = useState([])
    const [showModal, setShowModal] = useState(false)

    const isOwnProfile = userId === id

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get(`/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setProfileUser(response.data)
            } catch (error) {
                console.error('Erro ao buscar usuário:', error)
            }
        }

        fetchUser()
    }, [id, token])

    useEffect(() => {
        const fetchUserNews = async () => {
            try {
                const response = await api.get(`/news/author/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setUserNews(response.data)
            } catch (error) {
                console.error('Erro ao buscar notícias do usuário:', error)
                setUserNews([])
            }
        }

        fetchUserNews()
    }, [id, token])

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const handleProfileUpdate = (updatedUser) => {
        setProfileUser(updatedUser)
    }

    if (!profileUser) {
        return <Loading />
    }

    return (
        <div className='page'>
            <div className='profile-container'>
                <div className='profile-icon'>
                    {profileUser.name ? profileUser.name.charAt(0).toUpperCase() : '?'}
                </div>

                <h1 className='user-name'>
                    {profileUser.name}
                    {profileUser.collaborator && (
                        <BsPatchCheckFill className='verified-icon-g' title='Colaborador' />
                    )}
                </h1>

                {isOwnProfile && (
                    <span className='user-email'>{profileUser.email}</span>
                )}

                <span className='user-bio'>{profileUser.bio}</span>

                {isOwnProfile && (
                    <div className='profile-buttons'>
                        <button
                            className='edit-profile-button'
                            onClick={() => setShowModal(true)}
                        >
                            Editar perfil
                        </button>

                        <button
                            className='be-collaborator-button'
                            onClick={() =>
                                navigate(
                                    profileUser.collaborator ? '/add-news' : '/be-collaborator'
                                )
                            }
                        >
                            {profileUser.collaborator ? 'Adicionar publicação' : 'Tornar-se colaborador'}
                        </button>

                        <button
                            onClick={handleLogout}
                            className='logout-button'
                        >
                            Sair
                        </button>
                    </div>
                )}
            </div>

            {showModal && (
                <EditProfileModal
                    user={profileUser}
                    onClose={() => setShowModal(false)}
                    onUpdate={handleProfileUpdate}
                />
            )}

            {profileUser.collaborator && userNews.length > 0 && (
                <div className='user-news-section'>
                    <div className='news-grid'>
                        {userNews.map(news => (
                            <div
                                key={news._id}
                                className='news-card'
                                onClick={() => navigate(`/news/${news._id}`)}
                            >
                                <img
                                    src={news.image}
                                    alt={news.title}
                                    className='news-card-image'
                                />
                                <h2 className='news-card-title'>{news.title}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserProfile
