import React from 'react'
import Header from '../components/template/Header'
import Side from '../components/template/Side'
import Main from '../components/template/Main'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

export default function Page(){
    return(
        <>
            <Header
                icon='fa-home'
                title='Opa'
                subtitle='Testando essa coisa'
            />
            <Side/>
            <Main
                content='isso'
            />
        </>
    )
}
