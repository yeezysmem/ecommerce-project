import React, {useEffect, useState} from 'react'
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebaseConfigs/firebaseConfig";
import {Container, Grid} from "@mui/material";
import {useUserAuth} from "../context/UserAuthContextProvider.jsx";
import styled from 'styled-components'
import CartCard from "../common/CartCard/CartCard.jsx";

const ProductCard = styled.div`
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  background: #1E1F1A ;
  border-radius: 20px;
  padding: 10px;
`;

const Cart = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const {user} = useUserAuth();
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        if (user) {
            const getCardData = async () => {
                const cartArray = [];
                const path = `cart-${user.uid}`;
                getDocs(collection(db, path)).then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        cartArray.push({...doc.data(), id: doc.id});
                    });
                    setCartData(cartArray);
                });
            }
            getCardData();
        }
    }, [user,cartData]);


    return (
        <Container maxWidth="xl">
            <Grid container spacing={12}>
                {cartData ? <div>{cartData.map((item) => (<CartCard key={item.id} itemData={item} />))}</div> : <p>Your cart is empty</p>}
            </Grid>
            <Grid container>
               <Grid item>
                   Total: 2000$
               </Grid>
            </Grid>
        </Container>
    )
}

export default Cart

