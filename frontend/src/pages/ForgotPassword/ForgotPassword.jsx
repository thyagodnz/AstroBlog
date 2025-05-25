import './forgotPassword.css'
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {

    const navigate = useNavigate()

    return (
        <div className='container'>
            <form className='container-form'>
                <h1 className='container-title'>Esqueci minha senha</h1>
                <h2 className='instructions'>Insira seu e-mail para receber as instruções e redefinir sua senha</h2>
                <input
                    className='container-input'
                    placeholder='E-mail'
                    name='email'
                    type='email' />
                <button
                    className='container-button'
                    type='button'>
                    Enviar
                </button>
                <span className='container-link' onClick={() => navigate('/login')} >
                    Voltar para tela de Login
                </span>
            </form>
        </div>
    )
}

export default ForgotPassword
