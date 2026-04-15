function SellerInfo() {
  return (
    <section className="seller-section">
      <div className="seller-card">
        <div className="seller-left">
          <h2>About this seller</h2>

          <div className="seller-profile">
            <div className="seller-avatar-image-box">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400"
                alt="seller"
                className="seller-avatar-image"
              />
            </div>

            <div>
              <h3>offmarketsupply</h3>
              <p>1 item sold</p>
            </div>
          </div>

          <p className="joined-text">Joined Jun 2020</p>

          <div className="seller-buttons">
            <button className="seller-primary-btn">Message seller</button>
            <button className="seller-outline-btn">Seller's other items</button>
            <button className="seller-outline-btn">♡ Save seller</button>
          </div>
        </div>

        <div className="seller-right">
          <h2>Seller Feedback</h2>
          <p>No feedback yet</p>
        </div>
      </div>
    </section>
  );
}

export default SellerInfo;