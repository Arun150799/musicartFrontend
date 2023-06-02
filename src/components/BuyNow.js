import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import img3 from '../assets/image1.png';
import cart from '../assets/myCart.png';
import rupess from '../assets/rupees.png';
import { Link, useNavigate, useParams } from 'react-router-dom';

const BuyNow = () => {
  const [cardId, setCardId] = useState('');
  const [cardProduct, setCardProduct] = useState({});
  const navigate = useNavigate('');
  const [productName,setProductName] = useState([])

  useEffect(() => {
    

    const productName = localStorage.getItem('productName');
    if (productName) {
      setProductName(productName);
    }
    console.log(productName);
  }
  )

  useEffect(() => {
    handleCarts();
  }, []);

  const handleCarts = async () => {
    let result = await fetch('http://localhost:6900/productList');
    result = await result.json();
    console.log(result);
    let result2 = await fetch('http://localhost:6900/getBuyNow');
    result2 = await result2.json();
    console.log(result2);
    
    result2.forEach(data => {
      data.cardId.forEach(card => {
        const cardProduct = result.find(product => product._id === card.cardId);
        if(cardProduct || !cardProduct){
        setCardProduct(cardProduct);
        setCardId(card.cardId);
        }
      });
    });
  };
  console.log(cardProduct);

  const handleBackButton1 = () => {
    navigate('/');
  };

  const handlePlaceOrder = () => {
    navigate('/success');
  };

  const handlePlacingOrder = () => {
    navigate('/success');
  };

  return (
    <div className='buyCart'>
      <Nav />

      <nav aria-label='breadcrumb'>
        <ol class='breadcrumb'>
          <li class='breadcrumb-item active' aria-current='page'>
            <a href='/'>Home</a>
          </li>
          <li class='breadcrumb-item active' aria-current='page'>
            <a href='/'>{productName}</a>
          </li>
          <li class='breadcrumb-item active' aria-current='page'>
            <a href='/buyNow'>BuyNow</a>
          </li>
       
        </ol>
      </nav>

      <img src={img3} className='img55' alt='img3' />
      <p className='title55'>Musicart</p>
      <button className='toHome' onClick={handleBackButton1}>
        Back to products
      </button>
      <Link className='checkoutTitle'>Checkout</Link>
      {cardProduct && (
        <>
          <p className='step11'>1. Delivery address</p>
          <p className='step22'>2. Payment method</p>
          <p className='step33'>3. Review items and delivery</p>
          <p className='value11'>{cardProduct.productDeliverAt}</p>
          <p className='value22'>Pay on delivery (Cash/Card)</p>
          <p className='line11'>____________________________________________________________________________________________</p>
          <p className='line22'>____________________________________________________________________________________________</p>
          <img src={cardProduct.productURL1} className='URL11' alt='' />
          <p className='pN11'>{cardProduct.productName}</p>
          <p className='pC11'>Colour</p>
          <p className='colour11'>{cardProduct.productColour}</p>
          <p className='stock11'>In Stock</p>
          <p className='staticLine11'>Estimated delivery :</p>
          <p className='staticLine22'>Monday — FREE Standard Delivery</p>
          <p className='line33'>____________________________________________________________________________________________</p>
          <div className='totalAmount11'>
            <button className='placeOrder11' onClick={handlePlacingOrder}>
              Place your order
            </button>
            <p className='orderLine11'>Order Total : ₹</p>
            <p className='price11'>{cardProduct.productPrice}</p>
            <p className='ordertext11'>
              By placing your order, you agree to Musicart privacy notice and conditions of use.
            </p>
          </div>
          <div className='sideDetails'>
            <button className='placeButton' onClick={handlePlaceOrder}>
              Place your order
            </button>
            <p className='lastText'>
              By placing your order, you agree to Musicart privacy notice and conditions of use.
            </p>
            <p className='line44'>___________________________________________</p>
            <p className='summaryText'>Order Summary</p>
            <p className='itemText11'>Items :</p>
            <p className='itemText22'>Delivery :</p>
            <p className='line55'>___________________________________________</p>
            <p className='itemText33'>Order Total :</p>
            <p className='finalAmount1'>{cardProduct.productPrice}</p>
            <p className='staticAmount00'>50</p>
            <p className='finalAmount00'>{Number(cardProduct.productPrice) + 50}</p>
            <p className='rs11'>₹</p>
            <p className='rs22'>₹</p>
            <p className='rs33'>₹</p>
          </div>
        </>
      )}
      <footer className='footer6'>
        <p className='footerText6'>Musicart | All rights reserved</p>
      </footer>
    </div>
  );
};

export default BuyNow;
