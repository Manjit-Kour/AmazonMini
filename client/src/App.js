import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import SellerCenter from './pages/SellerCenter';
import AddProducts from './pages/AddProducts';

function App() {

  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path='/'element={<><Navbar/><Home/></>}/>
        <Route path='/Register'element={<Register/>}/>
        <Route path='/Login'element={<Login/>}/>
        <Route path='/Seller' element={<><Navbar/><SellerCenter/></>}/>
        <Route path='/add' element={<><Navbar/><AddProducts/></>}/>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
