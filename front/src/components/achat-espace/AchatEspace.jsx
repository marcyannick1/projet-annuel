import React, {useState} from 'react';
import {Button, Card, message, notification} from 'antd';
import {MailOutlined, FileOutlined} from '@ant-design/icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCartShopping} from '@fortawesome/free-solid-svg-icons';
import styles from './AchatEspace.module.css'; // Assurez-vous d'ajouter ce fichier pour les styles personnalisés si nécessaire

const buttonStyles = {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
    color: '#fff',
};

const buttonHoverStyles = {
    backgroundColor: '#45a049',
    borderColor: '#45a049',
    color: '#fff',
};

const AchatEspace = () => {
    const [loading, setLoading] = useState(false);

    const handlePurchase = async () => {
        setLoading(true);
        try {
            // Simule l'achat
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Notification de confirmation
            notification.success({
                message: 'Achat Réussi',
                description: 'Votre espace de stockage a été augmenté de 20 Go. Une facture est maintenant disponible dans votre compte.',
                icon: <FileOutlined style={{color: '#4CAF50'}}/>,
            });

            // Simuler l'envoi d'un email (à intégrer avec un service réel)
            message.success('Un email de confirmation a été envoyé.');

            // Réinitialiser l'état
            setLoading(false);
        } catch (error) {
            message.error('Une erreur est survenue lors de l\'achat.');
            setLoading(false);
        }
    };

    return (
        <div className={styles.achatEspace}
             style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '20px' , marginLeft:'300px'}}>
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
                    style={buttonStyles}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = buttonHoverStyles.backgroundColor;
                        e.target.style.borderColor = buttonHoverStyles.borderColor;
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = buttonStyles.backgroundColor;
                        e.target.style.borderColor = buttonStyles.borderColor;
                    }}
                >
                    Acheter Maintenant
                </Button>
            </Card>
        </div>
    );
};

export default AchatEspace;
