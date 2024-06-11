import { useState } from 'react'


import './App.css'
import LandingPage from './pages/LandingPage'
import NavBar from './components/NavBar'
import ThemeContext from './context/theme'

function App() {

  const [theme, setTheme] = useState('dark')
  
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

  console.log(theme)

  return (
    <>
    <ThemeContext.Provider value={theme}>
    <div className={`app ${theme}`}>
    <NavBar handleTheme={handleTheme}></NavBar>
      <LandingPage></LandingPage>   
      </div> 
      </ThemeContext.Provider>
    </>
  )
}

export default App
