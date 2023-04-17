import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeContext } from './context/theme.context';
import { Provider } from "react-redux";
import { store } from './stores/store';

import Navbar from "./components/NavBar/Navbar";
import Home from './pages/Home/Home';
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";

import "./style.scss"
import Profile from "./pages/Profil/Profile";

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const changeTheme = () => {
    if(theme === "light"){
      setTheme("dark")
      localStorage.setItem("theme", "dark")
    } 
    else{
      setTheme("light")
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <div className="app" id={theme}>
       <ThemeContext.Provider value={{theme: theme, changeTheme: changeTheme}}>
        <Provider store={store}>
          <Router>
            <Navbar/>
            <Routes>
              <Route path='*' element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/signin' element={<Signin />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/me' element={<Profile />} />
              <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
          </Router>
        </Provider>
      </ThemeContext.Provider>
    </div>
  )
}

export default App
