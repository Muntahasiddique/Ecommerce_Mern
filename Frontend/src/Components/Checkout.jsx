import { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import './Checkout.css';

const Checkout = () => {
  const { getTotalAmount, checkout } = useContext(ShopContext);
  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    const result = await checkout(address);
    
    if (result.success) {
      setOrderStatus({ success: true, message: `Order placed successfully! Order ID: ${result.orderId}` });
    } else {
      setOrderStatus({ success: false, message: result.message });
    }
    
    setIsProcessing(false);
  };

  if (orderStatus) {
    return (
      <div className="checkout-container">
        <div className={`order-status ${orderStatus.success ? 'success' : 'error'}`}>
          <h2>{orderStatus.success ? 'Order Successful!' : 'Order Failed'}</h2>
          <p>{orderStatus.message}</p>
          <button onClick={() => setOrderStatus(null)}>Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <div className="checkout-content">
        <div className="checkout-form">
          <h2>Shipping Address</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={address.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Street Address</label>
              <input
                type="text"
                name="street"
                value={address.street}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group-row">
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={address.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={address.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={address.country}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" disabled={isProcessing}>
              {isProcessing ? 'Processing...' : `Pay $${getTotalAmount()}`}
            </button>
          </form>
        </div>
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-total">
            <h3>Total: ${getTotalAmount()}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;