import React from 'react';
import { Table, Button, Typography, Space, Card } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import './FacturesJSX.css';

const { Title, Text } = Typography;

const FacturesJSX = () => {
  const dataSource = [
    {
      key: '1',
      date: '2024-08-01',
      designation: 'Achat Espace 20Go',
      quantity: 1,
      price: '20€',
      tva: '4€',
      total: '24€',
      client: {
        name: 'John Doe',
        address: '123 Rue de Paris, 75001 Paris, France',
      },
      company: {
        name: 'Ma Société',
        address: '456 Avenue des Champs-Élysées, 75008 Paris, France',
        siret: '123 456 789 00010',
      },
    },
  ];

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Désignation',
      dataIndex: 'designation',
      key: 'designation',
    },
    {
      title: 'Quantité',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Prix HT',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'TVA',
      dataIndex: 'tva',
      key: 'tva',
    },
    {
      title: 'Total TTC',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button icon={<DownloadOutlined />} type="primary">
          Télécharger
        </Button>
      ),
    },
  ];

  return (
    <div className="factures-container contain">
      <Title level={2} className="title">Mes Factures</Title>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        className="factures-table"
      />
      <Card className="factures-card">
        <Title level={4}>Informations Client</Title>
        <Text>Nom: {dataSource[0].client.name}</Text><br />
        <Text>Adresse: {dataSource[0].client.address}</Text>

        <Title level={4}>Informations Société</Title>
        <Text>Nom: {dataSource[0].company.name}</Text><br />
        <Text>Adresse: {dataSource[0].company.address}</Text><br />
        <Text>SIRET: {dataSource[0].company.siret}</Text>

        <Title level={4}>Détails de la Facture</Title>
        <Text>Date: {dataSource[0].date}</Text><br />
        <Text>Désignation: {dataSource[0].designation}</Text><br />
        <Text>Quantité: {dataSource[0].quantity}</Text><br />
        <Text>Prix Unitaire HT: {dataSource[0].price}</Text><br />
        <Text>Montant TVA: {dataSource[0].tva}</Text><br />
        <Text>Total TTC: {dataSource[0].total}</Text>
      </Card>
    </div>
  );
};

export default FacturesJSX;
