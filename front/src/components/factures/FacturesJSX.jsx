import React, {useContext, useEffect, useState} from 'react';
import {Table, Button, Typography} from 'antd';
import {DownloadOutlined} from '@ant-design/icons';
import './FacturesJSX.css';
import authContext from "../../context/authContext.jsx";
import {PDFDownloadLink, PDFViewer} from "@react-pdf/renderer";
import FacturePDF from "./FacturePDF.jsx";

const {Title} = Typography;

const Factures = () => {
    const {user} = useContext(authContext);
    const [subscriptions, setSubscriptions] = useState([]);

    const columns = [
        {
            title: "Date",
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => new Date(date).toLocaleDateString(),
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        },
        {
            title: 'Désignation',
            dataIndex: 'designation',
            key: 'designation',
            render: () => (<p>Achat Stockage 20Go</p>)
        },
        {
            title: 'Quantité',
            dataIndex: 'quantity',
            key: 'quantity',
            render: () => (<p>1</p>)
        },
        {
            title: 'Prix HT',
            dataIndex: 'price',
            key: 'price',
            render: () => (<p>16,67€</p>)
        },
        {
            title: 'TVA',
            dataIndex: 'tva',
            key: 'tva',
            render: () => (<p>3,33€</p>)
        },
        {
            title: 'Total TTC',
            dataIndex: 'total',
            key: 'total',
            render: () => (<p>20€</p>)
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <PDFDownloadLink
                    document={<FacturePDF user={user} subscription={record}/>
                    }
                    fileName={`facture ${new Date(record.createdAt).toLocaleDateString()}.pdf`}
                >
                    <Button icon={<DownloadOutlined/>} type="primary">
                        Télecharger
                    </Button>
                </PDFDownloadLink>
            ),
        },
    ];

    useEffect(() => {
        const fetchSubscriptions = async () => {
            const subscriptions = await fetch(`http://localhost:3000/subscription/${user.id}`)
            const data = await subscriptions.json();
            console.log(data)

            data.length ? setSubscriptions(data) : null
        };

        fetchSubscriptions()
    }, [user]);

    return (
        <div className="factures_container contain">
            <Title level={2}>Mes Factures</Title>
            <Table
                dataSource={subscriptions}
                columns={columns}
                pagination={false}
                style={{marginTop: 20, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}
            />
            {/* Plus d'informations sur la facture */}
            {/*<Space direction="vertical" style={{marginTop: 40}}>*/}
            {/*    <Title level={4}>Informations Client</Title>*/}
            {/*    <p>Nom: {dataSource[0].client.name}</p>*/}
            {/*    <p>Adresse: {dataSource[0].client.address}</p>*/}

            {/*    <Title level={4}>Informations Société</Title>*/}
            {/*    <p>Nom: {dataSource[0].company.name}</p>*/}
            {/*    <p>Adresse: {dataSource[0].company.address}</p>*/}
            {/*    <p>SIRET: {dataSource[0].company.siret}</p>*/}

            {/*    <Title level={4}>Détails de la Facture</Title>*/}
            {/*    <p>Date: {dataSource[0].date}</p>*/}
            {/*    <p>Désignation: {dataSource[0].designation}</p>*/}
            {/*    <p>Quantité: {dataSource[0].quantity}</p>*/}
            {/*    <p>Prix Unitaire HT: {dataSource[0].price}</p>*/}
            {/*    <p>Montant TVA: {dataSource[0].tva}</p>*/}
            {/*    <p>Total TTC: {dataSource[0].total}</p>*/}
            {/*</Space>*/}
        </div>
    );
};

export default Factures;
