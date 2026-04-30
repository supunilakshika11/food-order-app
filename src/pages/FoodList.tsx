import { useMemo, useState } from "react";
import { useCart } from "../context/CartContext";

const pizzaImg = new URL("../assets/pizza.jpg", import.meta.url).href;
const saladImg = new URL("../assets/salad.jpg", import.meta.url).href;
const spaghettiImg = new URL("../assets/spaghetti.jpg", import.meta.url).href;
const fallbackImg = new URL("../assets/hero.png", import.meta.url).href;

const foodCatalog = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Fresh mozzarella, basil, and homemade tomato sauce.",
    price: 12.99,
    category: "Pizza",
    image: pizzaImg,
  },
  {
    id: 2,
    name: "Chicken Caesar Salad",
    description:
      "Crisp romaine, grilled chicken, parmesan, and creamy Caesar dressing.",
    price: 10.49,
    category: "Salad",
    image: saladImg,
  },
  {
    id: 3,
    name: "Beef Burger",
    description:
      "Juicy beef patty, cheddar, caramelized onions, and secret sauce.",
    price: 11.99,
    category: "Burger",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Spaghetti Bolognese",
    description: "Slow-simmered meat sauce over al dente pasta with parmesan.",
    price: 13.49,
    category: "Pasta",
    image: spaghettiImg,
  },
  {
    id: 5,
    name: "Grilled Salmon",
    description: "Tender salmon with lemon butter, served with seasonal greens.",
    price: 16.99,
    category: "Seafood",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
  },
];

export default function FoodList() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [selectedFoodId, setSelectedFoodId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const { addToCart } = useCart();

  const categories = [
    "All",
    ...Array.from(new Set(foodCatalog.map((item) => item.category))),
  ];

  const filteredFoods = useMemo(() => {
    return foodCatalog.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

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
    <div className="section-card">
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h1 className="page-heading">🍔 Food Menu</h1>
        <p className="page-copy">
          Browse our delicious dishes, filter by category, and add your
          favorites to the cart.
        </p>
      </div>

      {message && <div className="toast-message">{message}</div>}

      <div className="search-row">
        <input
          className="search-input"
          placeholder="Search foods..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <div className="filter-pill-group">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={
                category === selectedCategory
                  ? "filter-pill active"
                  : "filter-pill"
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="cards-grid">
        {filteredFoods.map((food) => {
          const qty = quantities[food.id] ?? 1;

          return (
            <article key={food.id} className="food-card">
              <img
                className="food-image"
                src={food.image || fallbackImg}
                alt={food.name}
                onError={(event) => {
                  const target = event.target as HTMLImageElement;
                  if (target.src !== fallbackImg) {
                    target.src = fallbackImg;
                  }
                }}
              />

              <h3>🍽 {food.name}</h3>

              <p style={{ color: "#555" }}>{food.description}</p>

              <p style={{ fontWeight: 600 }}>
                Price: ${food.price.toFixed(2)}
              </p>

              {selectedFoodId === food.id && (
                <div className="food-detail-panel">
                  <div className="food-detail-row">
                    <span className="detail-label">Category</span>
                    <span>{food.category}</span>
                  </div>

                  <div className="food-detail-row">
                    <span className="detail-label">Description</span>
                    <span>{food.description}</span>
                  </div>

                  <div className="food-detail-row">
                    <span className="detail-label">Ready in</span>
                    <span>20-30 min</span>
                  </div>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <button type="button" onClick={() => changeQty(food.id, -1)}>
                  -
                </button>

                <span>{qty}</span>

                <button type="button" onClick={() => changeQty(food.id, 1)}>
                  +
                </button>
              </div>

              <button
                type="button"
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

              <button
                type="button"
                onClick={() =>
                  setSelectedFoodId(
                    selectedFoodId === food.id ? null : food.id
                  )
                }
                style={{
                  marginTop: 8,
                  padding: "8px 12px",
                  background: "#1d4ed8",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                {selectedFoodId === food.id ? "Hide Details" : "Show Details"}
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}