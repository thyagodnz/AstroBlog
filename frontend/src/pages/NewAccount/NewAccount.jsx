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

    async function creatUser() {
        const name = inputName.current.value
        const email = inputEmail.current.value
        const password = inputPassword.current.value

        try {
            await api.post('/users', { name, email, password })
            alert('Conta criada com sucesso!')

            const response = await api.post('/login', { email, password })

            if (response.status === 200 && response.data) {
                const userData = response.data
                localStorage.setItem('user', JSON.stringify(userData))
                login(userData)
                navigate('/')
            } else {
                alert('Erro ao fazer login automático. Faça login manualmente.')
                navigate('/login')
            }
        } catch (error) {
            if (error.response?.data?.message) {
                alert(error.response.data.message)
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
                    name='nome' type='name'
                    ref={inputName} />
                <input
                    className='container-input'
                    placeholder='E-mail'
                    name='email'
                    type='email'
                    ref={inputEmail} />
                <input
                    className='container-input'
                    placeholder='Senha'
                    name='senha'
                    type='password'
                    ref={inputPassword} />
                <button
                    className='container-button'
                    type='button'
                    onClick={creatUser}>
                    Criar
                </button>
                <span className='container-link' onClick={() => navigate('/login')} >
                    Voltar para tela de Login
                </span>
            </form>
        </div>
    )
}

export default NewAccount
