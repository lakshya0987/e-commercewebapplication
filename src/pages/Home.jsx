import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Home({
  products,
  search,
  setSearch,
  totalCartItems,
  addToCart,
  cart,
  selectedRating,
  setSelectedRating,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  clearFilters,
}) {
  return (
    <div className="page-wrapper home-page-new">
      
      {/* ================= NAVBAR ================= */}
      <header className="custom-home-navbar">
        <div className="home-logo-box">
          <h2>Canva</h2>
        </div>

        <nav className="home-nav-links">
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Address</a>
        </nav>

      <div className="home-search-cart">

  {/* LOGIN BUTTON */}

  {/* SEARCH */}
  <div className="home-search-box">
    <input
      type="text"
      placeholder="Search products..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <span className="search-icon">🔍</span>
  </div>

  {/* CART */}

  <Link to="/login" className="home-login-btn">
    Login
  </Link>
  <Link to="/cart" className="home-cart-icon">
    🛒
    {totalCartItems > 0 && (
      <span className="cart-count-badge">{totalCartItems}</span>
    )}
  </Link>

</div>
      </header>

      {/* ================= MAIN LAYOUT ================= */}
      <main className="home-content-layout">

        {/* ================= SIDEBAR ================= */}
        <aside className="home-sidebar">

          {/* Popular Ideas */}
          <div className="sidebar-box">
            <h3>Popular Shopping Ideas</h3>
            <ul>
              <li>Philips</li>
              <li>All-in-one</li>
              <li>Professional</li>
              <li>Waterproof</li>
            </ul>
          </div>

          {/* ⭐ Rating Filter */}
          <div className="sidebar-box">
            <h3>Customer Reviews</h3>

            <div className="star-filter">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${
                    star <= selectedRating ? "active-star" : ""
                  }`}
                  onClick={() =>
                    setSelectedRating(
                      selectedRating === star ? 0 : star
                    )
                  }
                >
                  ★
                </span>
              ))}
            </div>

            <p className="rating-label">
              {selectedRating > 0
                ? `${selectedRating} Star & Up`
                : "Select Rating"}
            </p>

            <button className="clear-filter-btn" onClick={clearFilters}>
              Clear All Filters
            </button>
          </div>

          {/* Price Filter */}
          <div className="sidebar-box">
            <h3>Price</h3>

            <p>
              ₹{minPrice || 0} - ₹{maxPrice || "Any"}
            </p>

            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />

            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </aside>

        {/* ================= PRODUCTS ================= */}
        <section className="home-products-area">

          {products.length === 0 ? (
            <div className="no-products-box">
              <h2>No products found</h2>
              <p>Try changing your search or filter values.</p>
            </div>
          ) : (
            <div className="homepage-products-grid">

              {products.map((product) => {
                const isAdded = cart.some(
                  (item) => item.id === product.id
                );

                return (
                  <div
                    className="homepage-product-card"
                    key={product.id}
                  >
                    <Link
                      to={`/product/${product.id}`}
                      className="homepage-product-link"
                    >
                      <div className="homepage-product-image-box">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="homepage-product-image"
                        />
                      </div>

                      <div className="homepage-product-content">
                        <h3>{product.title}</h3>

                        <p className="homepage-product-description">
                          {product.description}
                        </p>

                        <p className="homepage-extra-text">
                          Free delivery | 7 days return
                        </p>

                        <h2 className="homepage-price">
                          ₹{product.price}
                        </h2>

                        <p className="homepage-rating-text">
                          ⭐ {product.rating.toFixed(1)}
                        </p>
                      </div>
                    </Link>

                    <button
                      className={`homepage-add-cart-btn ${
                        isAdded ? "added-btn" : ""
                      }`}
                      onClick={() => addToCart(product)}
                    >
                      {isAdded ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                );
              })}

            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;