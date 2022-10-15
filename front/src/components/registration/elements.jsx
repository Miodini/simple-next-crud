// Small HTML snippets that are too simple to be a React component

const successMsg = <div className='alert alert-success sticky-bottom mt-2' role='alert'>
    <h3 className='alert-heading'>Sucesso!</h3>
    <p>Os dados foram gravados com sucesso.</p>
</div>

const errorMsg = <div className='alert alert-danger sticky-bottom mt-2' role='alert'>
    <h3 className='alert-heading'>Erro!</h3>
    <p>Não foi possível gravar os dados. Certifique-se que o servidor backend esteja ativo e executando na porta 3001.</p>
</div>

export {successMsg, errorMsg}