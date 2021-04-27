import { useEffect } from "react";
import { iceCreamAuth, iceCreamFirestore } from "../firebase";

const Cart = () => {
  useEffect(() => {
    iceCreamFirestore
      .collection("users")
      .doc(iceCreamAuth.currentUser.uid)
      .collection("cart")
      .onSnapshot((snapshot) => {
        snapshot.docs.forEach((doc) => {
          console.log(doc.data)
        })
      });
  }, []);
  return (
    <div className="max-w-xs w-full fixed h-screen">
      <h1>Cart</h1>
    </div>
  );
};

export default Cart;