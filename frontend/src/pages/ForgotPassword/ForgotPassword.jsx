import './forgotPassword.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../../services/api'
import { validateEmail } from '../../utils/validateEmail'

function ForgotPassword() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit() {
        if (!email.trim()) {
            return alert('Digite seu e-mail!')
        }

        if (!validateEmail(email)) {
            return alert('E-mail inválido!')
        }

        setLoading(true)

        try {
            const response = await api.post('/users/forgot-password', { email })

            if (response.status === 200) {
                alert('Instruções enviadas para seu e-mail.')
                setEmail('')
            } else {
                alert('Erro ao enviar instruções. Tente novamente.')
            }
        } catch (error) {
            const message = error.response?.data?.res || 'Erro ao enviar e-mail.'
            alert(message)
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='container'>
            <form className='container-form' onSubmit={(e) => e.preventDefault()}>
                <h1 className='container-title'>Esqueci minha senha</h1>
                <h2 className='instructions'>
                    Insira seu e-mail para receber as instruções e redefinir sua senha
                </h2>

                <input
                    className='container-input'
                    placeholder='E-mail'
                    name='email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button
                    className='container-button'
                    type='button'
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? 'Enviando...' : 'Enviar'}
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

export default ForgotPassword
