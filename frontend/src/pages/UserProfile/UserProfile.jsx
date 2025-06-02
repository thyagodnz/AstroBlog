import './userProfile.css'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import EditProfileModal from '../../components/EditProfileModal/EditProfileModal.jsx'
import Loading from '../../components/Loading/Loading.jsx'

function UserProfile() {
    const { user, logout, login } = useAuth()
    const navigate = useNavigate()
    const { id } = useParams()

    const [profileUser, setProfileUser] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const isOwnProfile = user?.id === id

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users/${id}`)
                setProfileUser(response.data)
            } catch (error) {
                console.error('Erro ao buscar usuário:', error)
            }
        }

        fetchUser()
    }, [id])

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const handleProfileUpdate = (updatedUser) => {
        setProfileUser(updatedUser)
        login(updatedUser)
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

                <h1 className='user-name'>{profileUser.name || 'Usuário'}</h1>

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
                            {profileUser.collaborator ? 'Adicionar notícia' : 'Tornar-se colaborador'}
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
        </div>
    )
}

export default UserProfile
