import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

const [menu ,setmenu]  = useState("shop")

  return (
    <div className='navbar' >
      <div className='nav-logo' >
        <img src={logo} alt="" />
           <p>Shopper</p>

      </div>
      <ul className='nav-menu'>
        <li onClick={()=>{setmenu("shop")}} > <Link  to='/' > Shop</Link> {menu === "shop"? <hr/>: <></> } </li>
        <li onClick={()=>{setmenu("kids")}}  ><Link  to='/kids' > Kid</Link>{menu === "kids"? <hr/>: <></> }  </li>
        <li onClick={()=>{setmenu("women")}}  > <Link  to='/women' > Women</Link> {menu === "women"? <hr/>: <></> } </li>
        <li onClick={()=>{setmenu("men")}}  ><Link  to='/men' >Men</Link>{menu === "men"? <hr/>: <></> } </li>

      </ul>
      <Link to='/login' >
        <button>Login</button>
      
      </Link>
     <Link to='/cart' >
      <img src={cart_icon} alt="" />
     </Link>
      
       <div className='nav-cart=count' >0</div>
    </div>
  )
}

export default Navbar
