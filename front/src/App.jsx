import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css'
import UsersJSX from './components/users/UsersJSX'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
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
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import SideBar from "./components/SideBar/Sidebar.jsx";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import AdminRoutes from "./utils/AdminRoutes.jsx";
import {useContext} from "react";
import AuthContext from "./context/authContext.jsx";

function App() {
    const {user} = useContext(AuthContext);

    console.log("1", user)
    return (
        <>
            <SideBar/>
            <DashboardJSX />
            <Routes>
                <Route element={<PrivateRoutes />}>
                    <Route element={<AdminRoutes />}>
                        <Route path="/UsersJSX" element={<UsersJSX/>}/>
                        <Route path="/viewFilesJSX/:userId" element={<ViewFilesJSX />} />
                        <Route path="/StatisitiquesJSX" element={<StatisitiquesJSX/>}/>
                    </Route>
                    <Route path="/" element={<AccueilJSX/>}/>
                    <Route path="/AccueilJSX" element={<AccueilJSX/>}/>
                    <Route path="/EspaceStockageJSX" element={<EspaceStockageJSX/>}/>
                    <Route path="/FacturesJSX" element={<FacturesJSX/>}/>
                    <Route path="/AchatEspaceJSX" element={<AchatEspaceJSX/>}/>
                    <Route path="/ProfilJSX" element={<ProfilJSX/>}/>
                </Route>
                <Route path="/LoginJSX" element={<LoginJSX/>}/>
                <Route path="/SignJSX" element={<SignJSX/>}/>
            </Routes>
        </>

    )

}

export default App