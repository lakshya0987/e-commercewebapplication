import TopHeader from "../components/TopHeader";
import MainHeader from "../components/MainHeader";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Cart({
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  totalCartItems,
  search,
  setSearch,
}) {
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="page-wrapper">
      <TopHeader />
      <MainHeader
        search={search}
        setSearch={setSearch}
        totalCartItems={totalCartItems}
      />

      <section className="cart-page">
        <h1 className="cart-page-title">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="cart-empty-box">
            <h2>Your cart is empty</h2>
            <Link to="/" className="cart-back-btn">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-left">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.title} className="cart-img" />

                  <div className="cart-info">
                    <h3>{item.title}</h3>
                    <p>{item.condition}</p>
                    <h4>${item.price}</h4>

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
                <span>Items</span>
                <span>{totalCartItems}</span>
              </div>
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button className="checkout-btn">Proceed to Checkout</button>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default Cart;