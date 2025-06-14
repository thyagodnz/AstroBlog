import './editProfileModal.css'
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext.jsx'
import api from '../../services/api.js'

function EditProfileModal({ user, onClose, onUpdate }) {
    const { updateUserData } = useAuth()

    const [name, setName] = useState(user.name)
    const [bio, setBio] = useState(user.bio || '')
    const [isSaving, setIsSaving] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSaving(true)

        try {
            const response = await api.put(`/users/${user.id}`, {
                name,
                bio
            })

            onUpdate(response.data)
            updateUserData(response.data)
            onClose()
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error)
            alert('Erro ao atualizar perfil')
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className='modal-overlay'>
            <div className='modal'>
                <h2>Editar Perfil</h2>
                <form onSubmit={handleSubmit}>
                    <label>Nome</label>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <label>Biografia</label>
                    <textarea
                        rows='3'
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder='Fale um pouco sobre você...'
                    />

                    <div className='modal-buttons'>
                        <button type='button' onClick={onClose} className='cancel-button'>
                            Cancelar
                        </button>
                        <button type='submit' className='save-button' disabled={isSaving}>
                            {isSaving ? 'Salvando...' : 'Salvar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfileModal
