import {useContext} from 'react';
import styles from "./css/NavBar.module.css"
import ThemeContext from '../context/theme';

interface NavBarProps {
    handleTheme: () => void;
  }
  

const NavBar: React.FC<NavBarProps> = (props) => {

    const theme = useContext(ThemeContext)


    return (
        <div className={`${styles.navBar} ${styles[theme]}`}>
            <button onClick={props.handleTheme}>Theme</button>
        </div>
    );
};

export default NavBar;