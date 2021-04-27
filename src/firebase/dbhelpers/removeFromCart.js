import { firestoreIncrement, iceCreamAuth, iceCreamFirestore } from "..";

const removeFromCart = async (doc) => {
  const cartReference = iceCreamFirestore
    .collection("users")
    .doc(iceCreamAuth.currentUser.uid)
    .collection('cart');

  const cartItem = await cartReference
    .where('id', '==', doc.id)
    .get();

  if (cartItem.docs.length >= 1) {
    if (cartItem.docs[0].count > 1) {
      cartReference.doc(cartItem.docs[0].id).update({
        count: firestoreIncrement(-1)
      })
    } else {
      cartReference.doc(cartItem.docs[0].id).delete()
    }
  }
};

export default removeFromCart;
