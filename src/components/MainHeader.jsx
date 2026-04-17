import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

function MainHeader({ search, setSearch, totalCartItems }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setSearch(e.target.value);

    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  return (
    <div className="main-header">
      <div className="logo-area">
        <Link to="/" className="ebay-logo">
          <span className="logo-e">e</span>
          <span className="logo-b">b</span>
          <span className="logo-a">a</span>
          <span className="logo-y">y</span>
        </Link>
        <span className="shop-category">Shop by category</span>
      </div>

      <div className="search-area">
        <input
          type="text"
          placeholder="Search for anything"
          value={search}
          onChange={handleChange}
        />
        <select>
          <option>All Categories</option>
          <option>Clothing</option>
          <option>Shoes</option>
          <option>Accessories</option>
        </select>
        <button>Search</button>
      </div>

      <div className="header-right-section">

  {/* LOGIN BUTTON */}
  <Link to="/login" className="login-nav-btn">
    Login
  </Link>

  {/* CART */}
  <Link to="/cart" className="cart-counter-link">
    🛒 {totalCartItems}
  </Link>

</div>
    </div>
  );
}

export default MainHeader;