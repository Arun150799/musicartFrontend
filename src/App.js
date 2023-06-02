import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Listing from './components/Listing';
import SignUp from './components/SignUp';
import Login from './components/Login';
import ProtectiveRoute from './components/ProtectiveRoute';
import ViewCart from './components/ViewCart';
import AddToCart from './components/AddToCart';
import BuyNow from './components/BuyNow';
import SuccessFull from './components/SuccessFull';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      
      <Routes>

        <Route element={<ProtectiveRoute />}>
       <Route path='/addtocart' element={<AddToCart/>} />
       <Route path='/buyNow' element={<BuyNow/>} />
       <Route path='/success' element={<SuccessFull/>} />

        </Route>

        <Route path='/' element={<Listing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/viewCart/:id' element={<ViewCart/>}/>

      </Routes>
       </BrowserRouter> 
      </div>
  );
}

export default App;
