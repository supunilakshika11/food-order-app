import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function Order() {
  const { cart, clearCart } = useCart();
  const [ordered, setOrdered] = useState(false);

  const placeOrder = () => {
    if (cart.length === 0) return;

    setOrdered(true);
    clearCart(); // ✅ cart empty after order
  };

  return (
    <div>
      <h1>💳 Checkout</h1>

      {cart.length === 0 && !ordered && <p>Cart is empty</p>}

      {cart.map((item, i) => (
        <div key={i}>{item.title}</div>
      ))}

      <button onClick={placeOrder}>
        Place Order
      </button>

      {ordered && <h2>✅ Order Placed Successfully!</h2>}
    </div>
  );
}