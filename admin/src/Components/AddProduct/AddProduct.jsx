import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
import { useState } from 'react'
const AddProduct = () => {
  const [image,setimage] =  useState(false)
  const [ProductDetails,setProductDetails] =  useState({
    name:"",
    image:"",
    category:"women",
    new_price:"",
    old_price:"",
  })

  const ImageHandler = ( e) =>{
    setimage(e.target.files[0]);
  }

  const ChangeHandler = (e) =>{
   setProductDetails({...ProductDetails,[e.target.name]:e.target.value})
  }

  const Add_product = async () =>{
   console.log(ProductDetails)
   let responseData;
   let product = ProductDetails;

   let formData = new FormData();
   formData.append('product' , image)
   await fetch ('http://localhost:4000/Upload',{
    method :'POST',
    headers:{
           Accept:'application/json',
          
    },
    body:formData,
   }).then((resp)=> resp.json()).then((data)=>{responseData=data})

   if(responseData.success){
    product.image = responseData.image_url;
    console.log(product)
    await fetch('http://localhost:4000/addproduct' ,{
      method:'POST',
      headers:{
        Accept:'application/json',
         'Content-Type':'application/json',
      },
      body:JSON.stringify(product),
    }).then((res)=>res.json()).then((data)=>{
      data.success?alert("Product Added"):alert("Failed")
    })
   }

  }
  return (
    <div className='AddProduct'>
      <div className="AddProduct-itemfeild">
         <p>Product Title</p>
         <input value={ProductDetails.name} onChange={ChangeHandler}  type="text" name="name" id="" placeholder='Type here' />

      </div>
      <div className="addproduct-price">
        <div className="AddProduct-itemfeild">
          <p>Price</p>
          <input value={ProductDetails.old_price} onChange={ChangeHandler}  type="text" name="old_price" id="" placeholder='Type here' />
        </div>

          <div className="AddProduct-itemfeild">
          <p>Offer price</p>
          <input value={ProductDetails.new_price} onChange={ChangeHandler}  type="text" name="new_price" id="" placeholder='Type here' />
        </div>
      </div>
      <div className="addproduct-itemfeild">
        <p>Product category</p>
        <select value={ProductDetails.category} onChange={ChangeHandler}  name="category" className='Addproduct-selector'>
          <option value="women">Women</option>
           <option value="men">Men</option>
            <option value="kid">kid</option>
        </select>
      </div>
      <div className="Addproduct-itemfeild">
        <label htmlFor="file-input">
          <img src={ image? URL.createObjectURL(image): upload_area} alt="" className='addproduct-thumbnail-img' />
        </label>
        <input onChange={ImageHandler} type="file" name="image" id="file-input" hidden />
      </div>
      <button className='addproduct-btn' onClick={()=>{Add_product()}} >Add product</button>
    </div>
  )
}

export default AddProduct
