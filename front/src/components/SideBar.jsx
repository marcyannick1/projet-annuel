import React, {useContext, useState} from 'react';
import {
    ContainerOutlined,
    DesktopOutlined, FileTextOutlined, LogoutOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping, faHome} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import AuthContext from "../context/authContext.jsx";

const items = [
    {
        key: 'home',  // Clé unique pour l'élément Home
        icon: <FontAwesomeIcon icon={faHome} />,  // Icône Home
        label: <Link to="/">Home</Link>,
    },
    {
        key: '1',
        icon: <DesktopOutlined />,
        label: <Link to="/UsersJSX">Dashboard</Link>,
    },
    {
        key: '3',
        icon: <PieChartOutlined />,
        label: <Link to="/Statistiques">Statistiques</Link>,
    },
    {
        key: '2',
        icon: < ContainerOutlined/>,
        label: <Link to="/EspaceStockage">Espaces de Stockage</Link>,

    },
    {
        key: 'sub1',
        label: 'Messages',
        icon: <MailOutlined />,
        children: [
            {
                key: '5',
                label: 'Nouveaux Utilisateurs',
            },
            {
                key: '6',
                label: 'Création de nouveau compte',
            },
            {
                key: '7',
                label: 'Compte supprimé',
            },
            {
                key: '8',
                label: 'Changez votre mot de passe',
            },
        ],
    }
    ,{
        key: 'sub3',
        label: <Link to="/Factures">Mes factures</Link>,
        icon: <FileTextOutlined />, // Icône de factures d'Ant Design
    },
    {
        key: 'sub2',
        label: <Link to="/AchatEspace">Achat Espace</Link>,
        icon: <FontAwesomeIcon icon={faCartShopping} />, // Icône de panier d'achat
    },
    {
        key: 'logout', // Clé unique pour l'élément de déconnexion
        icon: <LogoutOutlined />, // Icône de déconnexion
        label: 'Logout',
        style: { position: 'absolute', bottom: 0} // Position en bas du menu
    },
];

const Sidebar = () => {
    const {logout} = useContext(AuthContext)
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const handleMenuClick = ({ key }) => {
        if (key === 'logout') {
            logout()
        }
    };
    return (
        <div
            style={{
                width: 256,
                position: "fixed",
                height: "100vh"
            }}
        >
            <Button
                type="primary"
                onClick={toggleCollapsed}
                style={{
                    marginBottom: 16,
                }}
            >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                onClick={handleMenuClick}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                items={items}
                style={{ position: "absolute", bottom: 0, height: '95%' }}
            />
        </div>
    );
};
export default Sidebar;