import React from 'react'
import Side from '../components/template/Side'
import Home from '../components/home/Home'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

export default function Page(){
    return(
        <>
            <Side/>
            <Home/>
        </>
    )
}
