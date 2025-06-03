import './login.css'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import api from '../../services/api.js'
import { useAuth } from '../../contexts/AuthContext.jsx'

function Login() {

    const navigate = useNavigate()
    const inputEmail = useRef()
    const inputPassword = useRef()
    const { login } = useAuth()

    async function handleLogin() {
        try {
            const response = await api.post('/login', {
                email: inputEmail.current.value,
                password: inputPassword.current.value
            })

            if (response.status === 200 && response.data) {
                const userData = response.data
                localStorage.setItem('user', JSON.stringify(userData))
                login(userData)
                navigate('/')
            }
        } catch (error) {
            alert('Erro ao tentar fazer login')
            console.error(error)
        }
    }

    return (
        <div className='container'>
            <form className='container-form'>
                <h1 className='container-title'>Fazer login</h1>
                <input
                    className='container-input'
                    placeholder='E-mail'
                    name='email'
                    type='email'
                    ref={inputEmail}
                />
                <input
                    className='container-input'
                    placeholder='Senha'
                    name='senha'
                    type='password'
                    ref={inputPassword} />
                <button
                    className='container-button'
                    type='button'
                    onClick={handleLogin}>
                    Login
                </button>
                <span className='container-link' onClick={() => navigate('/forgot-password')}>
                    Esqueceu a senha?
                </span>
                <span className='container-link' onClick={() => navigate('/new-account')}>
                    Criar conta
                </span>
            </form>
        </div>
    )
}

export default Login
