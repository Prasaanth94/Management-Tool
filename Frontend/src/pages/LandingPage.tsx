import React from 'react';
import styles from './css/LandingPage.module.css'
import LoginForm from '../components/LoginForm';

const LandingPage = () => {
    return (
        <div className={styles.landingPage}>
            <h1>Management Tool</h1>
            <LoginForm></LoginForm>
        </div>
    );
};

export default LandingPage;