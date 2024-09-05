import React from 'react';
import styles from './Background.module.css'; // Assurez-vous d'importer le fichier CSS

export default function Background() {
    return (
        <div className={styles.background}>
            <div className={styles.blue}></div>
            <div className={styles.white}></div>
        </div>
    );
}
