import './Offers.css'
import exclusive_img from '../Assets/exclusive_image.png'
import { useNavigate } from "react-router-dom";
const Offers = () => {
const navigate = useNavigate();

  const handleLatestCollectionClick = () => {
    // Navigate to new collections page
    navigate("/newcollections");
  };


  return (
    <div className='offers' >
      
      <div className="offers-left">
        <h1>Exclusive</h1>
        <h1>Offers for you</h1>
        <p>Only on best sellers products</p>
        <button onClick={handleLatestCollectionClick} >Check Now</button>
      </div>

        <div className="offers-right">
           <img src= {exclusive_img} alt="" />
        </div>
    </div>
  )
}

export default Offers
