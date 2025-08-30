import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
import { useState } from 'react'
const AddProduct = () => {
  const [image,setimage] =  useState(false)
  const ImageHandler = ( e) =>{
    setimage(e.target.files[0]);
  }
  return (
    <div className='AddProduct'>
      <div className="AddProduct-itemfeild">
         <p>Product Title</p>
         <input type="text" name="name" id="" placeholder='Type here' />

      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfeild">
          <p>Price</p>
          <input type="text" name="old_price" id="" placeholder='Type here' />
        </div>

          <div className="addproduct-itemfeild">
          <p>Offer price</p>
          <input type="text" name="new_price" id="" placeholder='Type here' />
        </div>
      </div>
      <div className="addproduct-itemfeild">
        <p>Product category</p>
        <select name="category" className='Addproduct-selector'>
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
      <button className='addproduct-btn' >Add product</button>
    </div>
  )
}

export default AddProduct
