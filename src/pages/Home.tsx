import { Link } from "react-router-dom";
import heroImg from "../assets/hero.png";

export default function Home() {
  return (
    <div
      className="hero hero-grid"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.35), rgba(15, 23, 42, 0.15)), url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="hero-copy">
        <p style={{ margin: 0, color: "#f8fafc", fontWeight: 700, letterSpacing: "0.16em" }}>
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