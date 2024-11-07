import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Statistic, Typography, Table, Empty, message } from 'antd';
import { FileOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { Pie } from '@ant-design/plots';
import './StatisitiquesJSX.css';

const { Title } = Typography;

const StatistiquesJSX = () => {
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
    return <div className="statistiques contain"><Empty description="Aucune donnée disponible" /></div>;
  }

  const { totalUsers, totalFiles, filesToday, filesByClient } = data;

  // Colonnes pour le tableau de répartition des fichiers
  const columns = [
    {
      title: 'Client',
      dataIndex: 'user',
      key: 'client',
    },
    {
      title: 'Nombre de Fichiers',
      dataIndex: 'files',
      key: 'files',
    },
  ];

  return (
      <div className="statistiques contain">
        <Title level={2} style={{ textAlign: 'center', marginBottom: 20 }}>Statistiques</Title>
        <Row gutter={16}>
          <Col span={8}>
            <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <Statistic
                  title="Total des Fichiers Uploadés"
                  value={totalFiles}
                  prefix={<FileOutlined />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <Statistic
                  title="Fichiers Uploadés Aujourd'hui"
                  value={filesToday}
                  prefix={<CalendarOutlined />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <Statistic
                  title="Nombre d'utilisateurs"
                  value={totalUsers}
                  prefix={<UserOutlined />}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: 20 }}>
          <Col span={12}>
            <Card title="Répartition des Fichiers par Client" style={{ height: "600px" }}>
              {filesByClient.length > 0 ? (
                  <Pie
                      data={filesByClient.map(client => ({
                        type: client.user.toString(),
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
                      style={{ height: 300 }}
                  />
              ) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Aucune donnée disponible" />
              )}
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Détails par Client">
              {filesByClient.length > 0 ? (
                  <Table
                      columns={columns}
                      dataSource={filesByClient}
                      pagination={false}
                      rowKey="client"
                  />
              ) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Aucune donnée disponible" />
              )}
            </Card>
          </Col>
        </Row>
      </div>
  );
};

export default StatistiquesJSX;
