function ProductInfo({ product, addToCart }) {
  return (
    <div className="product-info-section">
      <h1>{product.title}</h1>

      <div className="seller-line">
        <div className="seller-logo-circle">OM</div>
        <div className="seller-text-group">
          <p className="seller-name">
            offmarketsupply <span>(1)</span>
          </p>
          <div className="seller-links-row">
            <a href="/">Seller's other items</a>
            <a href="/">Message seller</a>
          </div>
        </div>
      </div>

      <div className="price-box">
        <h2>US ${product.price}</h2>
        <span>or Best Offer</span>
      </div>

      <div className="info-mini-grid">
        <div>
          <p className="mini-label">Condition</p>
          <p>{product.condition}</p>
        </div>

        <div>
          <p className="mini-label">Size</p>
          <p>{product.size}</p>
        </div>

        <div>
          <p className="mini-label">Brand</p>
          <p>{product.brand}</p>
        </div>
      </div>

      <div className="product-action-buttons">
        <button className="buy-btn">Buy It Now</button>
        <button className="add-cart-outline" onClick={() => addToCart(product)}>
          Add to cart
        </button>
        <button className="watchlist-btn">Add to Watchlist</button>
      </div>
    </div>
  );
}

export default ProductInfo;