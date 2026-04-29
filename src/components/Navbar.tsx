import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Home
        </NavLink>
        <NavLink to="/foods" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Foods
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? "nav-link active cart-pill" : "nav-link cart-pill"
          }
        >
          🛒 Cart ({cart.length})
        </NavLink>
        <NavLink to="/order" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Checkout
        </NavLink>
      </div>

      <div className="user-actions">
        <span style={{ color: "#e2e8f0", fontWeight: 600 }}>Hi, Admin User</span>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
