import './beCollaborator.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'
import api from '../../services/api'

function BeCollaborator() {
    const [cpf, setCpf] = useState('')
    const [occupation, setOccupation] = useState('')
    const [institution, setInstitution] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const { userData } = useAuth()

    async function handleSubmit() {
        if (!cpf.trim() || !occupation.trim() || !institution.trim()) {
            return alert('Preencha todos os campos!')
        }

        setLoading(true)

        try {
            const response = await api.post('/users/be-collaborator', { cpf, occupation, institution })

            if (response.status === 200) {
                alert('Pedido enviado com sucesso!')
                setCpf('')
                setOccupation('')
                setInstitution('')
                navigate(`/user-profile/${userData?.id}`)
            } else {
                alert('Erro ao enviar. Tente novamente.')
            }
        } catch (error) {
            const message = error.response?.data?.res || 'Erro ao enviar informações.'
            alert(message)
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='container'>
            <form
                id='collaborator'
                className='container-form'
                onSubmit={(e) => e.preventDefault()}
            >
                <h1 id='collaborator-title' className='container-title'>
                    Seja um Colaborador
                </h1>

                <h2 id='collaborator-instructions1' className='instructions'>
                    Ajude-nos com a publicação de conteúdos
                </h2>

                <input
                    className='container-input'
                    placeholder='CPF'
                    name='cpf'
                    type='text'
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                />

                <input
                    className='container-input'
                    placeholder='Ocupação / Atuação'
                    name='occupation'
                    type='text'
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                />

                <input
                    className='container-input'
                    placeholder='Instituição'
                    name='instituicao'
                    type='text'
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                />

                <button
                    id='collaborator-button'
                    className='container-button'
                    type='button'
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? 'Enviando...' : 'Enviar'}
                </button>

                <h2 id='collaborator-instructions2' className='instructions'>
                    Vamos analisar os seus dados e enviaremos o resultado por e-mail
                </h2>
            </form>
        </div>
    )
}

export default BeCollaborator
