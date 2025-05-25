import './header.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function Header() {
    const navigate = useNavigate()
    const location = useLocation()
    const { user } = useAuth()

    return (
        <header className='header'>
            <h1 onClick={() => navigate('/')}>ASTROBLOG</h1>

            {(location.pathname === '/' || location.pathname.startsWith('/news/')) && (
                <button
                    className='login-button'
                    onClick={() => navigate(user ? '/my-profile' : '/login')}
                >
                    {user ? 'Meu perfil' : 'Entrar'}
                </button>
            )}
        </header>
    )
}

export default Header
