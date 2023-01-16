import React, { useState } from "react";
import { doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfigs/firebaseConfig";
import { Grid } from "@mui/material";
import { useUserAuth } from "../../context/UserAuthContextProvider.jsx";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

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
    <Grid container direction="row" alignItems="center" justifyContent="center">
      <Grid item xs={1}>
        <img
          src={props.itemData.product.image}
          style={{ width: "100%", height: "auto", borderRadius: 10 }}
          alt="image"
        />
      </Grid>
      <Grid item xs={2}>
        <h2>{props.itemData.product.productTitle}</h2>
      </Grid>
      <Grid item xs={3}>
        <p>{props.itemData.product.description}</p>
      </Grid>
      <Grid item xs={2}>
        <h3>{props.itemData.product.price}$</h3>
      </Grid>
      <Grid item xs={3}>
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <ControlPointIcon onClick={increaseQuantity} fontSize="large" />
          </Grid>
          <Grid item xs={4}>
            <p>{productQuantity}</p>
          </Grid>
          <Grid item xs={4}>
            <RemoveCircleOutlineIcon
              onClick={decreaseQuantity}
              fontSize="large"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1}>
        <DeleteIcon onClick={deleteCartItem} fontSize="large" />
      </Grid>
    </Grid>
  );
};

export default CartCard;
