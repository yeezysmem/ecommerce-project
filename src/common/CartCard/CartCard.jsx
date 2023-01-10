import React, {useState} from 'react'
import {doc, setDoc,deleteDoc, updateDoc} from "firebase/firestore";
import {db} from "../../firebaseConfigs/firebaseConfig";
import {Grid} from "@mui/material";
import {useUserAuth} from "../../context/UserAuthContextProvider.jsx";

const CartCard = (props) => {
    const {user} = useUserAuth();

    const [productQuantity, setProductQuantity] = useState(props.itemData.quantity);
    const increaseQuantity = async () => {
        setProductQuantity(productQuantity + 1);
        const itemRef = doc(db, `cart-${user.uid}`, `${props.itemData.id}`);
        await updateDoc(itemRef, {
            quantity: productQuantity + 1
        }).then(() => {console.log(`changed quant`)})
    }
    const decreaseQuantity = async () => {
        if (productQuantity > 1) {
            setProductQuantity(productQuantity - 1);
            const itemRef = doc(db, `cart-${user.uid}`, `${props.itemData.id}`);
            await updateDoc(itemRef, {
                quantity: productQuantity - 1
            }).then(() => {console.log(`changed quant`)})
        }
    }
    // const updateQuantity = async () => {
    //     const path = `cart-${itemData.itemData.userId}`;
    //     const docRef = doc(db, path, itemData.itemData.id);
    //     await setDoc(docRef, {
    //         quantity: productQuantity
    //     }, {merge: true});
    // }
    const deleteCartItem = async () => {
        await deleteDoc(doc(db, `cart-${user.uid}`, `${props.itemData.id}`))
            .then(() => {
                console.log("Document successfully deleted!");
            })
    }

    return (
        <Grid>
            <img src={props.itemData.product.image} style={{width:"100%", height:"auto", borderRadius:10}} alt="image"/>
            <h2>{props.itemData.product.productTitle}</h2>
            <p>{props.itemData.product.description}</p>
            <h3>{props.itemData.product.price}$</h3>
            <button onClick={increaseQuantity}>+</button>
            <p>{productQuantity}</p>
            <button onClick={decreaseQuantity}>-</button>
            <button onClick={deleteCartItem}>Delete</button>
        </Grid>
    )
}

export default CartCard