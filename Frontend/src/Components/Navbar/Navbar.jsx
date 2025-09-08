import './Navbar.css'
import logo from '../Assets/logo.svg'
import cart_icon from '../Assets/cart_icon.png'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {
  const [menu, setMenu] = useState("shop")
  const { getTotalCartItems } = useContext(ShopContext)
  
  return (
    <div className='navbar'>
      {/* Animated background elements */}
      <div className="navbar-shine"></div>
      <div className="navbar-glitter"></div>
      
      <div className='nav-logo'>
        <div className="logo-container">
          <img src={logo} alt="M Watch Co. Logo" className="logo-img" />
          <div className="logo-shine-effect"></div>
          <div className="logo-sparkle"></div>
        </div>
        <p>M Watch Co.</p>
        <div className="logo-underline"></div>
      </div>
      
      <ul className='nav-menu'>
        <li onClick={() => {setMenu("shop")}} className={menu === "shop" ? "active" : ""}>
          <Link to='/'>
            <span className="nav-icon">💎</span>
            <span className="nav-text">Shop</span>
            <div className="nav-glow"></div>
            <div className="nav-sparkle"></div>
          </Link>
        </li>
        <li onClick={() => {setMenu("men")}} className={menu === "men" ? "active" : ""}>
          <Link to='/men'>
            <span className="nav-icon">👑</span>
            <span className="nav-text">Men</span>
            <div className="nav-glow"></div>
            <div className="nav-sparkle"></div>
          </Link>
        </li>
        <li onClick={() => {setMenu("women")}} className={menu === "women" ? "active" : ""}>
          <Link to='/women'>
            <span className="nav-icon">✨</span>
            <span className="nav-text">Women</span>
            <div className="nav-glow"></div>
            <div className="nav-sparkle"></div>
          </Link>
        </li>
        <li onClick={() => {setMenu("kids")}} className={menu === "kids" ? "active" : ""}>
          <Link to='/kids'>
            <span className="nav-icon">🌟</span>
            <span className="nav-text">Kids</span>
            <div className="nav-glow"></div>
            <div className="nav-sparkle"></div>
          </Link>
        </li>
      </ul>
      
      <div className="nav-actions">
        {localStorage.getItem('auth-token') 
          ? <button className="logout-btn" onClick={() => {
              localStorage.removeItem('auth-token')
              window.location.replace('/')
            }}>
              <span className="btn-icon">🚪</span>
              <span className="btn-text">Logout</span>
              <div className="btn-shine"></div>
            </button>
          : <Link to='/login'>
              <button className="login-btn">
                <span className="btn-icon">🔑</span>
                <span className="btn-text">Login</span>
                <div className="btn-shine"></div>
              </button>
            </Link>
        }
        
        <Link to='/cart' className="cart-container">
          <div className="cart-icon-wrapper">
            <img src={cart_icon} alt="Shopping Cart" className="cart-icon" />
            <div className="cart-shine"></div>
            <div className="cart-glitter"></div>
            <div className='nav-cart-count'>{getTotalCartItems()}</div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar