import React from 'react'
import Side from '../components/template/Side'
import Logo from '../components/template/Logo'
import Home from '../components/home/Home'
import Registration from '../components/registration/Registration' 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

export default function Page(){
    return(
        <BrowserRouter>
            <Logo/>
            <Side/>
            <Routes>
                <Route path='/home' element={<Home/>} />
                <Route path='/registration' element={<Registration/>} />
                <Route path='/*' element={<Navigate to='/home'/>} />
            </Routes>
        </BrowserRouter>
    )
}
