import './myProfile.css'
import Header from '../../components/Header/Header.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

function MyProfile() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <>
            <Header />
            <div className='profile-container'>
                <h2>Bem-vindo, {user?.name || 'Usuário'}!</h2>
                <button onClick={handleLogout} className='logout-button'>
                    Sair
                </button>
            </div>
            <Footer />
        </>
    )
}

export default MyProfile
