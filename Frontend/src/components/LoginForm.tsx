
import { useContext } from 'react';
import styles from './css/LoginForm.module.css';
import ThemeContext from '../context/theme';

const LoginForm = () => {

    const theme = useContext(ThemeContext)

    return (
        <div className={styles.loginForm}>
            <label className={styles.label}>Username:</label>
            <input className={styles.input} type="text" />
            <label className={styles.label}>Password:</label>
            <input className={styles.input} type="password" />
            <button className={`${styles.loginButton} ${styles[theme]}`}>Login</button>
        </div>
    );
};

export default LoginForm;