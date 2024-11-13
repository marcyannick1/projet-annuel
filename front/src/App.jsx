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

import { useNavigate } from 'react-router-dom'; 

import LoginJSX from './components/login/LoginJSX'
import SignJSX from './components/sign/SignJSX'
import BackgroundJSX from './components/background/BackgroundJSX'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import SideBar from "./components/SideBar/Sidebar.jsx";
import SubscriptionJSX from './components/subscription/SubscriptionJSX.jsx';
import AuthContext from '../src/context/authContext.jsx';

import React, { useContext, useEffect } from 'react';
function App() {
    const [count, setCount] = useState(0)
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 
    const [isSubscribed, setIsSubscribed] = useState(false); // État pour vérifier l'abonnement
    const [subscriptions, setSubscriptions] = useState([]); // Stocke les abonnements de l'utilisateur
      // Vérifiez l'état de connexion et redirigez si nécessaire
  useEffect(() => {

    // Fonction pour vérifier si l'utilisateur a un abonnement
    const fetchSubscription = async () => {
      try {
        const response = await fetch(`http://localhost:3000/subscription/${user.id}`);
        const data = await response.json();

        if (data.length > 0) {
          setIsSubscribed(true);
          setSubscriptions(data); // Met à jour les abonnements
        } else {
          // Redirige vers la page SubscriptionJSX si l'utilisateur n'a pas d'abonnement
          navigate("/SubscriptionJSX");
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des abonnements:', error);
      }
    };

    fetchSubscription();
  }, [user, navigate]);

    return (
        <>
            {isSubscribed &&
            <>
            <SideBar/>
            <DashboardJSX />
            </>

        }
            <Routes>
                <Route path="/" element={<AccueilJSX/>}/>
                <Route path="/LoginJSX" element={<LoginJSX/>}/>
                <Route path="/SignJSX" element={<SignJSX/>}/>
                <Route path="/UsersJSX" element={<UsersJSX/>}/>
                <Route path="/AccueilJSX" element={<AccueilJSX/>}/>
                <Route path="/EspaceStockageJSX" element={<EspaceStockageJSX/>}/>
                <Route path="/FacturesJSX" element={<FacturesJSX/>}/>
                <Route path="/AchatEspaceJSX" element={<AchatEspaceJSX/>}/>
                <Route path="/StatisitiquesJSX" element={<StatisitiquesJSX/>}/>
                <Route path="/ProfilJSX" element={<ProfilJSX/>}/>
                <Route path="/SubscriptionJSX" element={<SubscriptionJSX/>}/>
            </Routes>

        </>

    )

}

export default App


