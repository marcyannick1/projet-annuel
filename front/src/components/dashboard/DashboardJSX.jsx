import React, { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Button, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/authContext'; // Contexte d'authentification
import './DashboardJSX.css';
import logo_ctos from '../../assets/logo_ctos.png';

const DashboardJSX = ({ children }) => {
  const { user, updateUser, logout } = useContext(AuthContext); // Obtenez l'utilisateur depuis le contexte Auth
  const navigate = useNavigate();
  const [roleVisible, setRoleVisible] = useState(false);

  // Vérifiez l'état de connexion et redirigez si nécessaire
  useEffect(() => {
    if (!user) {
      navigate("/LoginJSX"); // Redirigez vers la page de connexion si l'utilisateur n'est pas défini
    }
  }, [user, navigate]);

  // Fonction pour basculer la visibilité du rôle
  const toggleRoleVisibility = () => {
    setRoleVisible(!roleVisible);
  };

  // Si l'utilisateur n'est pas encore chargé ou si l'email n'est pas défini, retournez un loader ou une redirection
  if (!user || !user.email) {
    return <div>Chargement...</div>;  // Ou afficher un loader comme un spinner
  }

  // Déterminez les rôles de l'utilisateur
  const userRoles = [];
  if (user.isSuperAdmin) userRoles.push("Super Admin");
  userRoles.push("Associate"); // Ajoutez d'autres rôles si nécessaire

  return (
    <div className="dashboard-layout">
      <div className="dashboard-content contain">
        <header className="header">
          <img src={logo_ctos} alt="logo CTOS" style={{ width: '120px', height: '48px' }} />
          <div className="user-info">
            <span className="user-name" onClick={toggleRoleVisibility}>
              <FontAwesomeIcon icon={faCircleUser} /> {user.email}
              <FontAwesomeIcon icon={roleVisible ? faChevronUp : faChevronDown} className="chevron-icon" />
            </span>
            {roleVisible && (
              <span className="user-role">
                {userRoles.join(" & ")}
              </span>
            )}
          </div>
        </header>
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardJSX;
