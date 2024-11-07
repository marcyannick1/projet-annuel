import {Button, Menu} from "antd";
import {
    ContainerOutlined,
    DesktopOutlined, FileTextOutlined, LogoutOutlined, MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined
} from "@ant-design/icons";
import React, {useContext, useState} from "react";
import AuthContext from "../../context/authContext.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import {faCartShopping, faCircleUser, faHome} from "@fortawesome/free-solid-svg-icons";


const SideBar = () => {
    const { isSuperAdmin } = useContext(AuthContext); // Récupère l'état admin de l'utilisateur

    // Données du menu
    const items = [
        {
            key: 'home',
            icon: <FontAwesomeIcon icon={faHome} />,
            label: <Link to="/AccueilJSX">Home</Link>,
        },
        // Conditionner l'affichage de l'élément "Dashboard"
        isSuperAdmin && {
            key: '1',
            icon: <DesktopOutlined />,
            label: <Link to="/UsersJSX">Dashboard</Link>,
        },
        {
            key: '3',
            icon: <PieChartOutlined />,
            label: <Link to="/StatisitiquesJSX">Statistiques</Link>,
        },
        {
            key: '2',
            icon: <ContainerOutlined />,
            label: <Link to="/EspaceStockageJSX">Espaces de Stockage</Link>,
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
        },
        {
            key: 'sub3',
            label: <Link to="/FacturesJSX">Mes factures</Link>,
            icon: <FileTextOutlined />,
        },
        {
            key: 'sub2',
            label: <Link to="/AchatEspaceJSX">Achat Espace</Link>,
            icon: <FontAwesomeIcon icon={faCartShopping} />,
        },
        {
            key: 'user-profil',
            icon: <FontAwesomeIcon icon={faCircleUser} />,
            label: <Link to="/ProfilJSX">Voir mon Compte</Link>,
            style: { position: 'absolute', bottom: 42, width: '100%' }
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout',
            style: { position: 'absolute', bottom: 0, width: '100%' }
        },
    ].filter(Boolean); // Filtre les éléments undefined

    const { logout } = useContext(AuthContext); // Utilisation du contexte d'authentification

    const [collapsed, setCollapsed] = useState(false);

    const handleMenuClick = ({ key }) => {
        if (key === 'logout') {
            // Appel à la fonction de déconnexion
            logout();
        }
    };

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    
    return (
        <aside className="sidebar">
            <div>
                <Button
                    type="primary"
                    onClick={toggleCollapsed}
                    style={{
                        marginBottom: 16,
                        width: '100%',
                    }}
                >
                    {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                </Button>
                <Menu
                    onClick={handleMenuClick}
                    defaultSelectedKeys={['home']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={collapsed}
                    items={items}
                />
            </div>
        </aside>
    )
}

export default SideBar;
