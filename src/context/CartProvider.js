import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("ecoTrackCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("ecoTrackCart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Přidání do košíku
  const addToCart = (product) => {
    setCartItems((prev) => [...prev, { ...product, cartId: Date.now() }]);
  };

  // Odstranění z košíku
  const removeFromCart = (cartId) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  // VÝPOČET STATISTIK
  const stats = useMemo(() => {
    if (cartItems.length === 0) return { score: "A", totalCo2: 0 };

    const scoreMap = { A: 1, B: 2, C: 3, D: 4, E: 5 };
    const reverseMap = { 1: "A", 2: "B", 3: "C", 4: "D", 5: "E" };

    const totalCo2 = cartItems.reduce((sum, item) => sum + item.co2, 0);
    const avgScoreValue = Math.round(
      cartItems.reduce((sum, item) => sum + scoreMap[item.score], 0) /
        cartItems.length,
    );

    return {
      score: reverseMap[avgScoreValue],
      totalCo2: totalCo2.toFixed(2),
    };
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, stats }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
