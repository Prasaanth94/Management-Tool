import React from 'react';

import {useUser} from '../context/user';
import styles from './css/HomePage.module.css'



const HomePage: React.FC = () => {

    const userCtx = useUser();

    const logg = () =>{
    if(userCtx) {
        console.log("loggedinid:", userCtx.loggedInId);
    } else{
        console.error("User Context not available")
    }
    }

    return (
        <div className={styles.Homepage}>
            <h1>HOME PAGE</h1>
            <button onClick={logg}>CLick</button>
        </div>
    );
};

export default HomePage;