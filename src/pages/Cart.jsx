import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfigs/firebaseConfig";
import { Container, Grid } from "@mui/material";
import { useUserAuth } from "../context/UserAuthContextProvider.jsx";
import CartCard from "../common/CartCard/CartCard.jsx";
import styled from "styled-components";

const StyledTitle = styled.h2`
  margin-top: 10px;
`;

const Cart = () => {
  const { user } = useUserAuth();
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    setLoading(true); // Починаємо завантаження

    // Підписка на зміни в кошику
    const path = `cart-${user.uid}`;
    const unsubscribe = onSnapshot(collection(db, path), (snapshot) => {
      const updatedCartData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCartData(updatedCartData);
      setLoading(false); // Завершуємо завантаження
    });

    return () => unsubscribe(); // Відписка при розмонтуванні компонента
  }, [user]);

  // Функція для обчислення загальної суми
  const totalPrice = () => {
    return cartData.reduce((total, item) => {
      const price = item.product?.price || "0"; // Перевірка доступності ціни
      const numericPrice = parseFloat(price.replace(",", ".").replace(/[^0-9.]/g, "")) || 0;
      return total + numericPrice * (item.quantity || 1);
    }, 0);
  };

  // Оновлюємо загальну суму при зміні cartData
  const total = totalPrice();

  return (
    <Container maxWidth="xl">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Grid container justifyContent="space-between">
            {cartData.length > 0 ? (
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
              <StyledTitle>Total: {total.toFixed(2)} €</StyledTitle>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Cart;
