import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import './DashboardJSX.css';

// Données du menu
const items = [
  {
    key: '1',
    icon: <PieChartOutlined />,
    label: 'Statistiques',
  },
  {
    key: '2',
    icon: <DesktopOutlined />,
    label: 'Dashboard',
  },
  {
    key: '3',
    icon: <ContainerOutlined />,
    label: 'Fichiers',
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
    key: 'sub2',
    label: 'Navigation Two',
    icon: <AppstoreOutlined />,
    children: [
      {
        key: '9',
        label: 'Option 9',
      },
      {
        key: '10',
        label: 'Option 10',
      },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          {
            key: '11',
            label: 'Option 11',
          },
          {
            key: '12',
            label: 'Option 12',
          },
        ],
      },
    ],
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
            defaultSelectedKeys={['1']}
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
