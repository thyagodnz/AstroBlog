import './beCollaborator.css'

function BeCollaborator() {

    return (
        <div className='container'>
            <form
                id='collaborator'
                className='container-form'>

                <h1
                    id='collaborator-title'
                    className='container-title'
                >
                    Seja um Colaborador
                </h1>

                <h2
                    id='collaborator-instructions1'
                    className='instructions'
                >
                    Ajude-nos com a publicação de conteúdos
                </h2>

                <input
                    className='container-input'
                    placeholder='CPF'
                    name='cpf'
                    type='cpf'
                />

                <input
                    className='container-input'
                    placeholder='Ocupação / Atuação'
                    name='ocupacao'
                    type='text'
                />

                <input
                    className='container-input'
                    placeholder='Instituição'
                    name='instituicao'
                    type='text'
                />

                <button
                    id='collaborator-button'
                    className='container-button'
                    type='button'
                >
                    Enviar
                </button>

                <h2
                    id='collaborator-instructions2'
                    className='instructions'
                >
                    Vamos analisar os seus dados e enviaremos o resultado por e-mail
                </h2>
            </form>
        </div>
    )
}

export default BeCollaborator