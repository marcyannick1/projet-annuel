import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Statistic, Typography, Table, Empty } from 'antd';
import { FileOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { Pie } from '@ant-design/plots';
import styles from './Statistiques.module.css';

const { Title } = Typography;

const mockData = {
    totalFiles: 1200,
    filesToday: 50,
    filesByClient: [
        { client: 'Client A', files: 400 },
        { client: 'Client B', files: 300 },
        { client: 'Client C', files: 250 },
        { client: 'Client D', files: 150 },
    ],
};

const Statistiques = () => {
    const [data, setData] = useState(mockData);

    useEffect(() => {
        setData(mockData);
    }, []);

    const { totalFiles, filesToday, filesByClient } = data;

    const columns = [
        {
            title: 'Client',
            dataIndex: 'client',
            key: 'client',
        },
        {
            title: 'Nombre de Fichiers',
            dataIndex: 'files',
            key: 'files',
        },
    ];

    return (
        <div className={`${styles.statistiques} contain`}>
            <Title level={2} className={styles.pageTitle}>Statistiques</Title>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={8}>
                    <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <Statistic
                            title="Total des Fichiers Uploadés"
                            value={totalFiles}
                            prefix={<FileOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                    <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <Statistic
                            title="Fichiers Uploadés Aujourd'hui"
                            value={filesToday}
                            prefix={<CalendarOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                    <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <Statistic
                            title="Répartition par Client"
                            value={filesByClient.reduce((acc, client) => acc + client.files, 0)}
                            prefix={<UserOutlined />}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
                <Col xs={24} lg={12}>
                    <Card title="Répartition des Fichiers par Client" className={styles.rectangleCard}>
                        {filesByClient.length > 0 ? (
                            <Pie
                                data={filesByClient.map(client => ({
                                    type: client.client,
                                    value: client.files,
                                }))}
                                angleField="value"
                                colorField="type"
                                radius={0.8}
                                innerRadius={0.6}
                                padding="auto"
                                statistic={{
                                    title: {
                                        formatter: () => 'Répartition',
                                    },
                                }}
                                style={{ height: '300px' }}
                            />
                        ) : (
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Aucune donnée disponible" />
                        )}
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <div className={styles.detailsContainer}>
                        <h3 className={styles.detailsTitle}>Détails par Client</h3>
                        {filesByClient.length > 0 ? (
                            <Table
                                columns={columns}
                                dataSource={filesByClient}
                                pagination={false}
                                rowKey="client"
                                scroll={{ x: 'max-content' }}
                            />
                        ) : (
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Aucune donnée disponible" />
                        )}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Statistiques;