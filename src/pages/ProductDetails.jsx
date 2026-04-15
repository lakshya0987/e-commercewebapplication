import { useParams } from "react-router-dom";
import { useMemo } from "react";
import TopHeader from "../components/TopHeader";
import MainHeader from "../components/MainHeader";
import SuggestionBar from "../components/SuggestionBar";
import SingleProductGallery from "../components/SingleProductGallery";
import SingleProductInfo from "../components/SingleProductInfo";
import Footer from "../components/Footer";

function ProductDetails({
  products,
  addToCart,
  totalCartItems,
  search,
  setSearch,
}) {
  const { id } = useParams();

  const product = products.find((item) => String(item.id) === String(id));

  const similarProducts = useMemo(() => {
    if (!product) return [];
    return products.filter((item) => item.id !== product.id).slice(0, 6);
  }, [products, product]);

  if (!product) {
    return (
      <div className="page-wrapper">
        <TopHeader />
        <MainHeader
          search={search}
          setSearch={setSearch}
          totalCartItems={totalCartItems}
        />
        <div className="not-found-box">
          <h2>Product not found</h2>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <TopHeader />
      <MainHeader
        search={search}
        setSearch={setSearch}
        totalCartItems={totalCartItems}
      />

      <SuggestionBar />

      <section className="single-product-page">
        <div className="single-product-layout">
          <SingleProductGallery product={product} />
          <SingleProductInfo
            product={product}
            addToCart={addToCart}
            similarProducts={similarProducts}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ProductDetails;