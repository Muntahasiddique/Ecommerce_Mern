import './EditProduct.css';
import upload_area from '../../assets/upload_area.svg';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    id: "",
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:4000/product/${productId}`);
      
      // Check if response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Check content type to ensure it's JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new TypeError("Response is not JSON");
      }
      
      const product = await response.json();
      setProductDetails(product);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      alert("Failed to fetch product details");
      setLoading(false);
    }
  };

  const ImageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const ChangeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const UpdateProduct = async () => {
    let updatedProduct = { ...productDetails };
    
    // If a new image was selected, upload it first
    if (image) {
      try {
        let formData = new FormData();
        formData.append('product', image);
        
        const uploadResponse = await fetch('http://localhost:4000/upload', {
          method: 'POST',
          body: formData,
        });
        
        const uploadData = await uploadResponse.json();
        if (uploadData.success) {
          updatedProduct.image = uploadData.image_url;
        } else {
          alert("Failed to upload image");
          return;
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image");
        return;
      }
    }

    // Update the product
    try {
      const response = await fetch('http://localhost:4000/updateproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });
      
      const data = await response.json();
      if (data.success) {
        alert("Product Updated Successfully");
        navigate('/listproduct'); // Redirect to product list
      } else {
        alert("Failed to Update Product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };

  if (loading) {
    return <div className="EditProduct">Loading...</div>;
  }

  return (
    <div className='EditProduct'>
      <h2>Edit Product</h2>
      <div className="EditProduct-itemfeild">
        <p>Product Title</p>
        <input 
          value={productDetails.name} 
          onChange={ChangeHandler}  
          type="text" 
          name="name" 
          placeholder='Type here' 
        />
      </div>
      <div className="EditProduct-price">
        <div className="EditProduct-itemfeild">
          <p>Price</p>
          <input 
            value={productDetails.old_price} 
            onChange={ChangeHandler}  
            type="text" 
            name="old_price" 
            placeholder='Type here' 
          />
        </div>
        <div className="EditProduct-itemfeild">
          <p>Offer Price</p>
          <input 
            value={productDetails.new_price} 
            onChange={ChangeHandler}  
            type="text" 
            name="new_price" 
            placeholder='Type here' 
          />
        </div>
      </div>
      <div className="EditProduct-itemfeild">
        <p>Product Category</p>
        <select 
          value={productDetails.category} 
          onChange={ChangeHandler}  
          name="category" 
          className='EditProduct-selector'
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="EditProduct-itemfeild">
        <label htmlFor="file-input">
          <img 
            src={image ? URL.createObjectURL(image) : productDetails.image || upload_area} 
            alt="" 
            className='EditProduct-thumbnail-img' 
          />
          <p>Click to change image</p>
        </label>
        <input 
          onChange={ImageHandler} 
          type="file" 
          name="image" 
          id="file-input" 
          hidden 
        />
      </div>
      <button 
        className='EditProduct-btn' 
        onClick={UpdateProduct}
      >
        Update Product
      </button>
    </div>
  );
};

export default EditProduct;