import { iceCreamFirestore } from "..";

const createUser = (doc) => {
  iceCreamFirestore
    .collection("users")
    .doc(doc.uid)
    .set({
      ...doc,
    });
};

export default createUser;
