import { createContext, useContext, useState } from "react";

type CartItem = {
  id: number;
  title: string;
  qty: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  removeFromCart: (id: number) => void;
  decreaseQty: (id: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: any) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // ➕ ADD TO CART (SAFE VERSION)
  const addToCart = (item: Omit<CartItem, "qty"> & { qty?: number }) => {
    const qtyToAdd = item.qty ?? 1;

    if (qtyToAdd <= 0) return;

    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);

      if (existing) {
        return prev.map((c) =>
          c.id === item.id
            ? { ...c, qty: c.qty + qtyToAdd }
            : c
        );
      }

      return [
        ...prev,
        {
          id: item.id,
          title: item.title,
          qty: qtyToAdd,
        },
      ];
    });
  };

  // ➖ DECREASE QTY
  const decreaseQty = (id: number) => {
    setCart((prev) => {
      return prev
        .map((item) =>
          item.id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0);
    });
  };

  // ❌ REMOVE ITEM
  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // 🧹 CLEAR CART
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        decreaseQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}