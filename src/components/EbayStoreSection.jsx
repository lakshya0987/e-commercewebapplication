function EbayStoreSection() {
  const storeItems = [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500",
    "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500",
  ];

  return (
    <section className="ebay-store-section">
      <h2>Similar items from eBay Stores</h2>

      <div className="ebay-store-card">
        <div className="ebay-store-left">
          <div className="ebay-store-logo-box">
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400"
              alt="store"
            />
          </div>

          <div className="ebay-store-text">
            <h3>Starting Something Old</h3>
            <p>98.5% positive</p>
            <p>960 items sold</p>

            <a href="/" className="shop-store-ebay-link">
              Shop store on eBay →
            </a>

            <span className="store-sponsored-text">Sponsored</span>
          </div>
        </div>

        <div className="ebay-store-right">
          {storeItems.map((img, index) => (
            <div className="ebay-store-item-box" key={index}>
              <img src={img} alt={`store-item-${index}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EbayStoreSection;