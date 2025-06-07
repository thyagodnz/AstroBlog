import './beCollaborator.css'

function BeCollaborator() {

     return (
        <div className='container'>
            <form className='container-form collaborator'>
                <h1 className='container-title'>Seja um Colaborador</h1>
                  <h2 className='instructions'> Ajude-nos com a publicação de conteúdos!</h2>
                <input
                    className='container-input'
                    placeholder='CPF'
                    name='cpf'
                    type='cpf'
                />

                <input
                    className='container-input'
                    placeholder='Ocupação/Atuação'
                    name='ocupação'
                    type='text'
                  
                />
                <input
                    className='container-input'
                    placeholder='Instituiçao'
                    name='instituição'
                    type='text'
                  
                />

                <button
                    className='container-button'
                    type='button'
                >
                    Enviar
                </button>
                 <h2 className='instructions'> Vamos analisar os seus dados e enviaremos o resultado via e-mail. </h2>
            </form>
        </div>
    )

}

export default BeCollaborator
