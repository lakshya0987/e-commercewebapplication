import { Link } from "react-router-dom";

function ViewedItemsRow({ items }) {
  return (
    <section className="viewed-row-section">
      <h2>People who viewed this item also viewed</h2>

      <div className="viewed-row">
        {items.map((item) => (
          <Link to={`/product/${item.id}`} className="mini-item-card" key={item.id}>
            <div className="mini-img-box">
              <img src={item.image} alt={item.title} />
            </div>

            <h4>{item.title}</h4>
            <p>${item.price}</p>
            <span>+ ${item.delivery} delivery</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default ViewedItemsRow;