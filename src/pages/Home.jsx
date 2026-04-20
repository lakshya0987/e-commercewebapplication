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
  loading,
  error,
  user,
  handleLogout,
}) {
  return (
    <div className="page-wrapper home-page-new">
      <header className="custom-home-navbar">
        <div className="home-logo-box">
          <h2>Canva</h2>
        </div>

        <nav className="home-nav-links">
          <Link to="/">Home</Link>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="#address">Address</a>
        </nav>

        <div className="home-search-cart">
          <div className="home-search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>

          {user ? (
            <>
              <Link to="/profile" className="home-profile-btn">
                Profile
              </Link>
              <span className="home-user-text">Hi, {user.name}</span>
              <button className="home-logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="home-login-btn">
              Login
            </Link>
          )}

          <Link to="/cart" className="home-cart-icon">
            🛒
            {totalCartItems > 0 && (
              <span className="cart-count-badge">{totalCartItems}</span>
            )}
          </Link>
        </div>
      </header>

      <main className="home-content-layout">
        <aside className="home-sidebar">
          <div className="sidebar-box">
            <h3>Popular Shopping Ideas</h3>
            <ul>
              <li>Beauty</li>
              <li>Fragrances</li>
              <li>Furniture</li>
              <li>Groceries</li>
            </ul>
          </div>

          <div className="sidebar-box">
            <h3>Customer Reviews</h3>

            <div className="star-filter">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= selectedRating ? "active-star" : ""}`}
                  onClick={() =>
                    setSelectedRating(selectedRating === star ? 0 : star)
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

        <section className="home-products-area">
          {loading ? (
            <div className="no-products-box">
              <h2>Loading products...</h2>
            </div>
          ) : error ? (
            <div className="no-products-box">
              <h2>{error}</h2>
            </div>
          ) : products.length === 0 ? (
            <div className="no-products-box">
              <h2>No products found</h2>
              <p>Try changing your search or filter values.</p>
            </div>
          ) : (
            <div className="homepage-products-grid">
              {products.map((product) => {
                const isAdded = cart.some((item) => item.id === product.id);

                return (
                  <div className="homepage-product-card" key={product.id}>
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

                        <h2 className="homepage-price">₹{product.price}</h2>

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