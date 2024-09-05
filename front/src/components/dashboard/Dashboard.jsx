import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleUser, faChevronDown, faChevronUp, faCartShopping, faHome} from '@fortawesome/free-solid-svg-icons';
import styles from './Dashboard.module.css';
import SideBar from "../SideBar.jsx";

const Dashboard = ({children}) => {
    const [roleVisible, setRoleVisible] = useState(false); // État pour la visibilité du rôle

    const toggleRoleVisibility = () => {
        setRoleVisible(!roleVisible); // Basculer la visibilité du rôle
    };

    return (
        <div className={styles.dashboardLayout}>
            <div className={styles.content}>
                <header className={styles.header}>
                    <div className={styles.searchBar}>
                        <input type="text" placeholder="Rechercher..."/>
                    </div>
                    <div className={styles.userInfo}>
            <span className={styles.userName} onClick={toggleRoleVisibility}>
              <FontAwesomeIcon icon={faCircleUser}/> mouakassarufus@gmail.com
              <FontAwesomeIcon icon={roleVisible ? faChevronUp : faChevronDown} className={styles.chevronIcon}/>
            </span>
                        {roleVisible && <span className={styles.userRole}>Admin &amp; Associate</span>}
                    </div>
                </header>
                <main>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
