import { createContext, useState } from "react";
import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);
const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < all_product.length + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};
const ShopContextProvider = (props) => {
  const [cartItem, setCartItem] = useState(getDefaultCart());

  const addToCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    console.log(cartItem);
  };

  const RemoveToCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };
// Total Price
const getTotalAmount = ()=>{
    let TotalAmount = 0;
    for(const item in cartItem){
        if(cartItem [item] > 0){
            let iteminfo = all_product.find((product)=>product.id === Number(item))
            TotalAmount += iteminfo.new_price * cartItem[item]
        }
     
    }
       return TotalAmount
}
// total cart items

const getTotalCartItems = () =>{
    let totalItems = 0 ;
    for (const item in cartItem){
        if(cartItem[item] > 0){
            totalItems+= cartItem[item]
        }
    }
    return totalItems
}
  const contextValue = { all_product, cartItem, addToCart, RemoveToCart ,getTotalAmount ,getTotalCartItems };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
