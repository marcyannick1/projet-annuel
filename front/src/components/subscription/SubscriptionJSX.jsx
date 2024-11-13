import React, { useContext, useState } from 'react';
import { Button, Card, message, Typography, Divider } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; 
import AuthContext from '../../context/authContext';
import './SubscriptionJSX.css';

// Importer le logo de l'entreprise
import companyLogo from '../../assets/logo_ctos.png';
import subscriptionImage from '../../assets/image_gif.png';

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
      
      navigate('/AccueilJSX');
    } catch (error) {
      message.error('Une erreur est survenue lors de l\'achat.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="subscription-page">
      {/* Message en dehors de la card */}
      <Typography.Paragraph 
        style={{ 
          color: '#000', 
          fontSize: '38px', 
          textAlign: 'center', 
          marginTop: '30px', 
          fontWeight: 'bold',
          width: '750px'
        }}
      >
        Un abonnement est nécessaire pour profiter pleinement de l'application. Achetez-le maintenant !
      </Typography.Paragraph>

      <div className="left-side">
        <img src={subscriptionImage} alt="Subscription" className="subscription-image" />
      </div>
      
      <div className="right-side">
        <Card
          bordered={false}
          style={{
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
            borderRadius: '15px',
            padding: '30px',
            textAlign: 'center',
            width: '100%',
            maxWidth: '400px',
            position: 'relative',
            backgroundColor: '#f9f9f9',
          }}
        >
          <img src={companyLogo} alt="Company Logo" className="company-logo" />
          <Title level={4} style={{ marginTop: '15px', color: '#1890ff' }}>Achat Abonnement 20Gb</Title>
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
            style={{
              backgroundColor: '#1890ff',
              borderColor: '#1890ff',
              borderRadius: '30px',
              padding: '10px 20px',
              fontSize: '16px',
              width: '100%',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#40a9ff'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#1890ff'}
          >
            Acheter Maintenant
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionJSX;
