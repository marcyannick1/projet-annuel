import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Col, Row, Statistic, Divider, Button, Table } from 'antd';
import { UserOutlined, FileOutlined, MessageOutlined, ArrowUpOutlined } from '@ant-design/icons';
import './AccueilJSX.css';
import AuthContext from '../../context/authContext';

export default function AccueilJSX() {
  const { user } = useContext(AuthContext);
  const [isSubscribed, setIsSubscribed] = useState(false); // État pour vérifier l'abonnement
  const [subscriptions, setSubscriptions] = useState([]); // Stocke les abonnements de l'utilisateur
  const navigate = useNavigate();

  // Colonnes pour le tableau des abonnements (si besoin)
  const columns = [
    { title: 'ID Abonnement', dataIndex: 'id', key: 'id' },
    { title: 'Date de Création', dataIndex: 'createdAt', key: 'createdAt' },
  ];

  // Vérifiez l'état de connexion et redirigez si nécessaire
  useEffect(() => {

    // Fonction pour vérifier si l'utilisateur a un abonnement
    const fetchSubscription = async () => {
      try {
        const response = await fetch(`http://localhost:3000/subscription/${user.id}`);
        const data = await response.json();

        if (data.length > 0) {
          setIsSubscribed(true);
          setSubscriptions(data); // Met à jour les abonnements
        } else {
          // Redirige vers la page SubscriptionJSX si l'utilisateur n'a pas d'abonnement
          navigate("/SubscriptionJSX");
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des abonnements:', error);
      }
    };

    fetchSubscription();
  }, [user, navigate]);

  return (
    <div className='home-page contain'>
      <h2 className='page-title'>Bienvenue sur le Dashboard</h2>
      <p className='welcome-message'>Voici un aperçu rapide de vos activités récentes et des statistiques importantes.</p>
      
      {isSubscribed ? (
        <>
          {/* Afficher les statistiques et les éléments de la page d'accueil */}
          <Row gutter={16}>
            <Col span={6}>
              <Card className='ant-card' style={{ backgroundColor: '#e6f7ff', borderRadius: '8px' }}>
                <Statistic
                  title="Utilisateurs Actifs"
                  value={1128}
                  prefix={<UserOutlined style={{ color: '#1890ff' }} />}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card style={{ backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
                <Statistic
                  title="Fichiers Uploadés"
                  value={32}
                  prefix={<FileOutlined style={{ color: '#40a9ff' }} />}
                  valueStyle={{ color: '#40a9ff' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card style={{ backgroundColor: '#e6fffb', borderRadius: '8px' }}>
                <Statistic
                  title="Messages Non Lu"
                  value={8}
                  prefix={<MessageOutlined style={{ color: '#13c2c2' }} />}
                  valueStyle={{ color: '#13c2c2' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card style={{ backgroundColor: '#fffbe6', borderRadius: '8px' }}>
                <Statistic
                  title="Taux de Croissance"
                  value={4.5}
                  precision={2}
                  prefix={<ArrowUpOutlined style={{ color: '#faad14' }} />}
                  valueStyle={{ color: '#faad14' }}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>

          <Divider />

          <div className='quick-access'>
            <h3>Accès Rapide</h3>
            <Row gutter={16}>
              <Col span={6}>
                <Link to="/EspaceStockageJSX">
                  <Button type="primary" block style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}>
                    <FileOutlined style={{ color: '#fff' }} /> Voir les fichiers
                  </Button>
                </Link>
              </Col>
              <Col span={6}>
                <Button type="default" block style={{ borderColor: '#40a9ff' }}>
                  <MessageOutlined style={{ color: '#40a9ff' }} /> Messages
                </Button>
              </Col>
              <Col span={6}>
                <Link to="/UsersJSX">
                  <Button type="default" block style={{ borderColor: '#13c2c2' }}>
                    <UserOutlined style={{ color: '#13c2c2' }} /> Utilisateurs
                  </Button>
                </Link>
              </Col>
              <Col span={6}>
                <Link to="/StatisitiquesJSX">
                  <Button type="default" block style={{ borderColor: '#faad14' }}>
                    <ArrowUpOutlined style={{ color: '#faad14' }} /> Statistiques
                  </Button>
                </Link>
              </Col>
            </Row>
          </div>

          <Divider />

          <div className='notifications'>
            <h3>Notifications</h3>
            <p>Vous avez 3 nouvelles notifications.</p>
          </div>
        </>
      ) : (
        // Redirection déjà gérée dans useEffect
        null
      )}
    </div>
  );
}
