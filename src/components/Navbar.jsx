import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar, setSearch }) => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="nav-container">

        {/* LOGO */}
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" />
        </div>

        {/* NAV LINKS */}
        <ul className="nav-links">
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/about")}>About</li>
          <li onClick={() => navigate("/contact")}>Contact</li>
          <li onClick={() => navigate("/address")}>Address</li>
        </ul>

        {/* SEARCH */}
        <div className="nav-search">
          <input
            type="text"
            placeholder="Search products..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setSearch(e.target.value);
            }}
          />
          <button type="button">🔍</button>
        </div>

        {/* RIGHT SECTION */}
        <div className="nav-right">
          <div className="cart" onClick={() => navigate("/cart")}>
            🛒
          </div>

          <div className="hamburger" onClick={toggleSidebar}>
            ☰
          </div>
        </div>

      </div>
    </div>
  );
};

export default Navbar;