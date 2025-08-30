import { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from '../../assets/cross_icon.png'
const ListProduct = () => {
  const [allproducts, setallproducts] = useState([]);

  // to fetch data and save in state
  const fetchinfo = async () => {
    await fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => {
        setallproducts(data);
      });
  };
  useEffect(()=>{
    fetchinfo()
  },[])
  return (
    <div className="ListProduct">
      <h1>All products list</h1>
      <div className="listproduct-formate-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product,index)=>{
           return    <div  key={index}       className="listProduct-formate-main listProduct-Formate ">
               <img src={product.image} alt="" className="listproduct-product-icon" />
               <p>{product.name}</p>
               <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                 <p>{product.category}</p>
                 <img src={cross_icon} className="listproduct-removeicon" alt="" />
           </div>
        })}
      </div>
    </div>
  );
};

export default ListProduct;
