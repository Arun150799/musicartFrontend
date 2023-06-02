import React from 'react'
import Nav from './Nav'
import img3 from '../assets/image1.png';
import { useNavigate } from 'react-router-dom';
import finalImg from "../assets/finalImg.png"


const SuccessFull = () => {
    const navigate = useNavigate("")
    const handleBackButton1=()=>{
         navigate ("/")

    
}
    
  return (
    <div>
        <img src={img3} className='imgFinal' alt='img3' />
      <p className='titleFinal'>Musicart</p>
      <div className="popup">
            <img src={finalImg} className='finalImg' alt=''/>
            <p className='finalText1'>Order is placed successfull!</p>
            <p className='finalText0'>You  will be receiving a confirmation email with order details</p>
            <button className='toHome11' onClick={handleBackButton1}>Go back to Home page</button>

         </div>
         <footer className='footerFinal'>
      <p className='footerTextFinal'>Musicart | All rights reserved</p> 
      </footer>
    </div>
  )
}

export default SuccessFull
