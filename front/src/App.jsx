import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import UsersJSX from './components/users/UsersJSX'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AccueilJSX from './components/accueil/AccueilJSX';
import DashboardJSX from './components/dashboard/DashboardJSX';
import EspaceStockageJSX from './components/espace-stockage/EspaceStockageJSX';
import AchatEspaceJSX from './components/achat-espace/AchatEspaceJSX';
import StatisitiquesJSX from './components/statistiques/StatisitiquesJSX';
import FacturesJSX from './components/factures/FacturesJSX';
import ProfilJSX from './components/profil/ProfilJSX';




function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <DashboardJSX>
        <Routes>
          <Route path="/" element={<AccueilJSX />} />
          <Route path="/UsersJSX" element={<UsersJSX />} />
          <Route path="/AccueilJSX" element={<AccueilJSX />} />
          <Route path="/EspaceStockageJSX" element={<EspaceStockageJSX />} />
          <Route path="/FacturesJSX" element={<FacturesJSX />} />
          <Route path="/AchatEspaceJSX" element={<AchatEspaceJSX />} />
          <Route path="/StatisitiquesJSX" element={<StatisitiquesJSX />} />
          <Route path="/ProfilJSX" element={<ProfilJSX />} />





        </Routes>
      </DashboardJSX>
    </Router>
  )
}

export default App