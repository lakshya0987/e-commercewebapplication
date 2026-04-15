function SuggestionBar() {
  const thumbs = [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200",
    "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=200",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=200",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200",
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200",
  ];

  return (
    <div className="suggestion-bar">
      <div className="suggestion-left">
        <span>Find similar items from</span>
        <strong>Starting Something Old (98.5% positive)</strong>
      </div>

      <div className="suggestion-thumbs">
        {thumbs.map((img, index) => (
          <img src={img} alt="thumb" key={index} />
        ))}
      </div>

      <a href="/" className="shop-store-link">
        Shop store on eBay
      </a>

      <span className="sponsored-text">Sponsored</span>
    </div>
  );
}

export default SuggestionBar;