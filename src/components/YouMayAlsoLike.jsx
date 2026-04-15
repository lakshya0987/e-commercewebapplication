import { Link } from "react-router-dom";

function YouMayAlsoLike({ items }) {
  return (
    <section className="you-may-like-section">
      <div className="you-may-like-heading">
        <h2>You may also like</h2>
        <a href="/">Feedback on our suggestions</a>
      </div>

      <div className="you-may-like-grid">
        {items.map((item) => (
          <Link to={`/product/${item.id}`} className="you-may-like-card" key={item.id}>
            <div className="you-may-like-img-box">
              <img src={item.image} alt={item.title} />
              <button
                className="wish-circle-btn"
                onClick={(e) => e.preventDefault()}
              >
                ♡
              </button>
            </div>

            <h4>{item.title}</h4>
            <p>{item.condition}</p>
            <h3>${item.price}</h3>
            <span>+ ${item.delivery} delivery</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default YouMayAlsoLike;