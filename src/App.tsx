import Home from './pages/Home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/Home/Auth/Auth';
import { Provider } from "react-redux";
import { store } from './stores/store';

const App = () => {

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
            </Routes>
          </Router>
        </Provider>
      </ThemeContext.Provider>
    </div>
  )
}

export default App
