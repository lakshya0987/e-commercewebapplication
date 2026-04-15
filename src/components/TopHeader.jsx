function TopHeader() {
  return (
    <div className="top-header">
      <div className="top-header-left">
        <span>
          Hi! <a href="/">Sign in</a> or <a href="/">register</a>
        </span>
        <a href="/">Deals</a>
        <a href="/">Brand Outlet</a>
        <a href="/">Gift Cards</a>
        <a href="/">Help & Contact</a>
      </div>

      <div className="top-header-right">
        <a href="/">Sell</a>
        <a href="/">Watchlist</a>
        <a href="/">My eBay</a>
        <span>🔔</span>
        <span>🛒</span>
      </div>
    </div>
  );
}

export default TopHeader;