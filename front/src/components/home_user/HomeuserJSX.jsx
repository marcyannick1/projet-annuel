import React, { useContext } from 'react';
import { Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFileAlt, faUsers, faChartLine } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../context/authContext';
import './HomeUserJSX.css'; // Assurez-vous que le CSS est correctement importé

const { Paragraph } = Typography;

export default function HomeUserJSX() {
  const { user } = useContext(AuthContext); // Accéder à l'utilisateur via le contexte

  return (
    <div className="home-user-page">
      {/* Message de bienvenue */}
      <div className="welcome-message">
        <Paragraph
          style={{
            color: '#000',
            fontSize: '26px',
            textAlign: 'center',
            fontWeight: 'bold',
            marginTop: '30px',
          }}
        >
          <i className="fa-solid fa-circle-user" style={{ marginRight: '10px' }}></i>
          Bonjour <span style={{ color: '#1890ff' }}>@{user?.firstName || 'utilisateur'}</span>.
        </Paragraph>

        <Paragraph
          style={{
            color: '#000',
            fontSize: '20px',
            textAlign: 'center',
            marginTop: '20px',
          }}
        >
          Bienvenue dans votre espace personnel ! Explorez les fonctionnalités disponibles.
        </Paragraph>
      </div>

      {/* Icônes flottantes */}
      <FontAwesomeIcon
        icon={faHome}
        className="floating-icon icon-home"
        style={{ color: '#1890ff' }}
      />
      <FontAwesomeIcon
        icon={faFileAlt}
        className="floating-icon icon-files"
        style={{ color: '#40a9ff' }}
      />
      <FontAwesomeIcon
        icon={faUsers}
        className="floating-icon icon-users"
        style={{ color: '#13c2c2' }}
      />
      <FontAwesomeIcon
        icon={faChartLine}
        className="floating-icon icon-stats"
        style={{ color: '#faad14' }}
      />
    </div>
  );
}
