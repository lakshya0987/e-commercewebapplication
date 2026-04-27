import { Routes, Route } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Wishlist from "./pages/Wishlist";

function App() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("loggedInUser")) || null;
  });

  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("https://dummyjson.com/products?limit=100", {
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
            product.images && product.images.length > 0
              ? product.images
              : [product.thumbnail || ""],
          tags: product.tags || [],
          category: product.category || "",
          stock: Number(product.stock) || 0,
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

  useEffect(() => {
    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      const savedCart =
        JSON.parse(localStorage.getItem(`cart_${user.email}`)) || [];
      setCart(savedCart);

      const savedOrders =
        JSON.parse(localStorage.getItem(`orders_${user.email}`)) || [];
      setOrders(savedOrders);

      const savedWishlist =
        JSON.parse(localStorage.getItem(`wishlist_${user.email}`)) || [];
      setWishlist(savedWishlist);
    } else {
      localStorage.removeItem("loggedInUser");
      setCart([]);
      setOrders([]);
      setWishlist([]);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(cart));
    }
  }, [cart, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`orders_${user.email}`, JSON.stringify(orders));
    }
  }, [orders, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`wishlist_${user.email}`, JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => product.tags?.includes(tag));

      const matchesRating =
        selectedRating === 0 || product.rating >= selectedRating;

      const matchesMinPrice =
        minPrice === "" || product.price >= Number(minPrice);

      const matchesMaxPrice =
        maxPrice === "" || product.price <= Number(maxPrice);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesTags &&
        matchesRating &&
        matchesMinPrice &&
        matchesMaxPrice
      );
    });
  }, [
    products,
    search,
    selectedCategories,
    selectedTags,
    selectedRating,
    minPrice,
    maxPrice,
  ]);

  const addToCart = (product, qty = 1) => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    const stock = Number(product.stock) || 0;

    if (stock === 0) {
      toast.error("Not available");
      return;
    }

    const existing = cart.find((item) => item.id === product.id);
    const currentQty = existing ? existing.quantity : 0;

    if (currentQty + qty > stock) {
      toast.error("No more item is available");
      return;
    }

    if (existing) {
      setCart((prev) =>
        prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        )
      );
      toast.info("Quantity updated");
    } else {
      setCart((prev) => [...prev, { ...product, quantity: qty }]);
      toast.success("Added to cart");
    }
  };

const addToWishlist = (product) => {
  if (!user) {
    toast.error("Please login first");
    return;
  }

  const alreadyExist = wishlist.some((item) => item.id === product.id);

  if (alreadyExist) {
    setWishlist((prev) => prev.filter((item) => item.id !== product.id));
    toast.info("Removed from wishlist");
  } else {
    setWishlist((prev) => [...prev, product]);
    toast.success("Added to wishlist");
  }
};

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
    toast.error("Removed from wishlist");
  };

  const increaseQuantity = (id) => {
    const targetItem = cart.find((item) => item.id === id);

    if (!targetItem) return;

    const stock = Number(targetItem.stock) || 0;

    if (targetItem.quantity >= stock) {
      toast.error("No more item is available");
      return;
    }

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

  const placeOrder = () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const totalAmount = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: cart,
      totalAmount,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    toast.success("Order placed successfully");
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
    setSelectedRating(0);
    setMinPrice("");
    setMaxPrice("");
    toast.info("Filters cleared");
  };

  const handleLogout = () => {
    setUser(null);
    toast.info("Logged out successfully");
  };

  const handleUpdateProfile = (updatedProfile) => {
    setUser(updatedProfile);

    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = savedUsers.map((item) =>
      item.email === updatedProfile.email ? updatedProfile : item
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("loggedInUser", JSON.stringify(updatedProfile));

    toast.success("Profile updated successfully");
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
              allProducts={products}
              search={search}
              setSearch={setSearch}
              totalCartItems={totalCartItems}
              addToCart={addToCart}
              cart={cart}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              clearFilters={clearFilters}
              loading={loading}
              error={error}
              user={user}
              handleLogout={handleLogout}
              wishlist={wishlist}
              addToWishlist={addToWishlist}
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
              user={user}
              handleLogout={handleLogout}
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
              placeOrder={placeOrder}
            />
          }
        />

        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              removeFromWishlist={removeFromWishlist}
              addToCart={addToCart}
              user={user}
            />
          }
        />

        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/profile"
          element={
            <Profile
              user={user}
              handleUpdateProfile={handleUpdateProfile}
            />
          }
        />

        <Route
          path="/orders"
          element={<Orders user={user} orders={orders} />}
        />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
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