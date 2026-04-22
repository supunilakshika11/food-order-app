import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, decreaseQty, addToCart } = useCart();
  const navigate = useNavigate();

  // 💰 TOTAL CALCULATION
  const total = cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  const priceTotal = cart.reduce(
    (sum: number, item: any) =>
      sum + item.qty * (item.price || 0),
    0
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>🛒 Cart</h1>

      {cart.length === 0 && (
        <p style={{ color: "gray" }}>Cart is empty</p>
      )}

      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto auto auto auto",
            gap: 10,
            alignItems: "center",
            padding: 12,
            borderBottom: "1px solid #ddd",
          }}
        >
          {/* NAME */}
          <div>
            <h3 style={{ margin: 0 }}>{item.title}</h3>
          </div>

          {/* QTY */}
          <div style={{ fontWeight: 600 }}>
            Qty: {item.qty}
          </div>

          {/* ➖ */}
          <button
            onClick={() => decreaseQty(item.id)}
            style={{
              padding: "6px 10px",
              cursor: "pointer",
            }}
          >
            -
          </button>

          {/* ➕ */}
          <button
            onClick={() =>
              addToCart({
                id: item.id,
                title: item.title,
                qty: 1,
              })
            }
            style={{
              padding: "6px 10px",
              cursor: "pointer",
            }}
          >
            +
          </button>

          {/* ❌ REMOVE */}
          <button
            onClick={() => removeFromCart(item.id)}
            style={{
              padding: "6px 10px",
              cursor: "pointer",
              background: "red",
              color: "white",
              border: "none",
            }}
          >
            Remove
          </button>
        </div>
      ))}

      {/* SUMMARY */}
      {cart.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h3>Total Items: {total}</h3>
          <h3>Total Price: ${priceTotal.toFixed(2)}</h3>

          {/* CHECKOUT BUTTON */}
          <button
            onClick={() => navigate("/order")}
            style={{
              marginTop: 15,
              padding: "10px 18px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Proceed to Checkout 🚀
          </button>
        </div>
      )}
    </div>
  );
}