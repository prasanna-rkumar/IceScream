import { useContext, useState } from "react";
import CartContext from "../context/CartContext";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { IoMdRemove, IoMdAdd } from 'react-icons/io';
import calculatePresetTotal from "../utils/calculatePresetTotal";
import { getScoopCounts } from "./IceCreamDetails";
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, isCartVisible, toggleCart, addToCart, removeFromCart, grandTotal } = useContext(CartContext);

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
        <button onClick={() => {
          toggleCart();
        }} className="absolute right-3 top-3">
          <AiOutlineCloseCircle size={26} />
        </button>
        <ul style={{
          height: "calc(100vh - 160px)",
        }} className="px-2 overflow-y-auto">
          {cartItems.map((cartItem) => {
            return (
              <CartItem
                key={cartItem.id}
                cartItem={cartItem}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            );
          })}
        </ul>
        <div className="absolute w-full h-20 box-border p-2 px-4 bg-white bottom-0 right-0 text-2xl font-semibold flex justify-between items-center">
          ₹ {grandTotal}
          <Link to="/checkout">
            <button className="p-2 bg-pink-600 hover:shadow-md text-white rounded uppercase tracking-wide text-sm font-medium">
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const CartItem = ({ cartItem, removeFromCart, addToCart }) => {
  const scoopCounts = getScoopCounts(cartItem.scoops);
  return (
    <li className="rounded-lg mb-4 overflow-y-auto bg-white shadow-lg p-2">
      <p className="text-xl font-medium">{cartItem.nickName}</p>
      <div className="pt-1 pb-2 flex flex-col gap-1.5">
        <Accordian title="Scoops">
          {Object.keys(scoopCounts).map((key, index) => {
            return (
              <div className="flex justify-between items-end py-1" style={{
                borderBottom: "1px solid lightgray"
              }} key={key}>
                <div>
                  <p className="text-purple-500 uppercase tracking-wide text-xs">{key}</p>
                  <p className="text-xs my-2">
                    <span className="px-1 rounded bg-pink-200 border-2 border-pink-400">
                      {scoopCounts[key].count}
                    </span> x  ₹{scoopCounts[key].price}
                  </p>
                </div>
                <p>
                  ₹ {scoopCounts[key].count * scoopCounts[key].price}
                </p>
              </div>
            );
          })}
        </Accordian>
      </div>
      <div>
        <Accordian title="Toppings">
          {cartItem.toppings.map(({ name, price }, index) => {
            return (
              <div className="flex justify-between items-end py-1" style={{
                borderBottom: "1px solid lightgray"
              }} key={name}>
                <div>
                  <p className="text-purple-500 uppercase tracking-wide text-xs">{name}</p>
                </div>
                <p>
                  ₹ {price}
                </p>
              </div>
            );
          })}
        </Accordian>
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
          ₹ {calculatePresetTotal(cartItem) * cartItem.count}
        </span>
      </div>
    </li>
  );
};

const Accordian = ({ title, children }) => {
  const [isExpanded, setExpanded] = useState(true);
  return <div>
    <button onClick={(e) => {
      setExpanded((prev) => !prev);
    }} className="flex justify-between items-center w-full border-gray-300 border-t-2 p-2">
      <h4 className="text-lg font-medium">{title}</h4>
      {
        isExpanded ? <BiUpArrow /> : <BiDownArrow />
      }
    </button>
    <div className={` transform transition-all ${isExpanded ? "block" : "hidden"}`}>
      {children}
    </div>
  </div>
};

const CartActionButton = ({ onClick, children }) => {
  return (
    <button className="p-2 text-pink-700" onClick={onClick}>
      {children}
    </button>
  );
}

export default Cart;