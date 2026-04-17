import { Routes, Route } from "react-router-dom";
import { useMemo, useState } from "react";
import "./App.css";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import productsData from "./products";

function App() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  // ⭐ Filters
  const [selectedRating, setSelectedRating] = useState(0);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // 🛍 Products normalization
  const products = useMemo(() => {
    return productsData.map((product) => ({
      ...product,
      price: Number(product.price) || 0,
      rating: Number(product.rating) || 0,
      delivery: product.delivery || 34.64,
      condition: product.condition || "Pre-owned",
      image:
        product.image ||
        product.thumbnail ||
        product.images?.[0] ||
        "",
      gallery:
        product.gallery && product.gallery.length > 0
          ? product.gallery
          : [
              product.image ||
                product.thumbnail ||
                product.images?.[0] ||
                "",
            ],
    }));
  }, []);

  // 🔍 Filtering logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesRating =
        selectedRating === 0 || product.rating >= selectedRating;

      const matchesMinPrice =
        minPrice === "" || product.price >= Number(minPrice);

      const matchesMaxPrice =
        maxPrice === "" || product.price <= Number(maxPrice);

      return (
        matchesSearch &&
        matchesRating &&
        matchesMinPrice &&
        matchesMaxPrice
      );
    });
  }, [products, search, selectedRating, minPrice, maxPrice]);

  // 🛒 Cart functions
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // 🔄 Clear filters
  const clearFilters = () => {
    setSelectedRating(0);
    setMinPrice("");
    setMaxPrice("");
  };

  // 🧮 Cart count
  const totalCartItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <Routes>

      {/* 🏠 HOME */}
      <Route
        path="/"
        element={
          <Home
            products={filteredProducts}
            search={search}
            setSearch={setSearch}
            totalCartItems={totalCartItems}
            addToCart={addToCart}
            cart={cart}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            clearFilters={clearFilters}
          />
        }
      />

      {/* 📦 PRODUCT DETAILS */}
      <Route
        path="/product/:id"
        element={
          <ProductDetails
            products={products}
            addToCart={addToCart}
            totalCartItems={totalCartItems}
            search={search}
            setSearch={setSearch}
          />
        }
      />

      {/* 🛒 CART */}
      <Route
        path="/cart"
        element={
          <Cart
            cart={cart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            removeFromCart={removeFromCart}
          />
        }
      />

      {/* 🔐 LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* 🆕 SIGNUP */}
      <Route path="/signup" element={<Signup />} />

    </Routes>
  );
}

export default App;