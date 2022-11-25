import React from 'react'
import Side from '../components/template/Side'
import Logo from '../components/template/Logo'
import Home from '../components/home/Home'
import Users from '../components/users/Users'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

export default function Page(){
    return(
        <BrowserRouter
            // basename='projects/crud'
            // The above line needs to be uncommented to build correctly for my github pages
        >
            <Logo/>
            <Side/>
            <Routes>
                <Route path='/home' element={<Home/>} />
                <Route path='/users' element={<Users/>} />
                <Route path='/*' element={<Navigate to='/home'/>} />
            </Routes>
        </BrowserRouter>
    )
}
