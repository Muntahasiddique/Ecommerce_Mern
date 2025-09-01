import { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from '../../assets/cross_icon.png'
import { Link } from "react-router-dom"; 
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

  // removeproduct
  const remove_product = async(id)=>{
    await fetch('http://localhost:4000/removeproduct' ,{
      method:'POST',
      headers:{
        Accept:'application/json',
         'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id}),
    })
    await fetchinfo()
  }
  return (
    <div className="ListProduct">
      <h1>All products list</h1>
      <div className="listproduct-formate-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
          <p>Edit</p> 
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product,index)=>{
           return    <div key={index} className="listProduct-formate-main listProduct-Formate">
  <img src={product.image} alt="" className="listproduct-product-icon" />
  <p>{product.name}</p>
  <p>${product.old_price}</p>
  <p>${product.new_price}</p>
  <p>{product.category}</p>
  <Link to={`/editproduct/${product.id}`}>
    <img src={cross_icon} className="listproduct-editicon" alt="Edit" />
  </Link>
  <img 
    src={cross_icon} 
    onClick={() => {remove_product(product.id)}}  
    className="listproduct-removeicon" 
    alt="Remove" 
  />
</div>
        })}
      </div>
    </div>
  );
};

export default ListProduct;
