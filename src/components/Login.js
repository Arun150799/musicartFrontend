import React, { useState,useEffect } from 'react'
import img2 from '../assets/image1.png'
import SignUp from './SignUp'
import { useNavigate } from 'react-router-dom'


const Login = () => {
const[email,setEmail] = useState("")
const[password,setPassword] = useState("")
const navigate =useNavigate("")

useEffect(()=>{
    const auth = localStorage.getItem("customer")
    if(auth){
      navigate("/")
    }
  
  })
  
    const handleUserData2=async(e)=>{
      console.log(email,password);
  
      let result = await fetch('http://localhost:6900/login',{
        method:"post",
        body: JSON.stringify({email, password}),
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
       <img src={img2} className='img22' alt='img2' />
      <h1 className='appName2'>Musicart</h1> 
      <div className="port2">
        <p className='signUpHeading'>Sign in</p>
        

        <div>
      <label className='lebelSignUp2' htmlFor="numberOrEmail">Enter your email</label><br />
        <input className="inputSignUp2" value={email} onChange={(e)=>setEmail(e.target.value)}  name="email" type="text"  /> <br/>
        </div>


        <div>
      <label className='lebelSignUp4' htmlFor="password">Password</label><br />
        <input className="inputSignUp4" value={password} onChange={(e)=>setPassword(e.target.value)}  name="password" type="password"  /> <br/>
        </div>
        <button className='btnSignUp2' onClick={handleUserData2}>Continue</button>
        <p className='btnText22'>By continuing, you agree to Musicart privacy notice and conditions of use.</p>
        </div>
    
        <p className='line1'>___________________</p>
        <p className='lineText'>New to Musicart?</p>
        <p className='line2'>___________________</p>
        <a className="link2" href="/register" src={<SignUp />}>Create your Musicart account</a>


        <footer className='footer2'>
      <p className='footerText2'>Musicart | All rights reserved</p> 
      </footer>
 
    </>
  )
}

export default Login
