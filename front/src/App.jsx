import {useState} from 'react'
import {Route, Routes} from 'react-router-dom';
import './App.css'
import LoginJSX from './components/login/LoginJSX'
import SignJSX from './components/sign/SignJSX'
import BackgroundJSX from './components/background/BackgroundJSX'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function App() {
    return (
        <Routes>
            <Route path='/' element={<LoginJSX/>}/>
            <Route path='/BackgroundJSX' element={<BackgroundJSX/>}/>
            <Route path='/SignJSX' element={<SignJSX/>}/>
        </Routes>
    )
}

export default App
