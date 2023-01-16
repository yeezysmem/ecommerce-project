import React, { useCallback, useEffect, useState } from "react";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfigs/firebaseConfig";
import { Container, Grid } from "@mui/material";
import { useUserAuth } from "../context/UserAuthContextProvider.jsx";
import CartCard from "../common/CartCard/CartCard.jsx";

const Cart = () => {
  const { user } = useUserAuth();
  const [cartData, setCartData] = useState([]);
  const cartArray = [];

  const getCardData = useCallback(() => {
    const path = `cart-${user.uid}`;
    getDocs(collection(db, path)).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        cartArray.push({ ...doc.data(), id: doc.id });
      });
      setCartData(cartArray);
      console.log(cartArray, "cartArray");
    });
  }, [user, cartArray]);

  useEffect(() => {
    getCardData();
  }, [user]);
  console.log(cartData, "cartData");

  const total = cartData.reduce(
    (accumulator, current) =>
      accumulator + current.product.price * current.quantity,
    0
  );

  return (
    <Container maxWidth="xl">
      <Grid container justifyContent="space-beetwen">
        {cartData ? (
          <Grid item xs={12}>
            {cartData.map((item) => (
              <CartCard key={item.id} itemData={item} />
            ))}
          </Grid>
        ) : (
          <p>Your cart is empty</p>
        )}
      </Grid>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <h2>total: {total}</h2>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
