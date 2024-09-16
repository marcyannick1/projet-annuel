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

const DashboardJSX = ({ children }) => {
  const [roleVisible, setRoleVisible] = useState(false);

  const toggleRoleVisibility = () => {
    setRoleVisible(!roleVisible);
  };

  return (
    <div className="dashboard-layout">
      <div className="dashboard-content contain">
        <header className="header">
        <img src={logo_ctos} alt="logo CTOS" style={{ width: '115px', height: '50px' }} />

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
