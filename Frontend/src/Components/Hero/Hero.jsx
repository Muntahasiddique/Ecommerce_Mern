import "./Hero.css";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import hero_img from "../Assets/hero_image.png";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleLatestCollectionClick = () => {
    // Navigate to new collections page
    navigate("/newcollections");
  };

  return (
    <div className="hero">
      <div className="hero-left">
        <h2>New Arrivals</h2>
        <div>
          <div className="hand-hand-icon">
            <p>new</p>
            <img src={hand_icon} alt="" />
          </div>
          <p>Collections</p>
          <p>For Everyone</p>
        </div>
        <div className="hero-latest-btn" onClick={handleLatestCollectionClick}>
          <div>
            Latest Collection
            <img src={arrow_icon} alt="" />
          </div>
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_img} alt="" />  
      </div>
    </div>
  );
};

export default Hero;