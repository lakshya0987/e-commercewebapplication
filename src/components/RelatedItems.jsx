import { Link } from "react-router-dom";

function RelatedItems({ title, items, showSellerInfo = false }) {
  return (
    <section className="related-section">
      <div className="related-heading">
        <div>
          <h2>{title}</h2>
          <p>Sponsored</p>
        </div>

        <a href="/">See all</a>
      </div>

      <div className="related-row scroll-row">
        {items.map((item) => (
          <Link to={`/product/${item.id}`} className="related-card" key={item.id}>
            <div className="related-img-box">
              <img src={item.image} alt={item.title} />
            </div>

            <h4>{item.title}</h4>
            <p>{item.condition}</p>
            <h3>${item.price}</h3>
            <span>+ ${item.delivery} delivery</span>

            {showSellerInfo && (
              <small className="seller-positive-text">
                Seller with 100% positive feedback
              </small>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default RelatedItems;