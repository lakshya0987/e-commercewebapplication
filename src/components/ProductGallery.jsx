import { useState } from "react";

function ProductGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState(product.gallery[0]);

  return (
    <div className="gallery-section">
      <div className="gallery-thumbnails">
        {product.gallery.map((img, index) => (
          <button
            key={index}
            className={`thumb-btn ${selectedImage === img ? "active-thumb" : ""}`}
            onClick={() => setSelectedImage(img)}
          >
            <img src={img} alt={`thumb-${index}`} />
          </button>
        ))}
      </div>

      <div className="gallery-main-image">
        <img src={selectedImage} alt={product.title} />
      </div>
    </div>
  );
}

export default ProductGallery;