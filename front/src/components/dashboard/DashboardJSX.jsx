import React, { useState, useContext } from 'react';
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
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authContext';
import './DashboardJSX.css';
import logo_ctos from '../../assets/logo_ctos.png';



// Données du menu
const items = [
  {
    key: 'home',
    icon: <FontAwesomeIcon icon={faHome} />,
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
    icon: <ContainerOutlined />,
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
  },
  {
    key: 'sub3',
    label: <Link to="/FacturesJSX">Mes factures</Link>,
    icon: <FileTextOutlined />,
  },
  {
    key: 'sub2',
    label: <Link to="/AchatEspaceJSX">Achat Espace</Link>,
    icon: <FontAwesomeIcon icon={faCartShopping} />,
  },
  {
    key: 'user-profil',
    icon: <FontAwesomeIcon icon={faCircleUser} />,
    label: <Link to="/ProfilJSX">Voir mon Compte</Link>,
    style: { position: 'absolute', bottom: 42, width: '100%' }
  },
  {
    key: 'logout',
    icon: <LogoutOutlined />,
    label: 'Logout',
    style: { position: 'absolute', bottom: 0, width: '100%' }
  },
];

const DashboardJSX = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [roleVisible, setRoleVisible] = useState(false);
  const { logout } = useContext(AuthContext); // Utilisation du contexte d'authentification

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const toggleRoleVisibility = () => {
    setRoleVisible(!roleVisible);
  };

  const handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      // Appel à la fonction de déconnexion
      logout();
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
            onClick={handleMenuClick}
            defaultSelectedKeys={['home']}
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
        <img src={logo_ctos} alt="logo CTOS" style={{ width: '120px', height: 'auto' }} />

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
