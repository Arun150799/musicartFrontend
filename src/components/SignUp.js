import React, {  useState,useEffect } from 'react'
import img1 from '../assets/image1.png'
import Login from './Login'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
 const[name,setName] =useState("")
 const[number,setNumber] =useState("")
 const[email,setEmail] =useState("")
 const[password,setPassword] =useState("")
 const navigate =useNavigate("")

 useEffect (()=>{
    const auth = localStorage.getItem("customer")
      if(auth){
        navigate("/")
      }
   },[])
  
    const handleUserData =async(e) => {
      console.log(name, number,email, password);
  
      let result = await fetch('http://localhost:6900/register',{
        method:"post",
        body: JSON.stringify({name,email,number,password}),
        headers: { 
          "content-type": "application/json"
      }
      })
      result = await result.json();
          console.log(result);
          if(result){ 
            navigate("/")
          }
          localStorage.setItem('customer', JSON.stringify(result))
    }
  


  return (
    <>
       <img src={img1} className='img1' alt='img1' />
      <h1 className='appName'>Musicart</h1> 
      <div className="port1">
        <p className='signUpHeading'>Create Account</p>
        <div>
      <label className='lebelSignUp1' htmlFor="name">Your fullName</label><br />
        <input className="inputSignUp1" value={name} onChange={(e)=>setName(e.target.value)}  name="name" type="text"  /> <br/>
        </div>

        <div>
      <label className='lebelSignUp2' htmlFor="number">Mobile number</label><br />
        <input className="inputSignUp2" value={number} onChange={(e)=>setNumber(e.target.value)}  name="number" type="text"  /> <br/>
        </div>

        <div>
      <label className='lebelSignUp3' htmlFor="email">Email id</label><br />
        <input className="inputSignUp3" value={email}  onChange={(e)=>setEmail(e.target.value)} name="email" type="text"  /> <br/>
        </div>

        <div>
      <label className='lebelSignUp4' htmlFor="password">Password</label><br />
        <input className="inputSignUp4" value={password} onChange={(e)=>setPassword(e.target.value)}  name="password" type="password"  /> <br/>
        </div>
        <p className='btnText'>By enrolling your mobile phone number, you consent to receive automated security notifications via text message from Musicart. Message and data rates may apply.</p>
        <button className='btnSignUp' onClick={handleUserData}>Continue</button>
        <p className='btnText2'>By continuing, you agree to Musicart privacy notice and conditions of use.</p>
      </div>
      <p className="btnText3">Already have an account?</p> 
      <a className="link" href='/login' src={<Login />} >Sign in</a>
      <footer className='footer'>
      <p className='footerText'>Musicart | All rights reserved</p>
      </footer>
    </>
  )
}

export default SignUp
