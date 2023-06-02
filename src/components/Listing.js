import React from 'react'
import Nav from './Nav'
import img3  from '../assets/image1.png';
import img4 from '../assets/listenSongImg.png'
import Footer from './Footer';
import ProductList from './ProductList';



const Listing = () => {

  
  return (
    <>
        <Nav />
        
        <nav aria-label="breadcrumb"> 
        <ol className="breadcrumb">
        <li className="breadcrumb-item active" aria-current="page"><a href='/'>Home</a></li>
        </ol>
        </nav>
   
    <img src={img3} className='img3' alt='img3' />
    <p className='title3'>Musicart</p>

    <div className="banner">
      <p className='bannerText'>Grab upto 50% off on
Selected headphones</p>
<button className='buyNow'>Buy Now</button>
<img src={img4} className='ListenSong' alt='img' />
<ProductList/>



{<Footer/>}

    </div>
</>
  )
}

export default Listing
