import './login.css'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import api from '../../services/api.js'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { validateEmail } from '../../utils/validateEmail.js'

function Login() {
    const navigate = useNavigate()
    const inputEmail = useRef()
    const inputPassword = useRef()
    const { login } = useAuth()

    async function handleLogin() {
        const email = inputEmail.current.value.trim()
        const password = inputPassword.current.value

        if (!email || !password) {
            return alert('E-mail e senha são obrigatórios!')
        }

        if (!validateEmail(email)) {
            return alert('E-mail inválido!')
        }

        try {
            const response = await api.post('/login', { email, password })

            if (response.status === 200) {
                await login()
                navigate('/')
            } else {
                alert('Não foi possível fazer login.')
            }
        } catch (error) {
            const message = error.response?.data?.res || 'Erro ao tentar fazer login.'
            alert(message)
            console.error(error)
        }
    }

    return (
        <div className='container'>
            <form className='container-form' onSubmit={e => e.preventDefault()}>
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
                    ref={inputPassword}
                />

                <button
                    className='container-button'
                    type='button'
                    onClick={handleLogin}
                >
                    Login
                </button>

                <span
                    className='container-link'
                    onClick={() => navigate('/forgot-password')}
                >
                    Esqueceu a senha?
                </span>

                <span
                    className='container-link'
                    onClick={() => navigate('/new-account')}
                >
                    Criar conta
                </span>
            </form>
        </div>
    )
}

export default Login
