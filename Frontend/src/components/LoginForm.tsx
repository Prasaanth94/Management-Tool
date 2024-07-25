
import { useContext, useRef, useState } from 'react';
import styles from './css/LoginForm.module.css';
import ThemeContext from '../context/theme';
import { jwtDecode } from 'jwt-decode';
import UserContext from '../context/user';
import useFetch from './hooks/useFetch';

const LoginForm = () => {

    const theme = useContext(ThemeContext)
    const userNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const userCtx = useContext(UserContext);
    const fetchData = useFetch();

    const login = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const username = userNameRef.current?.value;
        const hash = passwordRef.current?.value;

        try {
            const res = await fetchData("/auth/login", "POST", {username, hash});

            if(res.ok){
                const {access, refresh} = res.data;
                const decoded = jwtDecode<any>(access);
                localStorage.setItem("accessToken", access);
                localStorage.setItem("refreshToken", refresh);

                userCtx?.setAccessToken(access);
                userCtx?.setRole(decoded.role);
                userCtx?.setLoggedInId(decoded.loggedInId);
            }else {
                alert(`Error: ${JSON.stringify(res.data)}`);
            }
        } catch(error) {
            console.error("login error", error);
        }
    };

    return (
        <div className={styles.loginForm}>
            <label className={styles.label}>Username:</label>
            <input className={styles.input} type="text" id="username" ref={userNameRef} />
            <label className={styles.label}>Password:</label>
            <input className={styles.input} type="password"  id="password" ref={passwordRef}/>
            <button className={`${styles.loginButton} ${styles[theme]}`} onClick={login}>Login</button>
        </div>
    );
};

export default LoginForm;