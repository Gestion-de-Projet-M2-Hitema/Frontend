import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeContext } from './context/theme.context';
import { Provider } from "react-redux";
import { store } from './stores/store';

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/NavBar/Navbar";
import Home from './pages/Home/Home';
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import ServerParameters from "./components/ServerParameters/ServerParameters";
import Chat from "./components/Chat/Chat";
import Profile from "./pages/Profil/Profile";
import UserServerRequest from "./components/UserServerRequest/UserServerRequest";
import ServerRequest from "./components/ServerRequest/ServerRequest";

import "./style.scss"
import { FriendChat } from "./pages/FriendChat/FriendChat";


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
              {/* <Route path='/me' element={<ProtectedRoute><Profile/></ProtectedRoute>} /> */}
              <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}>
                <Route index element={<ServerParameters />}/>
                <Route path='/dashboard/me' element={<Profile/>}/>
                <Route path='/dashboard/friends' element={<FriendChat />}/>
                <Route path='/dashboard/explore' element={<UserServerRequest />}/>
                <Route path='/dashboard/chat' element={<Chat />}/>
                <Route path='/dashboard/userRequests' element={<ServerRequest />}/>
              </Route>
            </Routes>
          </Router>
        </Provider>
      </ThemeContext.Provider>
    </div>
  )
}



export default App
