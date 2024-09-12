import React, {useContext, useState} from 'react';
import {Button, Card, message, notification} from 'antd';
import {MailOutlined, FileOutlined} from '@ant-design/icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCartShopping} from '@fortawesome/free-solid-svg-icons';
import styles from './AchatEspace.module.css';
import authContext from "../../context/authContext.jsx"; // Assurez-vous d'ajouter ce fichier pour les styles personnalisés si nécessaire

const AchatEspace = () => {
    const {user} = useContext(authContext)
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
            })

            console.log(await subscription.json());
            message.success('Achat effectué');
        } catch (error) {
            message.error('Une erreur est survenue lors de l\'achat.');
        }finally {
            setLoading(false)
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
                >
                    Acheter Maintenant
                </Button>
            </Card>
        </div>
    );
};

export default AchatEspace;
