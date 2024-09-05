import React from 'react';
import {Table, Button, Typography, Space} from 'antd';
import {DownloadOutlined, FileTextOutlined} from '@ant-design/icons';
import styles from './Factures.module.css';

const {Title} = Typography;

const Factures = () => {
    // Exemple de données de facture
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
        // Ajouter plus de factures si nécessaire
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
                <Button icon={<DownloadOutlined/>} type="primary">
                    Télécharger
                </Button>
            ),
        },
    ];

    return (
        <div className={`${styles.factures_container} contain`}>
            <Title level={2}>Mes Factures</Title>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                style={{marginTop: 20, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}
            />
            {/* Plus d'informations sur la facture */}
            <Space direction="vertical" style={{marginTop: 40}}>
                <Title level={4}>Informations Client</Title>
                <p>Nom: {dataSource[0].client.name}</p>
                <p>Adresse: {dataSource[0].client.address}</p>

                <Title level={4}>Informations Société</Title>
                <p>Nom: {dataSource[0].company.name}</p>
                <p>Adresse: {dataSource[0].company.address}</p>
                <p>SIRET: {dataSource[0].company.siret}</p>

                <Title level={4}>Détails de la Facture</Title>
                <p>Date: {dataSource[0].date}</p>
                <p>Désignation: {dataSource[0].designation}</p>
                <p>Quantité: {dataSource[0].quantity}</p>
                <p>Prix Unitaire HT: {dataSource[0].price}</p>
                <p>Montant TVA: {dataSource[0].tva}</p>
                <p>Total TTC: {dataSource[0].total}</p>
            </Space>
        </div>
    );
};

export default Factures;
