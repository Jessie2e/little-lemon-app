import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';

console.log("Checkout.js file loaded successfully!");

const Checkout = () => {
  const location = useLocation();
  
  // Safely grab the passed array from the Router state pipeline
  const cartItemsFromState = location.state?.cartItems || [];

  const [cartItems, setCartItems] = useState(cartItemsFromState);
  const [deliveryOption, setDeliveryOption] = useState('delivery'); 
  const [tip, setTip] = useState(0); 

  // Form states matching your structural flows
  const [memberStatus, setMemberStatus] = useState('guest'); // 'guest', 'become_member', 'already_member'

  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleTipChange = (e) => {
    const newTip = parseFloat(e.target.value);
    setTip(isNaN(newTip) ? 0 : newTip); 
  };

  // Safely converts string costs like "14.99" to actual floats
  const formatCost = (cost) => {
    const numCost = parseFloat(cost);
    return !isNaN(numCost) ? numCost.toFixed(2) : '0.00';
  };

  // Generate a random estimated delivery window matching your design hook
  const [estimatedDelivery] = useState(() => {
    const hours = Math.floor(Math.random() * 2) + 1;
    const minutes = Math.floor(Math.random() * 60);
    return `${hours} hr ${minutes} mins`;
  });

  const [estimatedPickup] = useState(() => {
    const minutes = Math.floor(Math.random() * 35) + 15;
    return `${minutes} mins`;
  });

  // Safe accumulation using parseFloat to prevent string concatenation/NaN errors
  const totalPriceWithTip = (cartItems || [])
    .filter(item => item && item.quantity > 0)
    .reduce((total, item) => {
      const itemCost = parseFloat(item.cost) || 0;
      return total + (item.quantity * itemCost);
    }, 0) + tip;

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (cartItems.filter(i => i.quantity > 0).length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert(`Order Placed Successfully! Total: $${totalPriceWithTip.toFixed(2)}`);
  };

  return (
    <div className="checkout-containerr">
      <h2>Your Cart</h2>
      
      <p>Estimated Time for Delivery: <strong>{estimatedDelivery}</strong></p>
      <p>Estimated Time for Pick-up: <strong>{estimatedPickup}</strong></p>

      {/* Cart Summary List Items Box */}
      <div className='checkout-card' style={{ width: '100%', maxWidth: '35rem' }}>
        {cartItems.filter(item => item.quantity > 0).length === 0 ? (
          <p style={{ color: 'var(--second-color)', padding: '2rem' }}>Your cart is empty.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cartItems
              .filter((item) => item && item.quantity > 0)
              .map((item) => (
                <li className='checkout-list' key={item.id}>
                  <div className="checkout-item">
                    
                    {/* FIXED IMAGE BLOCK FOR UNIFORM SIZING */}
                    <div 
                      className="checkout-image-container" 
                      style={{ 
                        width: '100px', 
                        height: '100px', 
                        flexShrink: 0, 
                        overflow: 'hidden', 
                        borderRadius: '8px',
                        display: 'block'
                      }}
                    >
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="checkout-image" 
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover',
                          display: 'block'
                        }}
                      />
                    </div>

                    <div className="checkout-details">
                      <h3>{item.title}</h3>
                      <p className="total-price">${formatCost(parseFloat(item.cost) * item.quantity)}</p>
                      <div className="quantity-buttons" style={{ marginTop: '0.5rem' }}>
                        <button onClick={() => decreaseQuantity(item.id)}>-</button>
                        <span style={{ margin: '0 10px', fontWeight: 'bold' }}>{item.quantity}</span>
                        <button onClick={() => increaseQuantity(item.id)}>+</button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>

      {/* Fulfillment Options Radio Grid */}
      <div style={{ margin: '2rem 0' }}>
        <input
          type="radio"
          id="delivery"
          name="deliveryOption"
          value="delivery"
          checked={deliveryOption === 'delivery'}
          onChange={() => setDeliveryOption('delivery')}
        />
        <label htmlFor="delivery" style={{ marginRight: '1.5rem', fontWeight: 'bold', color: 'var(--second-color)' }}>Order Delivery</label>

        <input
          type="radio"
          id="pickup"
          name="deliveryOption"
          value="pickup"
          checked={deliveryOption === 'pickup'}
          onChange={() => setDeliveryOption('pickup')}
        />
        <label htmlFor="pickup" style={{ fontWeight: 'bold', color: 'var(--second-color)' }}>Order Pickup</label>
      </div>

      <p className='total-price' style={{ color: 'var(--second-color)', fontSize: '1.2rem' }}>
        Little Lemon Members Earn Discounts and Rewards!
      </p>

      {/* Checkboxes/Radios for member options */}
      <div style={{ textAlign: 'left', width: '100%', maxWidth: '25rem', margin: '1rem auto' }}>
        <div>
          <label style={{ color: 'var(--second-color)' }}>
            <input 
              type="radio" 
              name="membership"
              checked={memberStatus === 'become_member'} 
              onChange={() => setMemberStatus('become_member')} 
            /> Become a Little Lemon Member
          </label>
        </div>
        <br />
        <div>
          <label style={{ color: 'var(--second-color)' }}>
            <input 
              type="radio" 
              name="membership"
              checked={memberStatus === 'already_member'} 
              onChange={() => setMemberStatus('already_member')} 
            /> Already a Little Lemon Member
          </label>
        </div>
        <br />
        <div>
          <label style={{ color: 'var(--second-color)' }}>
            <input 
              type="radio" 
              name="membership"
              checked={memberStatus === 'guest'} 
              onChange={() => setMemberStatus('guest')} 
            /> Continue as Guest
          </label>
        </div>
      </div>

      {/* Fields for New Registrations */}
      {memberStatus === 'become_member' && (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1.5rem' }}>
          <input type="text" placeholder="First Name" required />
          <input type="text" placeholder="Last Name" required />
          <input type="email" placeholder="Email Address" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />
        </div>
      )}

      {/* Fields for Returning Members */}
      {memberStatus === 'already_member' && (
        <div className='cbox' style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1.5rem' }}>
          <input type="email" placeholder="Member Email" required />
          <input type="password" placeholder="Member Password" required />
        </div>
      )}
      
      <br />

      {/* Tipping Section */}
      <div className='tip-section' style={{ width: '100%', maxWidth: '35rem' }}>
        <label htmlFor="tip" style={{ fontWeight: 'bold', color: 'var(--second-color)', marginRight: '0.5rem' }}>
          Enter Tip ($):
        </label>
        <input
          type="number"
          id="tip"
          name="tip"
          min="0"
          step="0.50"
          value={tip}
          onChange={handleTipChange}
        />
        <h3 className="total-price" style={{ marginTop: '1.5rem', fontSize: '1.5rem' }}>
          Total Price: ${totalPriceWithTip.toFixed(2)}
        </h3>
      </div>

      {/* Submission Trigger */}
      <button className='orderfood' type="button" onClick={handleSubmitOrder} style={{ marginTop: '2rem' }}>
        Checkout Order
      </button>
    </div>
  );
};

export default Checkout;