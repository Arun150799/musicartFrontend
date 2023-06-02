import React  from 'react'
import img2 from '../assets/callingIcon.png';
import { Link, useNavigate } from 'react-router-dom';
// import bucketImg from '../assets/bucket2.png'


const Nav = () => {
  const auth = localStorage.getItem("customer")
  const user = JSON.parse(localStorage.getItem('customer'));
  const username = user ? user.name : ''; // Check if user exists before accessing properties

  const navigate = useNavigate("")

 
const hadnleLogut =()=>{
  localStorage.clear()
window.location.reload()

  navigate("/")
}
// useEffect(()=>{
// window.location.reload()
// },[])

  return (
    <div>
      <ul className='header'>
      <img src={img2} className='img2' alt='img2' />
      <p className='callingNum'>8888855555</p>
      <p className='bannerOfferr'>Get 50% off on selected items</p>
      <p className='line3'>|</p>
      <p className='lineText2'>Shop Now</p>

      {/* <li><Link to='' className='Home'>Home</Link></li> */}
      <li>
        { auth ?
          <>
            <p className='username'>{username}</p> {/* Display the username */}
            <Link to="/" className='logout' onClick={hadnleLogut}>Logout</Link>
            {/* <Link to='/viewCart' className='viewCart2'>here see<img src={bucketImg} className='viewCart2' alt=''/></Link> */}

            </>
            :
          <>
      <li><Link to='/login' className='login'>Login</Link></li>
      <p className='line4'>|</p>

      <li><Link to='/register' className='signUp'>Signup</Link></li> 
      </>
        }
      </li>

      </ul>

    </div>
  )
}

export default Nav
