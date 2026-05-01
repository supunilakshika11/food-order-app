import { Link } from "react-router-dom";
import heroImg from "../assets/hero.png";

export default function Home() {
  return (
    <div
      className="hero"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.62), rgba(0, 0, 0, 0.55)), url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="hero-copy">
        <p
          style={{
            margin: 0,
            color: "#ffffff",
            fontWeight: 700,
            letterSpacing: "0.16em",
            textShadow: "0 2px 8px rgba(0,0,0,0.6)",
          }}
        >
          Order faster, eat better
        </p>

        <h1
          className="hero-title"
          style={{
            color: "#ffffff",
            textShadow: "0 3px 12px rgba(0,0,0,0.7)",
          }}
        >
          Fresh meals delivered to your door.
        </h1>

        <p
          className="hero-description"
          style={{
            color: "#f1f5f9",
            textShadow: "0 2px 8px rgba(0,0,0,0.6)",
          }}
        >
          Discover chef-quality dishes, browse curated menus, and place your
          order with fast delivery. From pizza and burgers to salads and
          seafood, we make meal planning simple and satisfying.
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