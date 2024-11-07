import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom'; // Importer Link de react-router-dom
import {Card, Col, Row, Statistic, Divider, Button, message, Empty} from 'antd';
import {UserOutlined, FileOutlined, MessageOutlined, ArrowUpOutlined} from '@ant-design/icons';
import './AccueilJSX.css';

export default function AccueilJSX() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Appel API pour récupérer les données
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/stats'); // Remplacez par votre URL API
                if (!response.ok) {
                    throw new Error(`Erreur: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                message.error('Impossible de charger les données.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="statistiques contain"><p>Chargement des données...</p></div>;
    }

    if (!data) {
        return <div className="statistiques contain"><Empty description="Aucune donnée disponible"/></div>;
    }

    const {totalUsers, totalFiles} = data;
    return (
        <div className='home-page contain'>
            <h2 className='page-title'>Bienvenue sur le Dashboard</h2>
            <p className='welcome-message'>Voici un aperçu rapide de vos activités récentes et des statistiques
                importantes.</p>

            <Row gutter={16}>
                <Col span={6}>
                    <Card className='ant-card' style={{backgroundColor: '#e6f7ff', borderRadius: '8px'}}>
                        <Statistic
                            title="Utilisateurs Actifs"
                            value={totalUsers}
                            prefix={<UserOutlined style={{color: '#1890ff'}}/>}
                            valueStyle={{color: '#1890ff'}}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card style={{backgroundColor: '#f0f9ff', borderRadius: '8px'}}>
                        <Statistic
                            title="Fichiers Uploadés"
                            value={totalFiles}
                            prefix={<FileOutlined style={{color: '#40a9ff'}}/>}
                            valueStyle={{color: '#40a9ff'}}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card style={{backgroundColor: '#e6fffb', borderRadius: '8px'}}>
                        <Statistic
                            title="Messages Non Lu"
                            value={8}
                            prefix={<MessageOutlined style={{color: '#13c2c2'}}/>}
                            valueStyle={{color: '#13c2c2'}}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card style={{backgroundColor: '#fffbe6', borderRadius: '8px'}}>
                        <Statistic
                            title="Taux de Croissance"
                            value={4.5}
                            precision={2}
                            prefix={<ArrowUpOutlined style={{color: '#faad14'}}/>}
                            valueStyle={{color: '#faad14'}}
                            suffix="%"
                        />
                    </Card>
                </Col>
            </Row>

            <Divider/>

            <div className='quick-access'>
                <h3>Accès Rapide</h3>
                <Row gutter={16}>
                    <Col span={6}>
                        <Link to="/EspaceStockageJSX"> {/* Utilise Link pour créer un lien vers la route */}
                            <Button type="primary" block style={{backgroundColor: '#1890ff', borderColor: '#1890ff'}}>
                                <FileOutlined style={{color: '#fff'}}/> Voir les fichiers
                            </Button>
                        </Link>

                    </Col>
                    <Col span={6}>
                        <Button type="default" block style={{borderColor: '#40a9ff'}}>
                            <MessageOutlined style={{color: '#40a9ff'}}/> Messages
                        </Button>
                    </Col>
                    <Col span={6}>
                        <Link to="/UsersJSX"> {/* Utilise Link pour créer un lien vers la route */}
                            <Button type="default" block style={{borderColor: '#13c2c2'}}>
                                <UserOutlined style={{color: '#13c2c2'}}/> Utilisateurs
                            </Button>
                        </Link>

                    </Col>
                    <Col span={6}>


                        <Link to="/StatisitiquesJSX"> {/* Utilise Link pour créer un lien vers la route */}
                            <Button type="default" block style={{borderColor: '#faad14'}}>
                                <ArrowUpOutlined style={{color: '#faad14'}}/> Statistiques
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </div>

            <Divider/>

            <div className='notifications'>
                <h3>Notifications</h3>
                <p>Vous avez 3 nouvelles notifications.</p>
            </div>
        </div>
    );
}
