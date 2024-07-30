import {useContext, useEffect, useState} from 'react';
import styles from "./css/NavBar.module.css"
import ThemeContext from '../context/theme';
import UserContext, {useUser} from '../context/user';
import { useNavigate } from 'react-router-dom';
interface NavBarProps {
    handleTheme: () => void;
  }
  

const NavBar: React.FC<NavBarProps> = (props) => {

    const userCtx = useUser();
    const theme = useContext(ThemeContext)
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (userCtx?.loggedInId && userCtx?.role) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [userCtx]);
    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("role");
        localStorage.removeItem("loggedInId");
        userCtx.setAccessToken("");
        userCtx.setRole("");
        userCtx.setLoggedInId("");
        navigate(`/LandingPage`);
        
    }


    return (
        <div className={`${styles.navBar} ${styles[theme]}`}>
            <button onClick={props.handleTheme}>Theme</button>
            {isLoggedIn && <button onClick={logout}>Logout</button>}
            {isLoggedIn && <button>Clock in</button>}
        </div>
    );
};

export default NavBar;