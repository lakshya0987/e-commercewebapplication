import { Link } from "react-router-dom";
import { useState } from "react";

function Cart({
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  placeOrder,
  user,
  handleUpdateProfile,
}) {
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <h1 className="cart-page-title">My Cart</h1>

        <div className="cart-empty-box">
          <h2>Your cart is empty</h2>
          <p>Add some products to continue shopping.</p>

          <Link to="/" className="cart-back-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const [showAddressForm, setShowAddressForm] = useState(false);
const [address, setAddress] = useState(user?.address || "");

const saveAddress = () => {
  if (!address.trim()) {
    alert("Please enter your address");
    return;
  }

  const updatedUser = {
    ...user,
    address: address,
  };

  handleUpdateProfile(updatedUser);
  setShowAddressForm(false);
};

  return (
    <div className="cart-page">
      <h1 className="cart-page-title">My Cart</h1>

      <div className="cart-layout">
        <div className="cart-left">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.title} className="cart-img" />

              <div className="cart-info">
                <h3>{item.title}</h3>
                <p>Price: ₹{item.price}</p>
                <h4>Subtotal: ₹{(item.price * item.quantity).toFixed(2)}</h4>

                <div className="cart-qty-row">
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
              </div>

              <button
                className="remove-cart-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="cart-right">
          <h2>Order Summary</h2>

          <div className="cart-summary-row">
            <span>Total Items</span>
            <span>{cart.length}</span>
          </div>

          <div className="cart-summary-row">
            <span>Total Price</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>

          <div className="cart-address-box">
  <h3>Delivery Address</h3>

  {!showAddressForm ? (
    <>
      <p>
        {user?.address ? user.address : "No address added yet"}
      </p>

      <button
        className="change-address-btn"
        onClick={() => setShowAddressForm(true)}
      >
        Change Address
      </button>
    </>
  ) : (
    <div className="cart-address-form">
      <textarea
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter your delivery address"
      />

      <div className="address-btn-row">
        <button className="save-address-btn" onClick={saveAddress}>
          Save Address
        </button>

        <button
          className="cancel-address-btn"
          onClick={() => setShowAddressForm(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  )}
</div>

          <button className="checkout-btn" onClick={placeOrder}>
            Checkout
          </button>

          <Link to="/" className="cart-back-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;