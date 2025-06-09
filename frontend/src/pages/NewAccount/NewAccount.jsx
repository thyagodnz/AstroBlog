import './newAccount.css'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import api from '../../services/api.js'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { validateEmail } from '../../utils/validateEmail.js'

function NewAccount() {
    const navigate = useNavigate()
    const inputName = useRef()
    const inputEmail = useRef()
    const inputPassword = useRef()
    const inputConfirmPassword = useRef()
    const { login } = useAuth()

    async function createUser() {
        const name = inputName.current.value.trim()
        const email = inputEmail.current.value.trim()
        const password = inputPassword.current.value
        const confirmPassword = inputConfirmPassword.current.value

        if (!name || !email || !password || !confirmPassword) {
            return alert('Todos os campos são obrigatórios!')
        }

        if (!validateEmail(email)) {
            return alert('E-mail inválido!')
        }

        if (password.length < 8) {
            return alert('A senha deve ter pelo menos 8 caracteres!')
        }

        if (password !== confirmPassword) {
            return alert('As senhas não coincidem!')
        }

        try {
            const response = await api.post('/users', { name, email, password })

            if (response.status === 201) {
                await login()
                navigate('/')
            } else {
                alert('Erro ao criar conta. Tente novamente.')
            }
        } catch (error) {
            const message = error.response?.data?.res || 'Erro ao criar conta.'
            alert(message)
            console.error(error)
        }
    }

    return (
        <div className='container'>
            <form className='container-form' onSubmit={(e) => e.preventDefault()}>
                <h1 className='container-title'>Criar nova conta</h1>
                <input
                    className='container-input'
                    placeholder='Nome'
                    name='nome'
                    type='text'
                    ref={inputName}
                />
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
                <input
                    className='container-input'
                    placeholder='Confirmar senha'
                    name='confirmarSenha'
                    type='password'
                    ref={inputConfirmPassword}
                />

                <button
                    className='container-button'
                    type='button'
                    onClick={createUser}
                >
                    Criar
                </button>

                <span
                    className='container-link'
                    onClick={() => navigate('/login')}
                >
                    Voltar para tela de Login
                </span>
            </form>
        </div>
    )
}

export default NewAccount
