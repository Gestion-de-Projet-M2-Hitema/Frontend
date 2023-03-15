import Home from './pages/Home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/Home/Auth/Auth';
import { Provider } from "react-redux";
import { store } from './stores/store';

const App = () => {

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path='*' element={<Home />} />
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/auth' element={<Auth />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  )
}

export default App
