function ItemSpecs({ product }) {
  return (
    <section className="item-specs-section">
      <div className="about-item-tab-row">
        <button className="about-item-tab active-tab">About this item</button>
      </div>

      <div className="item-specs-card">
        <div className="about-item-top-row">
          <p>Seller assumes all responsibility for this listing.</p>
          <p className="item-number-text">eBay item number: 157797969046</p>
        </div>

        <h2>Item specifics</h2>

        <div className="specs-grid">
          <div><strong>Condition</strong></div>
          <div>
            New with tags: This item is brand new and has never been worn. It
            still has the original tags and/or ... <a href="/">Read more</a>
          </div>

          <div><strong>Pattern</strong></div>
          <div>Solid</div>

          <div><strong>Sleeve Length</strong></div>
          <div>Short Sleeve</div>

          <div><strong>Neckline</strong></div>
          <div>Crew Neck</div>

          <div><strong>Size</strong></div>
          <div>{product.size}</div>

          <div><strong>Color</strong></div>
          <div>Black, White</div>

          <div><strong>Material</strong></div>
          <div>Cotton</div>

          <div><strong>Fabric Type</strong></div>
          <div>Jersey</div>

          <div><strong>Accents</strong></div>
          <div>Logo</div>

          <div><strong>Brand</strong></div>
          <div>{product.brand}</div>

          <div><strong>Fit</strong></div>
          <div>Regular</div>

          <div><strong>Size Type</strong></div>
          <div>Regular</div>

          <div><strong>Type</strong></div>
          <div>T-Shirt</div>

          <div><strong>Department</strong></div>
          <div>Men</div>

          <div><strong>Theme</strong></div>
          <div>Designer</div>

          <div><strong>Season</strong></div>
          <div>Summer, Spring, Fall</div>
        </div>
      </div>
    </section>
  );
}

export default ItemSpecs;