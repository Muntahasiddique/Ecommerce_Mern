import './Navbar.css'
import logo from '../../assets/logo.svg'
import nav_profile from '../../assets/nav-profile.jpg'
const Navbar = () => {
  return (
    <div className='Navbar' >
      <img src={logo} alt="" className='nav-logo' /> <h3>M Watch co.</h3>
         <img src={nav_profile} alt="" className='nav-profile' />
    </div>
  )
}

export default Navbar
