import React, { useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { CartContext } from '../context/Cart'
import { useQuery } from 'react-query'

export default function Navbar({user,setUser}) {
  const {getCartContext}=useContext(CartContext)

  const getCart=async()=>{
    const res=await getCartContext();
    return res;
}
  const {data,isLoading}= useQuery("cart",getCart)
    console.log(data);

  const navigate = useNavigate();  
    const logout=()=>{
    localStorage.removeItem('userToken');
    setUser(null);
    navigate('/home');
  }

  return (
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <a className="navbar-brand" href="#">razan-shop</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav m-auto mb-2 mb-lg-0">
       
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>

     
        {user&&   
         <li className="nav-item">
         <Link className="nav-link" to="profile">Profile</Link>
       </li>}  
        <li className="nav-item">
          <a className="nav-link" href="#">Categories</a>
        </li>


        <li className="nav-item">
          <a className="nav-link" href="#">Products</a>
        </li>
        {user&&   
         <li className="nav-item">
          <Link className="nav-link position-relative" to='/cart'>Cart  {data && data.count && <span className="text-danger fw-bold position-absolute top-0 start-100 translate-middle badge rounded-pill">{data.count}</span>}</Link>
         
        </li>}  

      </ul>


   <ul className="navbar-nav">
       <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu ">
            {!user?
              <>
            <li><Link className="dropdown-item" to="/register">register</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><Link className="dropdown-item" to="/login">login</Link>
            </li>
              </>:
              <>
            <li><Link className="dropdown-item" to="/register">profile</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><Link className="dropdown-item" onClick={logout}>logout</Link></li>
              </>
            }
           
          </ul>
        </li>
   </ul>
    </div>
  </div>
</nav>

 )
}
