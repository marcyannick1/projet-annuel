import {Route, Routes} from 'react-router-dom';
import './App.css'
import UsersJSX from './components/users/UsersJSX'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Accueil from './components/accueil/Accueil.jsx';
import EspaceStockage from './components/espace-stockage/EspaceStockage.jsx';
import AchatEspace from './components/achat-espace/AchatEspace.jsx';
import Statistiques from './components/statistiques/Statistiques.jsx';
import Factures from './components/factures/Factures.jsx';

import LoginJSX from './components/login/Login.jsx'
import Sign from './components/sign/Sign.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import SideBar from "./components/SideBar.jsx";
import Profil from "./components/profil/Profil.jsx";

function App() {
    return (
        <>
            <SideBar/>
            <Routes>
                <Route path="/" element={<Accueil/>}/>
                <Route path='/login' element={<LoginJSX/>}/>
                <Route path='/register' element={<Sign/>}/>
                <Route path="/UsersJSX" element={<UsersJSX/>}/>
                <Route path="/EspaceStockage" element={<EspaceStockage/>}/>
                <Route path="/Factures" element={<Factures/>}/>
                <Route path="/AchatEspace" element={<AchatEspace/>}/>
                <Route path="/Statistiques" element={<Statistiques/>}/>
                <Route path="/Profil" element={<Profil/>}/>
            </Routes>
        </>

    )
}

export default App