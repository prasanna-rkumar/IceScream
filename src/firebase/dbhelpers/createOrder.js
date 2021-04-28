import { iceCreamAuth, iceCreamFirestore } from "..";

const createOrder = (doc) => {
  iceCreamFirestore
    .collection("users")
    .doc(iceCreamAuth.currentUser?.uid)
    .collection("orders")
    .add({
      ...doc,
    });
};

export default createOrder;
