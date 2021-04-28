import { useState, createContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import { iceCreamAuth } from "../firebase";
import addToCartDB from '../firebase/dbhelpers/addToCart';
import removeFromCartDB from '../firebase/dbhelpers/removeFromCart';
import useCart from "../firebase/hooks/useCart";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const history = useHistory();
  const [isCartVisible, setCartVisible] = useState(false);
  const [user, loading] = useAuthState(iceCreamAuth);
  const { cartItems, grandTotal } = useCart(user);


  const addToCart = (id) => {
    if (!loading && !user) {
      history.push('/login');
      return;
    }
    addToCartDB(id)
  }

  const removeFromCart = (id) => {
    if (!loading && !user) {
      history.push('/login');
      return;
    }
    removeFromCartDB(id)
  }

  const toggleCart = () => {
    setCartVisible((prev) => !prev);
  }

  return (
    <CartContext.Provider value={{
      isCartVisible,
      toggleCart,
      addToCart,
      removeFromCart,
      cartItems,
      grandTotal,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;