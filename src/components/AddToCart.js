import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import img3 from '../assets/image1.png';
import cart from '../assets/myCart.png';
import rupess from '../assets/rupees.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import bucketImg2 from '../assets/bucket.png';

const AddToCart = () => {
  const [cardProducts, setCardProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantities, setQuantities] = useState({});// Use an object to store individual quantities
  const [productName,setProductName] = useState([])
  const navigate = useNavigate();
  // const {productName1} = props; 


  useEffect(() => {
    handleCarts();
    const storedQuantities = JSON.parse(localStorage.getItem('quantities'));
    if (storedQuantities) {
      setQuantities(storedQuantities);
    }

    const productName = localStorage.getItem('productName');
    if (productName) {
      setProductName(productName);
    }
    console.log(productName);
  

  }, []);

  const handleCarts = async () => {
    const user = JSON.parse(localStorage.getItem('customer'));
    const email = user.email;
    console.log(email);

    let result = await fetch('http://localhost:6900/productList');
    result = await result.json();
    console.log(result);

    let result2 = await fetch('http://localhost:6900/getCardId');
    result2 = await result2.json();
    console.log(result2);

    const matchedProducts = result.filter((data2) => {
      const matchedCards = result2.find((data) => {
        return (
          data.cardId.some((card) => card.cardId === data2._id) &&
          data.email === email
        );
      });
      return matchedCards !== undefined;
    });

    setCardProducts(matchedProducts);
  };

  const handleBackButton1 = () => {
    navigate('/');
  };

  const handlePlaceOrder = () => {
    navigate('');
  };

  const handleQuantity = (event, productId) => {
    const value = event.target.value;
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: value, // Store individual quantities for each product
    }));
    const storedQuantities = JSON.parse(localStorage.getItem('quantities')) || {};
    storedQuantities[productId] = value;
    localStorage.setItem('quantities', JSON.stringify(storedQuantities));
  
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [cardProducts, quantities]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    if (cardProducts && cardProducts.length > 0) {
      cardProducts.forEach((item) => {
        const quantity = quantities[item._id] || 1; // Use quantity from state or default to 1
        totalPrice += item.productPrice * quantity;
      });
    }
    setTotalPrice(totalPrice);
  };

  return (
    <div>
      <Nav />
      <Link to="/addToCart" className="viewCart22">
        ViewCart<img src={bucketImg2} className="whiteBucket22" />{' '}
      </Link>

      <nav aria-label="breadcrumb"> 
        <ol className="breadcrumb">
        <li className="breadcrumb-item active" aria-current="page"><a href='/'>Home</a></li>
        <li className="breadcrumb-item active" aria-current="page"><a href=''>{productName}</a></li>
        <li className="breadcrumb-item active" aria-current="page"><a href=''>AddToCart</a></li>

        </ol>
        </nav>
      <img src={img3} className="img44" alt="img3" />
      <p className="title44">Musicart</p>
      <button className="toHome" onClick={handleBackButton1}>
        Back to products
      </button>

      <img src={cart} className="cart" alt="" />
      <h2 className="myCart">My Cart</h2>

      <>
        {cardProducts && cardProducts.length > 0 ? (
          cardProducts.map((item) => (
            <ul className="cartPort" key={item._id}>
              <p className="pN">{item.productName}</p>
              <p className="priceText">Price</p>
              <p className="colourText">Colour - </p>
              <p className="stock">In Stock </p>
              <p className="quantityText">Quantity</p>
              <p className="totaltext">Total</p>
              <p className="totalAmount1">{totalPrice}</p>
              <p className="totalAmount">
                {quantities[item._id] ? item.productPrice * quantities[item._id] : item.productPrice}
              </p>
              <img src={rupess} className="rupeesSign" alt="" />
              <p className="items">{cardProducts.length} Item</p>
              <p className="pP">{item.productPrice}</p>
              <p className="pC">{item.productColour}</p>
              <select
                className="pQuantity"
                value={quantities[item._id] || ''}
                onChange={(event) => handleQuantity(event, item._id)}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
              </select>
              <img src={item.productURL1} className="cartURL1" alt="" />
            </ul>
          ))
        ) : (
          <p className="notFoundProduct">Oops, No product found in your cart!😌</p>
        )}
      </>

      <div className="priceDetails">
        <p className="step1">PRICE DETAILS</p>
        <p className="step2">Total MRP</p>
        <p className="step3">Discount on MRP</p>
        <p className="step4">Convenience Fee</p>
        <p className="step5">Total Amount</p>
        <img src={rupess} className="rs1" alt="" />
        <img src={rupess} className="rs2" alt="" />
        <img src={rupess} className="rs3" alt="" />
        <img src={rupess} className="rs4" alt="" />
        <p className="value1">{totalPrice}</p>
        <p className="value2">0</p>
        <p className="value3">50</p>
        <p className="wholeTotal">{totalPrice + 0 + 50}</p>
        <button className="placeOrder" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>

      <footer className="footer5">
        <p className="footerText5">Musicart | All rights reserved</p>
      </footer>
    </div>
  );
};

export default AddToCart;
