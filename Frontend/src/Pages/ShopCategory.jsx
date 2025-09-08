import { useContext, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

import { useNavigate } from "react-router-dom";
const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [sortOption, setSortOption] = useState('default');
  const [visibleProducts, setVisibleProducts] = useState(12);
  
  // Filter products by category
  const categoryProducts = all_product.filter(item => props.category === item.category);
  
  // Sort products based on selected option
  const sortedProducts = [...categoryProducts].sort((a, b) => {
    if (sortOption === 'price-low-high') return a.new_price - b.new_price;
    if (sortOption === 'price-high-low') return b.new_price - a.new_price;
    if (sortOption === 'name') return a.name.localeCompare(b.name);
    if (sortOption === 'discount') return (b.old_price - b.new_price) - (a.old_price - a.new_price);
    return 0;
  });

  // Get currently visible products
  const productsToShow = sortedProducts.slice(0, visibleProducts);

  // Load more products function
  const loadMoreProducts = () => {
    setVisibleProducts(prev => prev + 12);
  };

  // Calculate discount percentage
  const calculateDiscount = (oldPrice, newPrice) => {
    return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
  };
   const navigate = useNavigate();

  const handleLatestCollectionClick = () => {
    // Navigate to new collections page
    navigate("/newcollections");
  };

  return (
    <div className='shopcategory'>
      {/* Split Banner Section */}
      <div className="shopcategory-split-banner">
        <div className="banner-image-container">
          <img className='shopcategory-banner' src={props.banner} alt={props.category + " banner"} />
          <div className="banner-overlay"></div>
        </div>
        
        <div className="banner-content">
          <div className="banner-content-inner">
            <h2 className="shopcategory-title">{props.category}</h2>
            <p className="shopcategory-description">
              Discover our premium collection of {props.category.toLowerCase()} items. 
              Carefully curated to bring you the best quality and style for every occasion.
            </p>
            
            <div className="category-stats">
              <div className="stat-item">
                <span className="stat-number">{sortedProducts.length}+</span>
                <span className="stat-label">Products</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Quality</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">⭐️⭐️⭐️⭐️⭐️</span>
                <span className="stat-label">Rated</span>
              </div>
            </div>
            
            <button className="banner-cta" onClick={handleLatestCollectionClick} >Shop The Collection</button>
          </div>
        </div>
      </div>
      
      <div className="shopcategory-controls">
        <div className="shopcategory-results">
          <p>
            Showing <span>1-{Math.min(visibleProducts, sortedProducts.length)}</span> out of {sortedProducts.length} products
            {sortedProducts.length > 0 && (
              <span className="products-count-badge">{sortedProducts.length}</span>
            )}
          </p>
        </div>
        
        <div className="shopcategory-sort">
          <label htmlFor="sort-select">Sort by:</label>
          <div className="sort-select-wrapper">
            <select 
              id="sort-select"
              value={sortOption} 
              onChange={(e) => setSortOption(e.target.value)}
              aria-label="Sort products"
            >
              <option value="default">Recommended</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="name">Name A-Z</option>
              <option value="discount">Best Discount</option>
            </select>
            <img src={dropdown_icon} alt="Dropdown icon" className="sort-dropdown-icon" />
          </div>
        </div>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="shopcategory-empty">
          <div className="empty-state">
            <h3>No products found</h3>
            <p>We couldn't find any products in this category. Please check back later.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="shopcategory-products">
            {productsToShow.map((item, i) => (
              <Item 
                key={i} 
                id={item.id} 
                name={item.name} 
                image={item.image} 
                new_price={item.new_price} 
                old_price={item.old_price} 
                discount={calculateDiscount(item.old_price, item.new_price)}
              />
            ))}
          </div>
          
          {visibleProducts < sortedProducts.length && (
            <div className="shopcategory-loadmore">
              <button className="loadmore-btn" onClick={loadMoreProducts}>
                Load More Products
                <span className="products-remaining">({sortedProducts.length - visibleProducts} remaining)</span>
              </button>
            </div>
          )}
        </>
      )}

      {/* Category features section */}
      <div className="shopcategory-features">
        <h3>Why Choose Our {props.category}?</h3>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">✓</div>
            <h4>Premium Quality</h4>
            <p>All our products are made from the finest materials for lasting durability.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🔄</div>
            <h4>Easy Returns</h4>
            <p>Not satisfied? Return within 30 days for a full refund, no questions asked.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🚚</div>
            <h4>Free Shipping</h4>
            <p>Enjoy free standard shipping on all orders over $50.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopCategory;