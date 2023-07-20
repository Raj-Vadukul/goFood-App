import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from './screen/Home';
import Login from './screen/Login';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SignUp from './screen/SignUp';
import { CartProvider } from './components/ContexReducer';
import MyOrder from './screen/MyOrder';

function App() {
  return (
    <CartProvider>
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/SignUp' element={<SignUp />} />
          <Route exact path='/myOrder' element={<MyOrder />} />
        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
