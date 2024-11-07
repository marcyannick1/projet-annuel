import {useState} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css'
import UsersJSX from './components/users/UsersJSX'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import AccueilJSX from './components/accueil/AccueilJSX';
import DashboardJSX from './components/dashboard/DashboardJSX';
import EspaceStockageJSX from './components/espace-stockage/EspaceStockageJSX';
import AchatEspaceJSX from './components/achat-espace/AchatEspaceJSX';
import StatisitiquesJSX from './components/statistiques/StatisitiquesJSX';
import FacturesJSX from './components/factures/FacturesJSX';
import ProfilJSX from './components/profil/ProfilJSX';
import ViewFilesJSX from './components/viewfiles/ViewFilesJSX';




import LoginJSX from './components/login/LoginJSX'
import SignJSX from './components/sign/SignJSX'
import BackgroundJSX from './components/background/BackgroundJSX'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import SideBar from "./components/SideBar/Sidebar.jsx";
import InscriptionEmailJSX from './components/emails/InscriptionEmailJSX.jsx';
import SuppressionCompteEmailJSX from './components/emails/SuppressionCompteEmailJSX.jsx';
import NouveauCompteAdminEmailJSX from './components/emails/NouveauCompteAdminEmailJSX.jsx';
import SuppressionCompteAdminEmailJSX from './components/emails/SuppressionCompteAdminEmailJSX.jsx';
import FactureEmailJSX from './components/emails/FactureEmailJSX.jsx';


function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <SideBar/>
            <DashboardJSX />
            <Routes>
                <Route path="/" element={<AccueilJSX/>}/>
                <Route path="/LoginJSX" element={<LoginJSX/>}/>
                <Route path="/SignJSX" element={<SignJSX/>}/>
                <Route path="/UsersJSX" element={<UsersJSX/>}/>
                <Route path="/AccueilJSX" element={<AccueilJSX/>}/>
                <Route path="/EspaceStockageJSX" element={<EspaceStockageJSX/>}/>
                <Route path="/viewFilesJSX/:userId" element={<ViewFilesJSX />} />
                <Route path="/FacturesJSX" element={<FacturesJSX/>}/>
                <Route path="/AchatEspaceJSX" element={<AchatEspaceJSX/>}/>
                <Route path="/StatisitiquesJSX" element={<StatisitiquesJSX/>}/>
                <Route path="/ProfilJSX" element={<ProfilJSX/>}/>
                <Route path="/SuppressionCompteEmailJSX" element={<SuppressionCompteEmailJSX/>}/>
                <Route path="/SuppressionCompteAdminEmailJSX" element={<SuppressionCompteAdminEmailJSX/>}/>
                <Route path="/InscriptionEmailJSX" element={<InscriptionEmailJSX/>}/>
                <Route path="/FactureEmailJSX" element={<FactureEmailJSX/>}/>

                <Route path="/NouveauCompteAdminEmailJSX" element={<NouveauCompteAdminEmailJSX/>}/>

                

                

            </Routes>
        </>

    )

}

export default App