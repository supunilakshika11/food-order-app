import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="hero">
      <div className="hero-copy">
        <p style={{ margin: 0, color: "#2563eb", fontWeight: 700, letterSpacing: "0.16em" }}>
          Order faster, eat better
        </p>
        <h1 className="hero-title">Fresh meals delivered to your door.</h1>
        <p className="hero-description">
          Discover chef-quality dishes, browse curated menus, and place your order with fast delivery.
          From pizza and burgers to salads and seafood, we make meal planning simple and satisfying.
        </p>
        <div className="hero-actions">
          <Link to="/foods">
            <button className="button-primary">Go to Food List</button>
          </Link>
          <Link to="/order">
            <button className="button-secondary">Checkout Page</button>
          </Link>
        </div>
      </div>
    </div>
  );
}