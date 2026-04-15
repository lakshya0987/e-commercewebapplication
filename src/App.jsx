import { Routes, Route } from "react-router-dom";
import { useMemo, useState } from "react";
import "./App.css";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import productsData from "./products";

function App() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  const products = useMemo(() => {
    return productsData.map((product) => ({
      ...product,
      price: Number(product.price) || 0,
      rating: Number(product.rating) || 0,
      delivery: product.delivery || 34.64,
      condition: product.condition || "Pre-owned",
      image: product.image || product.thumbnail || product.images?.[0] || "",
      gallery:
        product.gallery && product.gallery.length > 0
          ? product.gallery
          : [product.image || product.thumbnail || product.images?.[0] || ""],
    }));
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

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
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            products={filteredProducts}
            search={search}
            setSearch={setSearch}
            totalCartItems={totalCartItems}
            addToCart={addToCart}
          />
        }
      />

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
    </Routes>
  );
}

export default App;