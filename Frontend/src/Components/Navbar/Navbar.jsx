import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {

const [menu ,setmenu]  = useState("shop")
const {getTotalCartItems } = useContext(ShopContext)
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
      
       <div className='nav-cart-count' >{getTotalCartItems()}</div>
    </div>
  )
}

export default Navbar
