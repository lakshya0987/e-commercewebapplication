function SingleProductInfo({ product, addToCart }) {
  return (
    <div className="single-product-info">
      <h1>{product.title}</h1>

      <div className="single-seller-row">
        <div className="single-seller-logo">24</div>

        <div className="single-seller-text">
          <p className="single-seller-name">
            Fab-Finds-24 <span>(2607)</span>
          </p>

          <div className="single-seller-links">
            <a href="/">99.3% positive</a>
            <a href="/">Seller's other items</a>
            <a href="/">Message seller</a>
          </div>
        </div>

        <span className="single-seller-arrow">›</span>
      </div>

      <div className="single-price-box">
        <h2>US ${product.price}</h2>
        <p className="list-price-text">
          List price <span className="strike-price">US $725.00</span> (67% off)
        </p>
        <p className="coupon-text">
          $215.99 with coupon code <a href="/">Price details</a>
        </p>
      </div>

      <div className="single-condition-row">
        <span className="label-text">Condition:</span>
        <span className="value-text">Pre-owned - Excellent</span>
      </div>

      <div className="single-size-box">
        <label>Size:</label>
        <select>
          <option>Select</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
        </select>
      </div>

      <div className="single-qty-row">
        <span className="label-text">Quantity:</span>
        <input type="number" min="1" defaultValue="1" />
        <span className="qty-stock-text">More than 10 available</span>
      </div>

      <div className="single-product-buttons">
        <button className="single-buy-btn">Buy It Now</button>

        <button
          className="single-add-cart-btn"
          onClick={() => addToCart(product)}
        >
          Add to cart
        </button>

        <button className="single-watchlist-btn">♡ Add to Watchlist</button>
      </div>
    </div>
  );
}

export default SingleProductInfo;