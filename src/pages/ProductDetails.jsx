import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfigs/firebaseConfig";
import { Container, Grid } from "@mui/material";
import { Rings } from "react-loader-spinner";
import { useUserAuth } from "../context/UserAuthContextProvider.jsx";
import styled from "styled-components";

const StyledButton = styled.button`
  margin-top: 40px;
  background-color: #000;
  padding: 15px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s ease;
  border:none;
  &:hover {
    transition: all 0.5s ease;
    background-color: #D0FD11;
  }
  &:hover span {
    color: #000;
    transition: all 0.5s ease;
  }
 
`;

const ButtonText = styled.span`
  color: #fff;
  font-size: 19px;
  font-family: "SatoshiMedium";
  margin-left: 10px;
  transition: all 0.5s ease;
  

`;

const StyledText = styled.p`
  font-family: "SatoshiBold";
  font-size: 16px;
  color: #1a1a1a;
  padding: 5px 0;
  span {
    font-family: "SatoshiBold";
    font-size: 20px;
    color: #1a1a1a;
  }
`;

const StyledTitle = styled.h2`
  font-family: "SatoshiBold";
  font-size: 40px;
  color: #1a1a1a;
  padding: 5px 0;
  span {
    color: #D0FD11;
  }
  
`;

const ProductDetails = ({ products }) => {
  const [product, setProduct] = useState("");
  const { user } = useUserAuth();
  const [successMsg, setSuccessMsg] = useState("");

  function GetCurrentProduct() {
    useEffect(() => {
      const getProduct = async () => {
        const docRef = doc(db, `products/${id}`);
        const docSnap = await getDoc(docRef);
        setProduct(docSnap.data());
      };
      getProduct();
    }, [user]);
    return product;
  }

  const AddToCart = () => {
    if (user) {
      addDoc(collection(db, `cart-${user.uid}`), {
        product,
        quantity: 1,
      }).then(() => {
        setSuccessMsg(`Product ${product.productTitle} 1x added to cart`);
      });
    }
  };
  GetCurrentProduct();

  const { id } = useParams();

  return (
    <Container>
      {product ? (
        <Grid container key={id} columnSpacing={6}>
          <Grid item xs={12} sm={6}>
            <img
              src={product.image}
              style={{
                width: "100%",
                height: "auto",
              }}
              alt="image"
            ></img>
          </Grid>
          <Grid item xs={12} sm={6}>
            <p>{successMsg}</p>
            <StyledTitle>{product.productTitle}<span>.</span> </StyledTitle>
            <StyledText>Brand: <span>{product.brandName}</span></StyledText>
            <h3>{product.description}</h3>
            <StyledText>Price: <span>{product.price}</span></StyledText>
            <Grid item xs={12}>
              {" "}
              <StyledButton onClick={AddToCart}>
                <ButtonText>Add to cart</ButtonText>
              </StyledButton>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Rings
          height="80"
          width="80"
          color="#000000"
          radius="6"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="rings-loading"
        />
      )}
    </Container>
  );
};

export default ProductDetails;
