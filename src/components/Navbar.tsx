import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 20,
        padding: 15,
        background: "#111",
      }}
    >
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <Link style={{ color: "white" }} to="/">Home</Link>
        <Link style={{ color: "white" }} to="/foods">Foods</Link>
        <Link style={{ color: "white" }} to="/cart">
          Cart 🛒 ({cart.length})
        </Link>
        <Link style={{ color: "white" }} to="/order">Checkout</Link>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ color: "white", fontWeight: 500 }}>
          Hi, Admin User
        </span>
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 14px",
            border: "1px solid #fff",
            borderRadius: 6,
            background: "transparent",
            color: "white",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
