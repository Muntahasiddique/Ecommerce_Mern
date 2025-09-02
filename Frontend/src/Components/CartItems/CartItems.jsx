import { useContext } from 'react'
import  './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'
import { useNavigate } from 'react-router-dom';

// Inside your CartItems component, add:


const CartItems = () => {
const {all_product , cartItem , RemoveToCart , getTotalAmount} = useContext(ShopContext)
const navigate = useNavigate();
  return (
    <div className='CartItems' >
      <div className="cartitems-formate-main">
        <p>products</p>
        <p>Title</p>
         <p>Price</p>
          <p>Quantity</p>
           <p>Total</p>
            <p>Remove</p>
      </div>
      <hr />
     {all_product.map((e , i)=>{
       
        if(cartItem[e.id] > 0){
            return  <div key={e.id} >
        <div className="cartitems-formate">
            <img src={e.image} className='Carticon-product-icon' alt="" />
            <p>{e.name}</p>
            <p>{e.new_price}</p>
         
            <button className='Cartitms-quantity' >{cartItem[e.id]}</button>
            <p>${e.new_price*cartItem[e.id]}</p>
            <img src={remove_icon} onClick={()=>{
                RemoveToCart(e.id)
            }} alt="" />
        </div>
        <hr />
      </div>
        }
        return null
     })}
     <div className="cartitems-down">
        <div className="cartitems-total">
            <h1>
                cart Totals
            </h1>
            <div className='cartitems-total-item' >
              <p>
                subTotal
              </p>
              <p>
                ${getTotalAmount()}
              </p>
            </div>
            <hr />
            <div className="cartitems-total-item">
                <p>Shipping fee</p>
                <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
                <h3>
                    Total 
                </h3>
                <h3>
                    ${getTotalAmount()}
                </h3>
            </div>
               
<button onClick={() => navigate('/checkout')}>Proceed to checkout</button>
        </div>  
<div className="cartitems-promocode">
    <p>
        if have any propmo code enter
    </p>
    <div className='cartitems-promobox' >
<input type="text" name="" id="" placeholder='promo code' />
<button>Submit</button>
    </div>
</div>
     </div>
    </div>
  )
}

export default CartItems