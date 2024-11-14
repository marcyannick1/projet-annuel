import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faDatabase, faCloudArrowDown, faFolderOpen, faSackDollar } from '@fortawesome/free-solid-svg-icons';
import './AchatEspaceJSX.css';
import authContext from "../../context/authContext.jsx";
import { Button, Card, message, Typography } from 'antd';

const AchatEspace = () => {
  const { user } = useContext(authContext);
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);

    try {
      const subscription = await fetch("http://localhost:3000/subscription", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id })
      });

      console.log(await subscription.json());
      message.success('Achat effectué');
    } catch (error) {
      message.error("Une erreur est survenue lors de l'achat.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="achat-espace">
      {/* Icônes flottantes */}
      <FontAwesomeIcon icon={faDatabase} className="floating-icon icon-database" />
      <FontAwesomeIcon icon={faCloudArrowDown} className="floating-icon icon-cloud" />
      <FontAwesomeIcon icon={faFolderOpen} className="floating-icon icon-folder" />
      <FontAwesomeIcon icon={faSackDollar} className="floating-icon icon-sack-dollar" /> {/* Nouvelle icône ajoutée */}

      <Typography.Paragraph 
        style={{ 
          color: '#000', 
          fontSize: '26px', 
          textAlign: 'center', 
          marginTop: '30px', 
          fontWeight: 'bold',
          width: '650px'
        }}
      >
        <i className="fa-solid fa-circle-user" style={{ marginRight: '10px' }}></i>
        Bonjour <span style={{ color: '#1890ff' }}>{user?.firstName} {user?.lastName || 'RufusM'}</span>.
      </Typography.Paragraph>
      
      <Typography.Paragraph 
        style={{ 
          color: '#000', 
          fontSize: '36px', 
          textAlign: 'center', 
          marginTop: '30px', 
          fontWeight: 'bold',
          width: '500px'
        }}
      >
        Vous avez besoin de plus d'espace pour vos fichiers ? <span className='achetez-le-maintenant'> {<FontAwesomeIcon icon={faCartShopping} />} Achetez-le maintenant !</span>
      </Typography.Paragraph>
      
      <Card title="Acheter de l'Espace Supplémentaire" style={{
        width: 400,
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        padding: '20px'
      }}>
        <p>Coût: 20€ pour 20 Go de stockage supplémentaire</p>
        <Button
            type="primary"
            icon={<FontAwesomeIcon icon={faCartShopping}/>}
            loading={loading}
            onClick={handlePurchase}
        >
          Acheter Maintenant
        </Button>
      </Card>
    </div>
  );
};

export default AchatEspace;
