import React from "react";
import styled from "styled-components";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
// color: #b7fb34;
const ProductCard = styled.div`
    padding: 10px;
    cursor: pointer;
    overflow: hidden;
    height: 370px;
    border-radius: 8px;
    
    &:hover {
      border: 3px dashed #D0FD11;
    }
    p {
      transition: 0.5s;
    }
    &:hover p{
      padding-left: 10px;
    }
    span {
      transition: 0.5s;
    }
    &:hover span {
      transition: 0.5s;
      background: #D0FD11;
      padding-left: 10px;

    }
    &:hover img {
      transform: scale(1.3);
      transition: transform .5s ease;
    }

  `;


const ProductPrice = styled.span`
    font-family: "SatoshiBold";
    font-size: 20px;
    color: #1a1a1a;
    
  `;
const StyledText = styled.p`
    font-family: "SatoshiMedium";
    font-size: 17px;
    color: #1e1f1a;
  `;

const ImageContainer = styled.div`
    width: 100%;
    height: 250px;
    overflow: hidden;
    position: relative;
    border-radius: 8px;
   
  `;

const ProductItem = ({ products }) => {
  return (
    <Grid container justifyContent="flex-start" spacing={2}>
      {products.map((product) => {
        return (
          <Suspense key={product.id} fallback={<Skeleton height={200} width={200} />}>
            <Grid item xs={6} sm={4} md={3} lg={2} key={product.id}>
              <Link to={`/product/${product.id}`}>
                <ProductCard>
                  <ImageContainer>
                    <img
                      style={{ width: "100%", height: "auto",transition: "transform .5s ease", borderRadius: 8 }}
                      src={product.image}
                    />
                  </ImageContainer>
                  <StyledText>{product.productTitle}</StyledText>
                  <Grid
                    container
                  >
                    <Grid item xs={12}>
                      <ProductPrice>{product.price} </ProductPrice>
                    </Grid>
                  </Grid>
                </ProductCard>
              </Link>
            </Grid>
          </Suspense>
        );
      })}
    </Grid>
  );
};
export default ProductItem;
