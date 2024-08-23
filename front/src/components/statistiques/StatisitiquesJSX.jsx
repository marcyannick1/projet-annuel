import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Statistic, Typography, Table, Empty } from 'antd';
import { FileOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { Pie } from '@ant-design/plots';
import './StatisitiquesJSX.css';

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

const StatistiquesJSX = () => {
  const [data, setData] = useState(mockData);

  // Simuler le chargement des données
  useEffect(() => {
    // Simuler un appel API ou une autre source de données
    setData(mockData);
  }, []);

  const { totalFiles, filesToday, filesByClient } = data;

  // Colonnes pour le tableau de répartition des fichiers
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
    <div className='statistiques contain'>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 20 }}>Statistiques</Title>
      <Row gutter={16}>
        <Col span={8}>
          <Card  style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Statistic
              title="Total des Fichiers Uploadés"
              value={totalFiles}
              prefix={<FileOutlined />}
             
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card  style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Statistic
              title="Fichiers Uploadés Aujourd'hui"
              value={filesToday}
              prefix={<CalendarOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card  style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Statistic
              title="Répartition par Client"
              value={filesByClient.reduce((acc, client) => acc + client.files, 0)}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={12}>
          <Card title="Répartition des Fichiers par Client">
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
