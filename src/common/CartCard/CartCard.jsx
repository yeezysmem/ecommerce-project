import React, { useState } from "react";
import styled from "styled-components";
import { doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfigs/firebaseConfig";
import { Grid } from "@mui/material";
import { useUserAuth } from "../../context/UserAuthContextProvider.jsx";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

const ItemTitle = styled.h3`
  font-size: 16px;
  font-family: "SatoshiMedium";
`;

const ItemDescription = styled.p`
  font-size: 16px;
  font-family: "SatoshiMedium";
`;

const ItemPrice = styled.span`
  font-size: 16px;
  font-family: "SatoshiMedium";
`;

const ItemQuantity = styled.span`
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CartCard = (props) => {
  const { user } = useUserAuth();

  const [productQuantity, setProductQuantity] = useState(
    props.itemData.quantity
  );
  const increaseQuantity = async () => {
    setProductQuantity(productQuantity + 1);
    const itemRef = doc(db, `cart-${user.uid}`, `${props.itemData.id}`);
    await updateDoc(itemRef, {
      quantity: productQuantity + 1,
    }).then(() => {
      console.log(`changed quant`);
    });
  };
  const decreaseQuantity = async () => {
    if (productQuantity > 1) {
      setProductQuantity(productQuantity - 1);
      const itemRef = doc(db, `cart-${user.uid}`, `${props.itemData.id}`);
      await updateDoc(itemRef, {
        quantity: productQuantity - 1,
      }).then(() => {
        console.log(`changed quant`);
      });
    }
  };

  const deleteCartItem = async () => {
    await deleteDoc(doc(db, `cart-${user.uid}`, `${props.itemData.id}`)).then(
      () => {
        console.log("Document successfully deleted!");
      }
    );
  };

  return (
    <Grid container direction="row" alignItems="center" justifyContent="center"  columnSpacing={3}  style={{borderBottom:"0.3px solid #1f1f1f", paddingBottom:10, paddingTop:10}}>
      <Grid item xs={2} sm={2} md={1} >
        <img
          src={props.itemData.product.image}
          style={{ width: "100%", height: "auto", borderRadius: 10 }}
          alt="image"
        />
      </Grid>
      <Grid item xs={3}>
        <ItemTitle>{props.itemData.product.productTitle}</ItemTitle>
      </Grid>
      <Grid item xs={3}>
        <ItemPrice>{props.itemData.product.price}</ItemPrice>
      </Grid>
      <Grid item xs={3}>
        <Grid container justifyContent="center">
          <Grid item xs={1}>
            <ControlPointIcon onClick={increaseQuantity} fontSize="medium" style={{ cursor: "pointer" }} />
          </Grid>
          <Grid item xs={4}>
            <ItemQuantity>{productQuantity}</ItemQuantity>
          </Grid>
          <Grid item xs={4}>
            <RemoveCircleOutlineIcon
              onClick={decreaseQuantity}
              fontSize="medium"
              style={{ cursor: "pointer" }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1}>
        <DeleteIcon onClick={deleteCartItem} fontSize="medium" style={{ cursor: "pointer" }} />
      </Grid>
    </Grid>
  );
};

export default CartCard;
