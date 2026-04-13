import { useParams } from "react-router-dom";
import products from "../products";

const ProductDetails = ({ addToCart, cart }) => {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) return <h2>Product not found</h2>;

  const isAdded = cart?.some(
    (item) => item.id === product.id
  );

  return (
    <div className="details-wrapper">
      <div className="details-container">

        {/* IMAGE */}
        <div className="left-section">
          <div className="main-image-box">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="main-image"
            />
          </div>
        </div>

        {/* DETAILS */}
        <div className="right-section">
          <h1 className="product-title-details">
            {product.title}
          </h1>

          <p className="product-description">
            {product.description}
          </p>

          <h2 className="product-price-details">
            ₹{product.price}
          </h2>

          <p className="extra-text">
            Free delivery | 7 days return
          </p>

          <button
            className={`details-cart-btn ${isAdded ? "added" : ""}`}
            onClick={() => addToCart(product)}
          >
            {isAdded ? "Added" : "Add to Cart"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;