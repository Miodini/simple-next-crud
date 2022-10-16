import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'
import Name from './Name'
import Email from './Email'
import Gender from './Gender'
import Phone from './Phone'
import SuccessMsg from './SuccessMsg'
import ErrorMsg from './ErrorMsg'

const initialState = {
    // The actual data inside each input
    user: {
        name: '',
        email: '',
        gender: '',
        phone: '',
    },
    // JSX element for the confirmation message
    confirmationMsg: null,
    // Needed for bootstrap validation
    formClass: null
}
const postUrl = 'http://localhost:3001/users'

export default class Registration extends Component{
    constructor(props){
        super(props)
        // Deep cloning of the initialState obj
        this.state = {
            ...initialState,
            user: {...initialState.user},
        }
    }

    clear(event){
        if(event) event.preventDefault()
        this.setState({
            ...initialState,
            user: {...initialState.user}
        })
    }

    /** Shows and animates the confirmation message after a post
     * @param error If set to true, displays an error message instead
     */
    showConfirmationMsg(error = false){
        // Callback to remove the message component from this component's state
        const removeComponentCB = () => this.setState({confirmationMsg: null})
        if(error)
            this.setState({confirmationMsg: <ErrorMsg callOnHide={removeComponentCB}z/>})
        else
            this.setState({confirmationMsg: <SuccessMsg callOnHide={removeComponentCB}/>})
        
    }

    async save(event){
        let error = false
        event.preventDefault()
        this.setState({formClass: 'was-validated'})
        // If there are no empty fields, save them
        if(!Object.values(this.state.user).some(value => value === '')){
            try{
                await axios.post(postUrl, this.state.user)
                this.clear()
            }
            catch(e){
                error = true
            }
            finally{
                this.showConfirmationMsg(error)
            }
        }
    }

    updateInput(event){
        const newUserData = {...this.state.user}
        newUserData[event.target.name] = event.target.value
        this.setState({user: newUserData})
    }

    render(){
        const userData = this.state.user
        return(
            <>
                <Main icon='fa-users'
                    title='Cadastro'
                    subtitle='Cadastre as pessoas.'
                >
                    <div className='container-fluid mb-0'>
                        <form className={this.state.formClass} noValidate>
                            <div className='row'>
                                <div className='col-12 col-md-6 mb-2'>
                                    <Name
                                        value={userData.name}
                                        inputId = 'formName'
                                        onChange = {(e) => this.updateInput(e)}
                                    />
                                </div>
                                <div className='col-12 col-md-6 mb-2'>
                                    <Email
                                        value = {userData.email}
                                        inputId = 'formEmail'
                                        onChange={(e) => this.updateInput(e)}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12 col-md-6 mb-2'>
                                    <Gender 
                                        value={userData.gender}
                                        inputId = 'formGender'
                                        onChange = {(e) => this.updateInput(e)}
                                    />
                                </div>
                                <div className='col-12 col-md-6 mb-2'>
                                    <Phone 
                                        value = {userData.phone}
                                        inputId = 'formPhone'
                                        onChange={(e) => this.updateInput(e)}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col">
                                    <button className='btn btn-primary float-end' onClick={(e) => this.save(e)}>
                                        Enviar
                                    </button>
                                    <button className='btn btn-secondary float-end mx-1' onClick={(e) => this.clear(e)}>
                                        Limpar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    {this.state.confirmationMsg}
                </Main>
            </>
        )
    }
}

