import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import rupeesImg from '../assets/rupees.png';
import img4 from '../assets/searchIcon.png'
import filter1 from '../assets/filter1.png';
import filter2 from '../assets/filter2.png';
import bucketImg from '../assets/bucket2.png';
import bucketImg2 from '../assets/bucket.png';

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const [filters, setFilters] = useState({
    headPhoneType: '',
    companyType: '',
    headPhoneColor: '',
    headPhonePrice:''

  });

  const [sortOption, setSortOption] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const navigate =  useNavigate()


  // const navigate = useNavigate("");
  const auth = localStorage.getItem("customer");

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filters,sortOption]);

  const getProducts = async () => {
    try {
      const response = await axios.get('http://localhost:6900/productList');
      setProductList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:6900/productList', { params: {...filters,sortOption }
    
    });
      setProductList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserSearch = async (event) => {
    let key = event.target.value;
    if (key) {
      try {
        const response = await axios.get(`http://localhost:6900/search/${key}`);
        setProductList(response.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      getProducts();
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleAddToCartProduct = async (id) => {
    const user = JSON.parse(localStorage.getItem('customer'));
    const email = user.email;

    alert("Your product has been added successfully!");

    try {
      await fetch('http://localhost:6900/addToCart', {
        method: "post",
        body: JSON.stringify({ email, id }),
        headers: {
          "content-type": "application/json"
        }
      });
    } catch (error) {
      console.log(error);
    }
  };


  const handleAddToCartProduct1 = async (id) => {
    const user = JSON.parse(localStorage.getItem('customer'));
    const email = user.email;

    // alert("Your product has been added successfully!");

    try {
      await fetch('http://localhost:6900/buyNow', {
        method: "post",
        body: JSON.stringify({ email, id }),
        headers: {
          "content-type": "application/json"
        }
      });
    } catch (error) {
      console.log(error);
    }
    console.log(id,email);
  };

  const handleGridView = () => {
    setIsGridView(true);
  };

  const handleListView = () => {
    setIsGridView(false);

  };

  const handledetails=()=>{
    navigate("/viewCart/:id")
  }

  return (
    <div> 
      { auth ? (
      <Link to='/addToCart' className='viewCart11'>ViewCart<img src={bucketImg2} className='whiteBucket11' alt='' /> </Link>
      ):null}
      <div className='filterImg'>
        <img src={filter1} className='grid' alt='' onClick={handleGridView} />
        <img src={filter2} className='list' alt='' onClick={handleListView}/>

        <form className='filterPortion'>
        
        <select
            id="headPhoneType"
            name="headPhoneType"
            onChange={handleFilterChange}
            value={filters.headPhoneType}
            className='selection1'
          >
            <option value="">Headphone type</option>
            <option className='option' value="Over-ear headPhone">Over-ear headphone</option>
            <option className='option' value="Black | Ear Buds">Ear Buds</option>
            {/* <option value="Blue">Blue</option> */}
            
          </select>
      

          <select
            id="companyType"
            name="companyType"
            onChange={handleFilterChange}
            value={filters.companyType}
            className='selection2'

          >
            <option value="">Company</option>
            <option className='option' value="Boat">Boat</option>
            <option className='option' value="Sony">Sony</option>
            <option className='option' value="Energy">Energy</option>
            <option className='option' value="Boult">Boult</option>
            <option className='option' value="Philips">Philips</option>
            <option className='option' value="Zebronics">Zebronics</option>
            <option className='option' value="Tecno">Tecno</option>
            <option className='option' value="Mivi">Mivi</option>
            <option className='option' value="OnePlus">OnePlus</option>
            <option className='option' value="Nothing">Nothing</option>
            <option className='option' value="Realme">Realme</option>
            <option className='option' value="Apple">Apple</option>
          </select>

          <select
            id="headPhoneColor"
            name="headPhoneColor"
            onChange={handleFilterChange}
            value={filters.headPhoneColor}
            className='selection3'

          >
            <option value="">Colour</option>
            <option className='option' value="Black">Black</option>
            <option className='option' value="White">White</option>
            <option className='option' value="Onion">Onion</option>
            <option className='option' value="RoyalBlue">RoyalBlue</option>
            <option className='option' value="SkyBlue">SkyBlue</option>
          </select>

          <select
            id="headPhonePrice"
            name="headPhonePrice"
            onChange={handleFilterChange}
            value={filters.headPhonePrice}
            className='selection4'

          >
            <option value="">Price</option>
            <option className='option' value="0-2000">₹0-₹2000</option>
            <option className='option' value="2000-4000">₹2000-₹4000</option>
            <option className='option' value="4000-6000">₹4000-₹6000</option>
            <option className='option' value="4000-6000">₹4000-₹6000</option>
            <option className='option' value="6000-7999">₹6000-₹8000</option>
            <option className='option' value="8000-9999">₹8000-₹10000</option>
          </select>

          <select onChange={handleSortChange} value={sortOption} className='selection5'>
          <option value=''>Sort By : Featured</option>
          <option value='lowestPrice'>Price : Lowest</option>
          <option value='highestPrice'>Price : Highest</option>
          <option value='productName'>Name: (A-Z)</option>
          <option value='-productName'>Name: (Z-A)</option>
          
        </select>


        </form>
      </div>

     {isGridView ?(

     <div>
      {productList.map((item, index) => (
        <ul className='productFormate' key={item._id}>
          <>
            <Link to={"/viewCart/" + item._id} ><img src={item.productURL1}  onClick={() => handleAddToCartProduct1(item._id)} className='url1' alt='' /></Link>
          </>
          <div className='div2'>
            <img src={rupeesImg} className='rupeesImg' alt='' />
            <p className='pName'>{item.productName}</p>
            <p className='pPrice'>{item.productPrice}</p>
            <p className='pType'>{item.productType}</p>
            {auth ? (
              <img
                src={bucketImg}
                key={item._id}
                onClick={() => handleAddToCartProduct(item._id)}
                className='viewCart2'
                alt=''
              />
            ) : null}
          </div>
        </ul>
      ))}
      </div>
      ):
      <div>
      {productList.map((item, index) => (
        <ul className='listFormate' key={item._id}>
          <>
            <Link to={"/viewCart/" + item._id} className='link00'><img src={item.productURL1}  onClick={() => handleAddToCartProduct1(item._id)} className='url11' alt='' /></Link>
          </>
          <div className='div22'>
            <img src={rupeesImg} className='rupeesImg00' alt='' />
            <p className='productName00'>{item.productName}</p>
            <p className='priceText00'>Price - </p>
            <p className='price00'>{item.productPrice}</p>
            <p className='headPhoneType00'>{item.productType}</p>
            <p className='productfullName'>{item.productFullName}</p>
            {auth ? (
              <img
                src={bucketImg}
                key={item._id}
                onClick={() => handleAddToCartProduct(item._id)}
                className='viewCart00'
                alt=''
              />
            ) : null}
            

<Link to={"/viewCart/" + item._id} ><button   onClick={() => handleAddToCartProduct1(item._id)} className='details00' alt='' >Details</button></Link>
          </div>
        </ul>
      ))}
      </div>
    
    
    }

      <input type='text' placeholder='Search Product' className='searchbar' onChange={handleUserSearch} />
      <img src={img4} className='searchIcon' alt='img4' />
    </div>
  );
};

export default ProductList;
