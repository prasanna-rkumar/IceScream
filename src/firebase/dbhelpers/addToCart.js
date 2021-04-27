import { firestoreIncrement, iceCreamAuth, iceCreamFirestore } from "..";

const addToCart = async (doc) => {
  const cartReference = iceCreamFirestore
    .collection("users")
    .doc(iceCreamAuth.currentUser.uid)
    .collection('cart');

  const cartItem = await cartReference
    .where('id', '==', doc.id)
    .get();

  if (cartItem.docs.length >= 1) {
    cartReference.doc(cartItem.docs[0].id).update({
      count: firestoreIncrement(1)
    })
  } else {
    cartReference.add({
      ...doc,
      count: 1
    })
  }
};

export default addToCart;
