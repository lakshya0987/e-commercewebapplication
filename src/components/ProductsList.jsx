import { Link } from "react-router-dom";

const ProductsList = ({ products, addToCart }) => {
  return (
    <div className="products-section">
      <div className="products-grid">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div className="product-card" key={product.id}>

              <Link to={`/product/${product.id}`} className="product-link">

                {/* IMAGE */}
                <div className="product-image-box">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="product-image"
                  />
                </div>

                {/* INFO */}
                <div className="product-info">

                  <h3 className="product-title-list">
                    {product.title}
                  </h3>

                 <p className="product-desc">{product.description}</p>

                    <p className="extra-text">
                      Free delivery | 7 days return
                    </p>

                  <p className="product-price">
                    ₹{product.price}
                  </p>

                </div>

              </Link>

              {/* BUTTON OUTSIDE LINK */}
              <button
                className="add-to-cart-btn"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>

            </div>
          ))
        ) : (
          <h2>No products found</h2>
        )}
      </div>
    </div>
  );
};

export default ProductsList;