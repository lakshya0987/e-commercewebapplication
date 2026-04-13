import { useState } from "react";
import products from "../products";
import Sidebar from "../components/Sidebar";
import ProductsList from "../components/ProductsList";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Home = ({ addToCart, cart }) => {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesMin =
      minPrice === "" || product.price >= Number(minPrice);

    const matchesMax =
      maxPrice === "" || product.price <= Number(maxPrice);

    const validRange =
      minPrice === "" ||
      maxPrice === "" ||
      Number(minPrice) <= Number(maxPrice);

    const matchesRating =
      selectedRating === 0 || product.rating >= selectedRating;

    return (
      matchesSearch &&
      matchesMin &&
      matchesMax &&
      validRange &&
      matchesRating
    );
  });

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} setSearch={setSearch} />

      <div className="products-page">
        <div className="shop-layout">
          <Sidebar
            className={showSidebar ? "sidebar show" : "sidebar"}
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
          />

          <ProductsList
            products={filteredProducts}
            addToCart={addToCart}
            cart={cart}   // 🔥 IMPORTANT
          />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;