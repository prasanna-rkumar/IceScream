import { Link } from "react-router-dom"
import { FaShoppingBag } from "react-icons/fa";
import Cart from "./Cart";
import { useContext } from "react";
import CartContext, { CartProvider } from "../context/CartContext";

const NavBar = () => {
  const { toggleCart } = useContext(CartContext);
  return (
    <nav className="fixed bg-pink-700 z-40 top-0 left-0 h-16 w-full border-b-2 border-pink-600 border-opacity-50 flex justify-between gap-4 items-center px-4">
      <Link to="/">
        <div className="flex gap-2 items-center">
          <img
            className="cursor-pointer"
            width={42}
            height={42}
            src="/logo.svg"
            alt="logo"
          />
          <h1 className="text-2xl font-semibold text-pink-50">
            Ice Scream
            </h1>
        </div>
      </Link>
      <button onClick={() => toggleCart()} className="p-2 bg-opacity-50 bg-pink-300 rounded-full hover:shadow-lg">
        <FaShoppingBag color="white" size={26} />
      </button>
      <Cart />
    </nav>
  );
}

const NavBarWithProvider = () => (
  <CartProvider>
    <NavBar />
  </CartProvider>
);

export default NavBarWithProvider;
