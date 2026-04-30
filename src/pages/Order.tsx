import { FormEvent, useState } from "react";
import { useCart } from "../context/CartContext";

export default function Order() {
  const { cart, clearCart } = useCart();

  const [ordered, setOrdered] = useState(false);
  const [trackingCode, setTrackingCode] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("Credit Card");

  const [cardDetails, setCardDetails] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.qty * (item.price || 0),
    0
  );

  const deliveryFee = cart.length ? 3.99 : 0;
  const totalAmount = subtotal + deliveryFee;

  const isCardPayment =
    paymentMethod === "Credit Card" || paymentMethod === "Debit Card";

  const isCardValid =
    !isCardPayment ||
    (cardDetails.cardName &&
      cardDetails.cardNumber &&
      cardDetails.expiryDate &&
      cardDetails.cvv);

  const canPlaceOrder =
    cart.length > 0 &&
    name &&
    email &&
    phone &&
    address &&
    city &&
    isCardValid;

  const formatCardNumber = (value: string) => {
    const numbersOnly = value.replace(/\D/g, "").slice(0, 16);
    return numbersOnly.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiryDate = (value: string) => {
    const numbersOnly = value.replace(/\D/g, "").slice(0, 4);

    if (numbersOnly.length <= 2) {
      return numbersOnly;
    }

    return `${numbersOnly.slice(0, 2)}/${numbersOnly.slice(2)}`;
  };

  const placeOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canPlaceOrder) return;

    setOrdered(true);
    setTrackingCode(`TRK-${Math.floor(100000 + Math.random() * 900000)}`);
    clearCart();
  };

  return (
    <div className="checkout-layout">
      <div className="checkout-section">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1 className="page-heading">💳 Checkout</h1>
            <p className="page-copy">
              Complete your customer information and confirm your order details.
            </p>
          </div>

          <div style={{ minWidth: 180, alignSelf: "center" }}>
            <span className="price-pill">Total ${totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {cart.length === 0 && !ordered && (
          <p style={{ color: "#64748b" }}>
            Your cart is empty. Add items before placing an order.
          </p>
        )}

        {cart.length > 0 && (
          <form className="checkout-form" onSubmit={placeOrder}>
            <div className="checkout-section">
              <h2>Customer Information</h2>

              <div className="input-group">
                <label>Name</label>
                <input
                  className="input-field"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Full name"
                />
              </div>

              <div className="input-group">
                <label>Email</label>
                <input
                  className="input-field"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                />
              </div>

              <div className="input-group">
                <label>Phone Number</label>
                <input
                  className="input-field"
                  type="tel"
                  value={phone}
                  onChange={(event) =>
                    setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  placeholder="0771234567"
                  maxLength={10}
                />
              </div>
            </div>

            <div className="checkout-section">
              <h2>Delivery Address</h2>

              <div className="input-group">
                <label>Street Address</label>
                <input
                  className="input-field"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  placeholder="123 Main St"
                />
              </div>

              <div className="input-group">
                <label>City</label>
                <input
                  className="input-field"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  placeholder="City"
                />
              </div>
            </div>

            <div className="checkout-section">
              <h2>Payment Method</h2>

              <div className="payment-options">
                {["Credit Card", "Debit Card", "Cash on Delivery"].map(
                  (method) => (
                    <button
                      type="button"
                      key={method}
                      className={
                        paymentMethod === method
                          ? "payment-option active"
                          : "payment-option"
                      }
                      onClick={() => setPaymentMethod(method)}
                    >
                      {method}
                    </button>
                  )
                )}
              </div>

              {isCardPayment && (
                <div className="card-details-box">
                  <h3>Card Details</h3>

                  <div className="input-group">
                    <label>Card Holder Name</label>
                    <input
                      className="input-field"
                      value={cardDetails.cardName}
                      onChange={(event) =>
                        setCardDetails({
                          ...cardDetails,
                          cardName: event.target.value,
                        })
                      }
                      placeholder="Enter card holder name"
                    />
                  </div>

                  <div className="input-group">
                    <label>Card Number</label>
                    <input
                      className="input-field"
                      value={cardDetails.cardNumber}
                      onChange={(event) =>
                        setCardDetails({
                          ...cardDetails,
                          cardNumber: formatCardNumber(event.target.value),
                        })
                      }
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>

                  <div className="card-row">
                    <div className="input-group">
                      <label>Expiry Date</label>
                      <input
                        className="input-field"
                        value={cardDetails.expiryDate}
                        onChange={(event) =>
                          setCardDetails({
                            ...cardDetails,
                            expiryDate: formatExpiryDate(event.target.value),
                          })
                        }
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>

                    <div className="input-group">
                      <label>CVV</label>
                      <input
                        className="input-field"
                        type="password"
                        value={cardDetails.cvv}
                        onChange={(event) =>
                          setCardDetails({
                            ...cardDetails,
                            cvv: event.target.value
                              .replace(/\D/g, "")
                              .slice(0, 3),
                          })
                        }
                        placeholder="123"
                        maxLength={3}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="checkout-section">
              <h2>Order Summary</h2>

              <div
                className="summary-card"
                style={{ background: "#f8fafc", color: "#0f172a" }}
              >
                {cart.map((item) => (
                  <div key={item.id} className="summary-item">
                    <span>
                      {item.title} x{item.qty}
                    </span>
                    <strong>${(item.price * item.qty).toFixed(2)}</strong>
                  </div>
                ))}

                <div className="summary-item">
                  <span>Delivery fee</span>
                  <strong>${deliveryFee.toFixed(2)}</strong>
                </div>

                <div
                  className="summary-item"
                  style={{
                    fontWeight: 700,
                    borderTop: "1px solid #cbd5e1",
                    paddingTop: 10,
                  }}
                >
                  <span>Total</span>
                  <strong>${totalAmount.toFixed(2)}</strong>
                </div>
              </div>
            </div>

            <button
              className="place-order-button"
              type="submit"
              disabled={!canPlaceOrder}
            >
              Place Order
            </button>
          </form>
        )}

        {ordered && (
          <div className="success-banner">
            <h2>✅ Order Placed Successfully!</h2>
            <p>
              Your food is being prepared and will arrive shortly. Thank you for
              ordering with us.
            </p>

            <div className="tracking-card">
              <div className="tracking-row">
                <span>Order Number</span>
                <strong>{trackingCode}</strong>
              </div>

              <div className="tracking-row">
                <span>Estimated Delivery</span>
                <strong>25-35 min</strong>
              </div>

              <div className="tracking-row">
                <span>Current Status</span>
                <strong>Preparing your order</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}