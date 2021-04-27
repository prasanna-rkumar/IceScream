import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { iceCreamAuth, iceCreamFirestore } from "..";
import iceCreamsByIds from "../../graphql/queries/icecreamsByIds";

const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [dbCartItems, setDbCartItems] = useState([]);
  const [fetchCartItems, { data, loading, error }] = useLazyQuery(iceCreamsByIds);

  useEffect(() => {
    if (dbCartItems.length === 0) {
      setCartItems([]);
      return;
    };
    if (error || loading || !data) return;

    const { presetIcecreams } = data;
    setCartItems(
      () => presetIcecreams.map((presetIcecream) => {
        let temp = { ...presetIcecream }
        for (let i = 0; i < dbCartItems.length; i++) {
          if (temp.id === dbCartItems[i].id) {
            temp.count = dbCartItems[i].count;
            break;
          }
        }
        console.log(temp)
        return temp;
      })
    )
  }, [dbCartItems, data, loading, error]);

  useEffect(() => {
    const unsub = iceCreamFirestore
      .collection("users")
      .doc(iceCreamAuth.currentUser?.uid)
      .collection("cart")
      .onSnapshot((snapshot) => {

        const temp = [];
        snapshot.docs.forEach((doc) => {
          temp.push(doc.data())
        })
        setDbCartItems(temp);
        if (temp.length > 0) {
          fetchCartItems({
            variables: { ids: temp.map(({ id }) => id) }
          });
        }
      });
    return () => unsub();
  }, [fetchCartItems]);
  return { cartItems };
};

export default useCart;
