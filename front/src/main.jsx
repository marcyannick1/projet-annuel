import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {AuthProvider} from "./context/authContext.jsx";
import {BrowserRouter as Router} from 'react-router-dom'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </Router>
    </StrictMode>,
)
