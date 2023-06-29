import React from 'react';
import styles from './Header.module.css';
import Search from './Search';

const Header = () => {
    return (
        <div className={styles.header}>
            <Search />
        </div>
    )
}

export default Header;