import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfigs/firebaseConfig";
import { Container, Grid } from "@mui/material";
import { Rings } from "react-loader-spinner";
import { useUserAuth } from "../context/UserAuthContextProvider.jsx";
import styled from "styled-components";
import SelectSize from "../common/SelectSize/SelectSize.jsx";

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
  border: none;
  border-radius:100px;

  &:hover {
    transition: all 0.5s ease;
    background-color: #d0fd11;
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
    color: #d0fd11;
  }
`;

const ProductDetails = ({ products }) => {
  const [product, setProduct] = useState("");
  const { user } = useUserAuth();
  const [successMsg, setSuccessMsg] = useState("");

  const sizes = [
    "EU 38",
    "EU 39",
    "EU 40",
    "EU 41",
    "EU 42",
    "EU 43",
    "EU 44",
    "EU 45",
    "EU 46",
    "EU 47",
    "EU 48",
    "EU 49",
    "EU 50",
    "EU 51",
    "EU 52",
  ];

  const handleSizeSelection = (selectedSize) => {
    console.log("Selected Size:", selectedSize);
    // You can save this to state or use it to update the cart
  };

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
    if (!user) {
      alert("Please login to add items to cart");
      navigate("/login"); // Перенаправлення на сторінку логіну
      return;
    }
  };
  GetCurrentProduct();

  const { id } = useParams();

  return (
    <Container>
      {product ? (
        <Grid container key={id} columnSpacing={6}>
          <Grid item xs={12} sm={12} md={6}>
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
            <StyledTitle>
              {product.productTitle}
              <span>.</span>{" "}
            </StyledTitle>
            <StyledText>
              <span>{product.brandName}</span>
            </StyledText>
            <h3>{product.description}</h3>
            <StyledText>
              {" "}
              <span>{product.price}</span>
            </StyledText>
            <Grid item xs={12}>
              {" "}
            </Grid>
            <SelectSize sizes={sizes} onSizeSelect={handleSizeSelection} />
            <StyledButton onClick={AddToCart}>
            <ButtonText>{user ? "Add to cart" : "Login to purchase"}</ButtonText>
            </StyledButton>
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
