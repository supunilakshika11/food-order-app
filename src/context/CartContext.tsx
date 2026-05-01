import { createContext, useContext, useState } from "react";

type CartItem = {
  id: number;
  title: string;
  qty: number;
  price: number;
  image?: string;
};

type AddToCartItem = {
  id: number;
  title: string;
  qty?: number;
  price?: number;
  image?: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: AddToCartItem) => void;
  removeFromCart: (id: number) => void;
  decreaseQty: (id: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: AddToCartItem) => {
    const qtyToAdd = item.qty ?? 1;

    if (qtyToAdd <= 0) return;

    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.id === item.id);

      if (existing) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                qty: cartItem.qty + qtyToAdd,
                price: item.price ?? cartItem.price,
                image: item.image ?? cartItem.image,
              }
            : cartItem
        );
      }

      return [
        ...prev,
        {
          id: item.id,
          title: item.title,
          qty: qtyToAdd,
          price: item.price ?? 0,
          image: item.image,
        },
      ];
    });
  };

  const decreaseQty = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                qty: item.qty - 1,
              }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

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