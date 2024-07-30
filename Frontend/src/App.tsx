import { useContext, useState, useEffect } from 'react'


import './App.css'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import NavBar from './components/NavBar'
import ThemeContext from './context/theme'
import UserContext, { UserProvider } from './context/user'
import { BrowserRouter,Routes, Route , Navigate} from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'


function App() {

  const [theme, setTheme] = useState('dark')
  const [loggedInId, setLoggedInId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [role, setRole] = useState("");
  const userCtx= useContext(UserContext);
  
  const handleTheme = () =>{
    if (theme === 'dark'){
        console.log("set theme light")
        setTheme('light')
    }
    else{
        console.log("set theme dark")
        setTheme('dark')
    }
}

const logg = () =>{
  console.log(loggedInId);
}

useEffect(() => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  if (accessToken) {
    const decoded = jwtDecode<any>(accessToken);
    setRole(decoded.role);
    setLoggedInId(decoded.loggedInId);
    setAccessToken(accessToken);
    setIsLoggedIn(true)
  }else {
    setRole("");
    setLoggedInId("");
    setAccessToken("");
}
  
}, [])

const userContextValue = {
  accessToken, 
  setAccessToken,
  role,
  setRole,
  loggedInId,
  setLoggedInId,
}

  // let isLoggedIn = !!accessToken;
  console.log(isLoggedIn);

  return (
    <>
    <ThemeContext.Provider value={theme}>
      <UserProvider value ={userContextValue}>
        <BrowserRouter>
        
    <div className={`app ${theme}`}>
      
    <NavBar handleTheme={handleTheme}></NavBar>
    <button onClick={logg}>Click</button>
    <Routes>
    <Route path = "/" element={isLoggedIn ? <Navigate to ="/HomePage"/> : <LandingPage/>}></Route>


    <Route path="/HomePage" element={<HomePage/>}></Route>
    <Route path="/LandingPage" element={<LandingPage/>}></Route>
    </Routes>
       
      </div>
      </BrowserRouter> 
      </UserProvider>
      </ThemeContext.Provider>
    </>
  )
}

export default App
