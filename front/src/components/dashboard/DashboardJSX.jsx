import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faChevronDown, faChevronUp, faCartShopping, faHome } from '@fortawesome/free-solid-svg-icons';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  FileTextOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import './DashboardJSX.css';
import { Link } from 'react-router-dom';

// Données du menu
const items = [
  {
    key: 'home',  // Clé unique pour l'élément Home
    icon: <FontAwesomeIcon icon={faHome} />,  // Icône Home
    label: <Link to="/AccueilJSX">Home</Link>,
  },
  {
    key: '1',
    icon: <DesktopOutlined />,
    label: <Link to="/UsersJSX">Dashboard</Link>,
  },
  {
    key: '3',
    icon: <PieChartOutlined />,
    label: <Link to="/StatisitiquesJSX">Statistiques</Link>,
  },
  {
    key: '2',
    icon: < ContainerOutlined/>,
    label: <Link to="/EspaceStockageJSX">Espaces de Stockage</Link>,

  },
  {
    key: 'sub1',
    label: 'Messages',
    icon: <MailOutlined />,
    children: [
      {
        key: '5',
        label: 'Nouveaux Utilisateurs',
      },
      {
        key: '6',
        label: 'Création de nouveau compte',
      },
      {
        key: '7',
        label: 'Compte supprimé',
      },
      {
        key: '8',
        label: 'Changez votre mot de passe',
      },
    ],
  }
  ,{
    key: 'sub3',
    label: <Link to="/FacturesJSX">Mes factures</Link>,
    icon: <FileTextOutlined />, // Icône de factures d'Ant Design
  },
  {
    key: 'sub2',
    label: <Link to="/AchatEspaceJSX">Achat Espace</Link>,
    icon: <FontAwesomeIcon icon={faCartShopping} />, // Icône de panier d'achat
  },
  {
    key: 'logout', // Clé unique pour l'élément de déconnexion
    icon: <LogoutOutlined />, // Icône de déconnexion
    label: 'Logout',
    style: { position: 'absolute', bottom: 0, width: '100%' } // Position en bas du menu
  },
];

const DashboardJSX = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [roleVisible, setRoleVisible] = useState(false); // État pour la visibilité du rôle

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const toggleRoleVisibility = () => {
    setRoleVisible(!roleVisible); // Basculer la visibilité du rôle
  };

  const handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      // Logique de déconnexion ici
      console.log('Logout clicked');
    }
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div>
          <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{
              marginBottom: 16,
              width: '100%',
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <Menu
            onClick={handleMenuClick} // Gestion des clics sur les éléments du menu
            defaultSelectedKeys={['home']} // Sélectionne "Home" par défaut
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            items={items}
          />
        </div>
      </aside>
      <div className="content">
        <header className="header">
          <div className="search-bar">
            <input type="text" placeholder="Rechercher..." />
          </div>
          <div className="user-info">
            <span className="user-name" onClick={toggleRoleVisibility}>
              <FontAwesomeIcon icon={faCircleUser} /> mouakassarufus@gmail.com
              <FontAwesomeIcon icon={roleVisible ? faChevronUp : faChevronDown} className="chevron-icon" />
            </span>
            {roleVisible && <span className="user-role">Admin &amp; Associate</span>}
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
