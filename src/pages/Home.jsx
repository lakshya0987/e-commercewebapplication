import { useMemo } from "react";
import TopHeader from "../components/TopHeader";
import MainHeader from "../components/MainHeader";
import SuggestionBar from "../components/SuggestionBar";
import ViewedItemsRow from "../components/ViewedItemsRow";
import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import RelatedItems from "../components/RelatedItems";
import ItemSpecs from "../components/ItemSpecs";
import SizeBanner from "../components/SizeBanner";
import SellerInfo from "../components/SellerInfo";
import EbayStoreSection from "../components/EbayStoreSection";
import YouMayAlsoLike from "../components/YouMayAlsoLike";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Home({ products, search, setSearch, totalCartItems, addToCart }) {
  const product = products[0];

  const otherProducts = useMemo(() => {
    if (!product) return [];
    return products.filter((item) => item.id !== product.id);
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
          <h2>No product found</h2>
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
      <ViewedItemsRow items={otherProducts.slice(0, 6)} />

      <section className="details-main-section">
        <div className="details-main-grid">
          <Link to={`/product/${product.id}`} className="home-main-product-link">
            <ProductGallery product={product} />
          </Link>          <ProductInfo product={product} addToCart={addToCart} />
        </div>
      </section>

      <RelatedItems title="Similar items" items={otherProducts.slice(0, 4)} />

      <SizeBanner />

      <RelatedItems
        title="Inspired by your recent views"
        items={otherProducts.slice(0, 6)}
        showSellerInfo={true}
      />

      <ItemSpecs product={product} />

      <SellerInfo />

      <EbayStoreSection />

      <YouMayAlsoLike items={otherProducts.slice(0, 8)} />

      <Footer />
    </div>
  );
}

export default Home;