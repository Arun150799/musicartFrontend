import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import img3 from '../assets/image1.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import star1 from '../assets/Star 1.png';
import rupeesImg from '../assets/rupees.png';
import bucketImg2 from '../assets/bucket.png';
// import AddToCart from './AddToCart';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';



const ViewCart = () => {
  const navigate = useNavigate("");
  const auth = localStorage.getItem("customer");
  const params = useParams();

  const [productFullName, setProductFullName] = useState("");
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [productDetails1, setProductDetails1] = useState("");
  const [productDetails2, setProductDetails2] = useState("");
  const [productDetails3, setProductDetails3] = useState("");
  const [productDetails4, setProductDetails4] = useState("");
  const [productDetails5, setProductDetails5] = useState("");
  const [productDetails6, setProductDetails6] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productURL1, setProductURL1] = useState("");
  const [productURL2, setProductURL2] = useState("");
  const [productURL3, setProductURL3] = useState("");
  const [productURL4, setProductURL4] = useState("");
  const [CardProduct, setCardProduct] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);


  const pics = [
    { id: 0, value: productURL1 },
    { id: 1, value: productURL2 },
    { id: 2, value: productURL3 },
    { id: 3, value: productURL4 }
  ];
  const [sliderData, setSliderData] = useState("");

  const handlePics = (index) => {
    const slider = pics[index];
    setSliderData(slider.value);
  };
  const handlePrevSlide = () => {
    setCurrentIndex((currentIndex - 1 + pics.length) % pics.length);
  };

  const handleNextSlide = () => {
    setCurrentIndex((currentIndex + 1) % pics.length);
  };


  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch(`http://localhost:6900/productOne/${params.id}`);
    result = await result.json();
    setProductFullName(result.productFullName);
    setProductName(result.productName);
    setProductPrice(result.productPrice);
    setProductType(result.productType);
    setProductDetails(result.productDetails);
    setProductDetails1(result.productDetails1);
    setProductDetails2(result.productDetails2);
    setProductDetails3(result.productDetails3);
    setProductDetails4(result.productDetails4);
    setProductDetails5(result.productDetails5);
    setProductDetails6(result.productDetails6);
    setProductBrand(result.productBrand);
    setProductURL1(result.productURL1);
    setProductURL2(result.productURL2);
    setProductURL3(result.productURL3);
    setProductURL4(result.productURL4);
    setSliderData(result.productURL1); // Set the initial image URL here
  };

  useEffect(() => {
    localStorage.setItem("productName", productName);
  }, [productName]);

  const handleBackButton = () => {
    navigate("/");
  };


  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>this is for no of products in addToCard>>>>>>>>>>>>>>>>>>........
  useEffect(()=>{
handleCarts();
  },[])

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

    setCardProduct(matchedProducts);
  };
  

  return (
    <div>
      <Nav />
      {/* <AddToCart productName1={productName}/> */}

      {auth ? (
        <>
          <Link to='/addToCart' className='viewCart'>
            <img src={bucketImg2} className='whiteBucket' alt='' />
          </Link>
        </>
      ) : null}

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">
            <a href='/'>Home</a>
          </li>
          <li className="breadcrumb-item active " aria-current="page">
            <a href=''>{productName}</a>
          </li>
      
        </ol>
      </nav>

      <img src={img3} className='img33' alt='img3' />
      <p className='title33'>Musicart</p>
      <button className='toHome' onClick={handleBackButton}>Back to products</button>

      <p className='productFullName'>{productFullName}</p>
      <p className='productName'>{productName}</p>
      <img src={star1} className='star1' alt='' />
      <img src={star1} className='star2' alt='' />
      <img src={star1} className='star3' alt='' />
      <img src={star1} className='star4' alt='' />
      <img src={star1} className='star5' alt='' />
      <p className='ratingText'>(50 Customer reviews)</p>
      <p className='priceText1'>Price -</p>
      <img src={rupeesImg} className='rupImg' alt='' />
      <p className='productPrice'>{productPrice}</p>
      <p className='productType'>{productType}</p>
      <p className='productDetails'>{productDetails}</p>
      <p className='productDetails1'>* {productDetails1}.</p>
      <p className='productDetails2'>* {productDetails2}.</p>
      <p className='productDetails3'>* {productDetails3}.</p>
      <p className='productDetails4'>* {productDetails4}.</p>
      <p className='productDetails5'>* {productDetails5}.</p>
      <p className='productDetails6'>* {productDetails6}.</p>
      <p className='availableText'>Available -</p>
      <p className='stockText'>In stock</p>
      <p className='brand'>Brand -</p>
      <p className='productBrand'>{productBrand}</p>

      <div className="imgPortion">
        <img src={sliderData} className='bigImg' alt='' />
        {pics.map((data, i) => (
          <img
            key={data.id}
            src={data.value}
            onClick={() => handlePics(i)}
            className='allImg'
            alt=''
          />
        ))}
      </div>

         {/* <div >
           <Carousel
              showArrows={false}
              showThumbs={false}
              selectedItem={currentIndex}
              
            >
              {pics.map((pic) => (
                <div key={pic.id}  >
                  <img src={pic.value} alt="Product" style={{width:"10rem",height:"10rem",marginBottom:"3rem"}} />
                </div>
              ))}
            </Carousel>

            <div >
            
            </div>
          </div>
          <button className="arrow-button" onClick={handlePrevSlide}>
            <i className="fa fa-chevron-left">preview</i>
          </button>
          <button style={{marginLeft:"17rem"}} onClick={handleNextSlide}>
            <i className="fa fa-chevron-right">next</i>
          </button> */}
  





      {CardProduct && CardProduct.length > 0 ? (
          CardProduct.map((item) => (
            <ul key={item._id}>
              <p className="itemsss">{CardProduct.length} </p>
              
            </ul>
          ))
        ) : (
          <></>
        )}


      {auth ? (
        <ul className='viewLink'>
          <li>
            <Link to='/addtocart'  className='addToCart'>
              Add to cart
            </Link>
          </li>
          <li>
            <Link to='/buyNow' className='buyNow1'>
              Buy Now
            </Link>
          </li>
        </ul>
      ) : null}

      

      <footer className='footer4'>
        <p className='footerText4'>Musicart | All rights reserved</p>
      </footer>
    </div>
  );
};

export default ViewCart;
