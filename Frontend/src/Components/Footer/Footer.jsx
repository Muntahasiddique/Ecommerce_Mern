import './Footer.css'
import logo from '../Assets/logo.svg'
import instagram_icon from '../Assets/instagram_icon.png'
import pintester_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-top">
        <div className="footer-logo">
          <img src={logo} alt="Shopper Logo" />
          <p>M Watch Co.</p>
        </div>
        <div className="footer-newsletter">
          <h3>Stay Updated</h3>
          <p>Subscribe to our newsletter for the latest updates</p>
          <div className="newsletter-input">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>
      
      <div className="footer-middle">
        <div className="footer-links">
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/press">Press</a></li>
              <li><a href="/blog">Blog</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li><a href="/help">Help Center</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/shipping">Shipping Info</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4>Shop</h4>
            <ul>
              <li><a href="/women">Women</a></li>
              <li><a href="/men">Men</a></li>
              <li><a href="/kids">Kids</a></li>
              <li><a href="/accessories">Accessories</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4>Legal</h4>
            <ul>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/refund">Refund Policy</a></li>
              <li><a href="/cookies">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-social">
          <div className="social-icons">
            <a href="https://instagram.com" aria-label="Instagram">
              <img src={instagram_icon} alt="Instagram" />
            </a>
            <a href="https://pinterest.com" aria-label="Pinterest">
              <img src={pintester_icon} alt="Pinterest" />
            </a>
            <a href="https://whatsapp.com" aria-label="WhatsApp">
              <img src={whatsapp_icon} alt="WhatsApp" />
            </a>
          </div>
        </div>
        
        <div className="footer-copyright">
          <hr />
          <p>Copyright © 2023 Shopper. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Footer