import { useState } from "react";

function SingleProductGallery({ product }) {
  const images =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.image];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="single-gallery">
      <div className="single-gallery-thumbs">
        {images.map((img, index) => (
          <button
            key={index}
            className={`single-thumb-btn ${
              selectedImage === img ? "single-thumb-active" : ""
            }`}
            onClick={() => setSelectedImage(img)}
          >
            <img src={img} alt={`thumb-${index}`} />
          </button>
        ))}
      </div>

      <div className="single-gallery-main">
        <span className="cart-badge-red">IN 14 CARTS</span>

        <button className="gallery-arrow left-arrow">‹</button>
        <button className="gallery-arrow right-arrow">›</button>

        <div className="single-gallery-top-icons">
          <button>↗</button>
          <button>53 ♡</button>
        </div>

        <img src={selectedImage} alt={product.title} />
      </div>
    </div>
  );
}

export default SingleProductGallery;