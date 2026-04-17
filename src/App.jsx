import { Routes, Route } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import "./App.css";

import { ToastContainer, toast } from "react-toastify";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  const [selectedRating, setSelectedRating] = useState(0);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("https://dummyjson.com/products", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        const normalizedProducts = (data.products || []).map((product) => ({
          ...product,
          price: Number(product.price) || 0,
          rating: Number(product.rating) || 0,
          delivery: product.delivery || 34.64,
          condition: product.condition || "New",
          image:
            product.image ||
            product.thumbnail ||
            product.images?.[0] ||
            "",
          gallery:
            product.gallery && product.gallery.length > 0
              ? product.gallery
              : product.images && product.images.length > 0
              ? product.images
              : [product.image || product.thumbnail || product.images?.[0] || ""],
        }));

        setProducts(normalizedProducts);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong");
          toast.error("Unable to load products");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, []);

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

 const addToCart = (product) => {
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );

    toast.info("Quantity updated");
  } else {
    setCart((prev) => [...prev, { ...product, quantity: 1 }]);
    toast.success("Added to cart");
  }
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
    toast.error("Removed from cart");
  };

  const clearFilters = () => {
    setSelectedRating(0);
    setMinPrice("");
    setMaxPrice("");
    toast.info("Filters cleared");
  };

  const totalCartItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
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
              cart={cart}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              clearFilters={clearFilters}
              loading={loading}
              error={error}
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
              loading={loading}
              error={error}
            />
          }
        />

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

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
}

export default App;