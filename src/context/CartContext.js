import { useState, createContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [isCartVisible, setCartVisible] = useState(false);
  const toggleCart = () => {
    setCartVisible((prev) => !prev);
  }
  return (
    <CartContext.Provider value={{
      isCartVisible,
      toggleCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;