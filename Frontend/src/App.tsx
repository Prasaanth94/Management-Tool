import { useContext, useState } from 'react'


import './App.css'
import LandingPage from './pages/LandingPage'
import NavBar from './components/NavBar'
import ThemeContext from './context/theme'
import UserContext, { UserProvider } from './context/user'
import { BrowserRouter,Routes, Route } from 'react-router-dom'

function App() {

  const [theme, setTheme] = useState('dark')
  const [loggedInId, setLoggedInId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [role, setRole] = useState("");
  const userCtx = useContext(UserContext);
  
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

const userContextValue = {
  accessToken, 
  setAccessToken,
  role,
  setRole,
  loggedInId,
  setLoggedInId,
}



  console.log(theme)

  return (
    <>
    <ThemeContext.Provider value={theme}>
      <UserProvider value ={userContextValue}>
        <BrowserRouter>
        
    <div className={`app ${theme}`}>
    <NavBar handleTheme={handleTheme}></NavBar>
    <Routes>
    <Route path = "/" element={<LandingPage/>}></Route>
    </Routes>
       
      </div>
      </BrowserRouter> 
      </UserProvider>
      </ThemeContext.Provider>
    </>
  )
}

export default App
