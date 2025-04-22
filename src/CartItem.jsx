import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeItem } from './CartSlice';  // Assuming you have these actions in CartSlice

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  // Calculate total cost for this item
  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.substring(1)); // Remove '$' and convert to number
    return price * item.quantity;
  };

  // Handle incrementing the quantity
  const handleIncrement = () => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Handle decrementing the quantity
  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem({ name: item.name }));
    }
  };

  // Handle removing the item from the cart
  const handleRemove = () => {
    dispatch(removeItem({ name: item.name }));
  };

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />
      <div className="cart-item-details">
        <h4>{item.name}</h4>
        <p>Price: {item.cost}</p>
        <div className="quantity-controls">
          <button onClick={handleDecrement}>-</button>
          <span>{item.quantity}</span>
          <button onClick={handleIncrement}>+</button>
        </div>
        <p>Subtotal: ${calculateTotalCost(item).toFixed(2)}</p>
        <button onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
};

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate the total cost of all items in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += calculateTotalCost(item);
    });
    return total.toFixed(2); // Return total as a string with 2 decimals
  };

  // Continue shopping button handler
  const handleContinueShopping = () => {
    // Assuming you have a function to navigate to the plant listing page
    // You can use React Router or any other routing mechanism here
    alert('Redirecting to the plant listing page...');
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <CartItem key={item.name} item={item} />
        ))
      )}
      <div className="cart-total">
        <h3>Total Cost: ${calculateTotalAmount()}</h3>
      </div>
      <button onClick={handleContinueShopping}>Continue Shopping</button>
      <button onClick={() => alert('Checkout functionality will be added soon.')}>Checkout</button>
    </div>
  );
};

export default CartPage;
