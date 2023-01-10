import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {addDoc, collection, doc, getDoc} from 'firebase/firestore'
import {auth, db} from '../firebaseConfigs/firebaseConfig'
import {Container, Grid} from "@mui/material";
import {Rings} from "react-loader-spinner";
import {useUserAuth} from "../context/UserAuthContextProvider.jsx";
import styled from 'styled-components'
import {remove} from 'firebase/database'


const StyledButton = styled.button`
  background-color: #000;
  border-radius: 8px;
  padding: 15px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const ButtonText = styled.span`
  color: #fff;
  font-size: 19px;
  font-family: "MontserratSemiBold";
  margin-left: 10px;
`;

const ProductDetails = ({products}) => {
    const [product, setProduct] = useState('')
    const {user} = useUserAuth();
    const [successMsg, setSuccessMsg] = useState('');

    function GetCurrentProduct() {
        useEffect(() => {
            const getProduct = async () => {
                const docRef = doc(db, `products/${id}`);
                const docSnap = await getDoc(docRef);
                setProduct(docSnap.data());
            };
            getProduct();
        }, [user])
        return product
    }



    const AddToCart = () => {
        if (user) {
            addDoc(collection(db, `cart-${user.uid}`), {
                product, quantity: 1
            }).then(() => {
                setSuccessMsg('Product added to cart')
            })
        }
    }
    GetCurrentProduct();

    const {id, title} = useParams()

    const handleRemove = () => {
        remove(doc(db, `products/${id}`))
    }
    return (
        <Container >
            {product ? <Grid container key={id} columnSpacing={6}>
                <Grid item xs={6}><img src={product.image} style={{border:"2px solid #000", borderRadius:25, width:"100%", height:"auto"}} alt="image"></img></Grid>
                <Grid item xs={6}>
                    <h1>{product.productTitle}</h1>
                    <h4>Brand: {product.brandName}</h4>
                    <h3>{product.description}</h3>
                    <h3>Price: {product.price}</h3>
                    <Grid item xs={4}> <StyledButton onClick={AddToCart}><ButtonText>Add to cart</ButtonText></StyledButton></Grid>
                    {/*<Grid item xs={4}> <StyledButton onClick={handleRemove}><ButtonText>Remove</ButtonText></StyledButton></Grid>*/}
                </Grid>

            </Grid> : <Rings height="80"
                             width="80"
                             color="#000000"
                             radius="6"
                             wrapperStyle={{}}
                             wrapperClass=""
                             visible={true}
                             ariaLabel="rings-loading"/>}
        </Container>
    )
}

export default ProductDetails