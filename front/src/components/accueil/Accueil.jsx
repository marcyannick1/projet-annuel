import React from 'react';
import {Card, Col, Row, Statistic, Divider, Button} from 'antd';
import {UserOutlined, FileOutlined, MessageOutlined, ArrowUpOutlined} from '@ant-design/icons';
import styles from './Accueil.module.css';

export default function Accueil() {
    return (
        <div className={`${styles.homePage} contain`}>
            <h2 className={styles.pageTitle}>Bienvenue sur le Dashboard</h2>
            <p className={styles.welcomeMessage}>Voici un aperçu rapide de vos activités récentes et des statistiques
                importantes.</p>

            <Row gutter={16}>
                <Col span={6}>
                    <Card style={{backgroundColor: '#e6f7ff', borderRadius: '8px'}}>
                        <Statistic
                            title="Utilisateurs Actifs"
                            value={1128}
                            prefix={<UserOutlined style={{color: '#1890ff'}}/>}
                            valueStyle={{color: '#1890ff'}}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card style={{backgroundColor: '#f0f9ff', borderRadius: '8px'}}>
                        <Statistic
                            title="Fichiers Uploadés"
                            value={32}
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

            <div>
                <h3>Accès Rapide</h3>
                <Row gutter={16}>
                    <Col span={6}>
                        <Button type="primary" block style={{backgroundColor: '#1890ff', borderColor: '#1890ff'}}>
                            <FileOutlined style={{color: '#fff'}}/> Voir les fichiers
                        </Button>
                    </Col>
                    <Col span={6}>
                        <Button type="default" block style={{borderColor: '#40a9ff'}}>
                            <MessageOutlined style={{color: '#40a9ff'}}/> Messages
                        </Button>
                    </Col>
                    <Col span={6}>
                        <Button type="default" block style={{borderColor: '#13c2c2'}}>
                            <UserOutlined style={{color: '#13c2c2'}}/> Utilisateurs
                        </Button>
                    </Col>
                    <Col span={6}>
                        <Button type="default" block style={{borderColor: '#faad14'}}>
                            <ArrowUpOutlined style={{color: '#faad14'}}/> Statistiques
                        </Button>
                    </Col>
                </Row>
            </div>

            <Divider/>

            <div className={styles.notifications}>
                <h3>Notifications</h3>
                <p>Vous avez 3 nouvelles notifications.</p>
            </div>
        </div>
    );
}
