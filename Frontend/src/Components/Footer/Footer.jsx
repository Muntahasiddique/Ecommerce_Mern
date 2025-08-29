import  './Footer.css'
import footer_logo from '../Assets/logo_big.png'
const Footer = () => {
  return (
    <div className='footer' >
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>
            Shopper
        </p>
        <ul className='footer-links' >

        </ul>
      </div>
    </div>
  )
}

export default Footer
