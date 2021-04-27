import { useContext } from "react";
import CartContext from "../context/CartContext";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { IoMdRemove, IoMdAdd } from 'react-icons/io';
import useCart from "../firebase/hooks/useCart";
import calculateTotal from "../utils/calculateTotal";
import removeFromCart from "../firebase/dbhelpers/removeFromCart";
import addToCart from "../firebase/dbhelpers/addToCart";
import { getScoopCounts } from "./IceCreamDetails";

const Cart = () => {
  const { isCartVisible, toggleCart } = useContext(CartContext);
  const { cartItems } = useCart();

  return (
    <div onClick={() => {
      toggleCart();
    }} className={`w-full h-screen fixed top-0 left-0 bg-black bg-opacity-50 ${isCartVisible ? 'block' : 'hidden'}`}>
      <div onClick={(e) => {
        e.stopPropagation();
      }} className="max-w-sm w-full h-full bg-gray-200 absolute right-0 top-0">
        <div className="bg-white py-3 mb-3 ">
          <h1 className="text-center text-3xl font-semibold">Cart</h1>
        </div>
        <ul style={{
          height: "calc(100vh - 160px)",
        }} className="px-2">
          {cartItems.map((cartItem) => {
            console.log(cartItem)
            const scoopCounts = getScoopCounts(cartItem.scoops);
            return (
              <li className="rounded-lg mb-4 overflow-y-auto bg-white shadow-lg p-2" key={cartItem.id}>
                <p className="text-xl font-medium">{cartItem.nickName}</p>
                <div className="pt-1 pb-2 flex flex-col gap-1.5">
                  {Object.keys(scoopCounts).map((key, index) => {
                    return (
                      <div className="flex justify-between items-center" key={key}>
                        <p className="text-purple-500 uppercase tracking-wide text-xs">{scoopCounts[key]} x {key}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex justify-between items-center w-24 rounded bg-opacity-50 bg-pink-300">
                    <CartActionButton onClick={() => {
                      removeFromCart(cartItem.id)
                    }}>
                      <IoMdRemove />
                    </CartActionButton>
                    <span className="text-lg font-medium">
                      {cartItem.count}
                    </span>
                    <CartActionButton onClick={() => {
                      addToCart(cartItem.id)
                    }}>
                      <IoMdAdd />
                    </CartActionButton>
                  </div>
                  <span className="text-base font-semibold font-sans">
                    ₹ {calculateTotal(cartItem) * cartItem.count}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
        <button onClick={() => {
          toggleCart();
        }} className="absolute right-3 top-3">
          <AiOutlineCloseCircle size={26} />
        </button>
      </div>
    </div>
  );
};

const CartActionButton = ({ onClick, children }) => {
  return (
    <button className="p-2 text-pink-700" onClick={onClick}>
      {children}
    </button>
  );
}

export default Cart;