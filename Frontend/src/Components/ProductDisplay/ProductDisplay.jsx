import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
const ProductDisplay = (props) => {
  const { product } = props;
  return (
    <div className="ProductDisplay">
      <div className="product-display-left">
        <div className="productDisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productDisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="product-display-right">
        <h1>
          {product.name}  </h1>
          <div className="productdisplay-right-star">
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull_icon} alt="" />
            <p>{122}</p>
          </div>
          <div className="ProductDisplay-Right-Prices">
            <div className="ProductDisplay-Right-Price-old">
              ${product.old_price}
            </div>
            <div className="ProductDisplay-Right-Price-new">
              ${product.new_price}
            </div>
          </div>
      <div className="productdisplay-right-description">
        LightWeighted
      </div>
 <div className="productdisplay-right-size">
    <h1>
        select Size
    </h1>
    <div className="productdisplay-right-sizes">
        <div>S</div>
        <div>M</div>
         <div>L</div>
          <div>XL</div>
           <div>XXL</div>
    </div>
 </div>
<button>Add to cart</button>
<p className="productdisplay-right-ctegory" >
<span>Category:</span> Women , Tshirt , crop
</p>
<p className="productdisplay-right-ctegory" >
<span>  tAGS:</span> Modern  , Latest
</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
