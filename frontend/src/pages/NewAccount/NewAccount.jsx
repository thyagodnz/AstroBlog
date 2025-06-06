import './newAccount.css'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import api from '../../services/api.js'
import { useAuth } from '../../contexts/AuthContext.jsx'

function NewAccount() {
    const navigate = useNavigate()
    const inputName = useRef()
    const inputEmail = useRef()
    const inputPassword = useRef()
    const { login } = useAuth()

    async function createUser() {
        const name = inputName.current.value
        const email = inputEmail.current.value
        const password = inputPassword.current.value

        try {
            const response = await api.post('/users', { name, email, password })

            if (response.status === 201 && response.data) {
                const { token } = response.data
                login(token)
                navigate('/')
            } else {
                alert('Erro ao criar conta. Tente novamente.')
            }
        } catch (error) {
            if (error.response?.data?.res) {
                alert(error.response.data.res)
            } else {
                alert('Erro ao criar conta.')
            }
            console.error(error)
        }
    }

    return (
        <div className='container'>
            <form className='container-form'>
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
