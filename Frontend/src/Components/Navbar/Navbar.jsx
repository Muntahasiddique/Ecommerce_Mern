import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { useState } from 'react'

const Navbar = () => {

const [menu ,setmenu]  = useState("shop")

  return (
    <div className='navbar' >
      <div className='nav-logo' >
        <img src={logo} alt="" />
           <p>Shopper</p>

      </div>
      <ul className='nav-menu'>
        <li onClick={()=>{setmenu("shop")}} >Shop {menu === "shop"? <hr/>: <></> } </li>
        <li onClick={()=>{setmenu("kids")}}  >Kids {menu === "kids"? <hr/>: <></> }  </li>
        <li onClick={()=>{setmenu("women")}}  >Women {menu === "women"? <hr/>: <></> } </li>
        <li onClick={()=>{setmenu("men")}}  >Men{menu === "men"? <hr/>: <></> } </li>

      </ul>
       <button>Login</button>
       <img src={cart_icon} alt="" />
       <div className='nav-cart=count' >0</div>
    </div>
  )
}

export default Navbar
