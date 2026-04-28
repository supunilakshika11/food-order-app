import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { useCart } from "../context/CartContext";

export default function FoodList() {
  const [foods, setFoods] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [message, setMessage] = useState("");
  const { addToCart } = useCart();

  const realFoodList = [
    {
      name: "Margherita Pizza",
      description: "Classic pizza with mozzarella & basil",
      price: 12.99,
    },
    {
      name: "Chicken Caesar Salad",
      description: "Fresh salad with grilled chicken",
      price: 10.49,
    },
    {
      name: "Beef Burger",
      description: "Juicy beef burger with cheese",
      price: 11.99,
    },
    {
      name: "Spaghetti Bolognese",
      description: "Pasta with meat sauce",
      price: 13.49,
    },
    {
      name: "Grilled Salmon",
      description: "Salmon with lemon butter sauce",
      price: 16.99,
    },
  ];

  useEffect(() => {
    api
      .get("/posts")
      .then((res) => {
        setFoods(
          res.data.slice(0, realFoodList.length).map((item: any, index: number) => ({
            id: item.id,
            ...realFoodList[index],
          }))
        );
      })
      .catch(() => setError("Unable to load food menu"));
  }, []);

  const changeQty = (foodId: number, delta: number) => {
    setQuantities((prev) => {
      const current = prev[foodId] ?? 1;
      const updated = Math.max(1, current + delta);

      return {
        ...prev,
        [foodId]: updated,
      };
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>
        🍔 Food Menu
      </h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {message && (
        <p style={{ color: "green", fontWeight: 600 }}>{message}</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 20,
        }}
      >
        {foods.map((food) => {
          const qty = quantities[food.id] ?? 1;

          return (
            <div
              key={food.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 10,
                padding: 15,
                background: "#fff",
              }}
            >
              {/* NAME */}
              <h3>🍽 {food.name}</h3>

              {/* DESCRIPTION */}
              <p style={{ color: "#555" }}>{food.description}</p>

              {/* PRICE */}
              <p style={{ fontWeight: 600 }}>
                Price: ${food.price.toFixed(2)}
              </p>

              {/* QTY CONTROLS */}
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <button onClick={() => changeQty(food.id, -1)}>-</button>
                <span>{qty}</span>
                <button onClick={() => changeQty(food.id, 1)}>+</button>
              </div>

              {/* 🟢 ADD TO CART BUTTON (UPDATED) */}
              <button
                onClick={() => {
                  addToCart({
                    id: food.id,
                    title: food.name,
                    qty: qty,
                    price: food.price,
                  });

                  setMessage(`${qty} x ${food.name} added to cart`);

                  setTimeout(() => setMessage(""), 1500);
                }}
                style={{
                  marginTop: 10,
                  padding: "8px 12px",
                  background: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                Add to Cart 🛒
              </button>

              {/* DETAILS */}
              <button
                onClick={() => setSelectedFood(food)}
                style={{
                  marginTop: 8,
                  padding: "8px 12px",
                  background: "#1d4ed8",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                }}
              >
                Show Details
              </button>
            </div>
          );
        })}
      </div>

      {/* ORDER DETAILS */}
      {selectedFood && (
        <div
          style={{
            marginTop: 20,
            padding: 15,
            border: "1px solid #ddd",
            borderRadius: 10,
          }}
        >
          <h2>Order Details</h2>
          <p>{selectedFood.name}</p>
          <p>Qty: {quantities[selectedFood.id] ?? 1}</p>
          <p>Total: ${(selectedFood.price * (quantities[selectedFood.id] ?? 1)).toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}