import React, { useContext, useState } from 'react';
import { Button, Card, message, Typography, Divider } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; 
import AuthContext from '../../context/authContext';
import './SubscriptionJSX.css';

// Importer le logo de l'entreprise
import companyLogo from '../../assets/logo_ctos.png'; // Assurez-vous d'avoir ce fichier
import subscriptionImage from '../../assets/image_gif.png'; // Assurez-vous d'avoir ce fichier

const { Title, Paragraph } = Typography;

const SubscriptionJSX = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handlePurchase = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      });

      const result = await response.json();
      console.log(result);
      message.success('Achat effectué avec succès! Retrouvez votre facture dans "Mes Factures".');
      
      // Naviguer vers la page d'accueil avec un rafraîchissement
      navigate('/AccueilJSX');
    } catch (error) {
      message.error('Une erreur est survenue lors de l\'achat.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="subscription-page">
      <div className="left-side">
        <img src={subscriptionImage} alt="Subscription" className="subscription-image" />
      </div>
      <div className="right-side">
        <Card
          bordered={false}
          style={{
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center',
            width: '100%',
            maxWidth: '400px',
            position: 'relative'
          }}
        >
          <img src={companyLogo} alt="Company Logo" className="company-logo" />
          <Title level={4} style={{ marginTop: '10px' }}>Achat Abonnement 20Gb</Title>
          <Divider />
          <div className="invoice-details">
            <Paragraph>
              <strong>Quantité :</strong> 1
            </Paragraph>
            <Paragraph>
              <strong>Prix HT :</strong> 16.67€
            </Paragraph>
            <Paragraph>
              <strong>Taxe (20%) :</strong> 3.33€
            </Paragraph>
            <Paragraph>
              <strong>Total TTC :</strong> 20.00€
            </Paragraph>
          </div>
          <Divider />
          <Button
            type="primary"
            icon={<FontAwesomeIcon icon={faCartShopping} />}
            loading={loading}
            onClick={handlePurchase}
            style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
          >
            Acheter Maintenant
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionJSX;
