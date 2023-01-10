import React from "react";
import styled from "styled-components";
import {Divider, Grid} from "@mui/material";
import {Link} from "react-router-dom";
import {auth} from '../../firebaseConfigs/firebaseConfig'
// img, price, brandName
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const ProductCard = styled.div`
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  background: #1E1F1A ;
  border-radius: 20px;
  padding: 10px;
`;

const ProductBrand = styled.h4`
  font-family: "MontserratRegular";
  color: #fff;
`;

const ProductPrice = styled.p`
  font-family: "MontserratSemiBold";
  font-size: 18px;
  color: #000;
  background: #B7FB34;
  padding: 5px 10px;
  border-radius: 15px;
`;
const StyledText = styled.p`
  font-family: "MontserratSemiBold";
  font-size: 18px;
  color: #fff;
`
const Details = styled.p`
  font-family: "MontserratSemiBold";
  font-size: 18px;
  color: #B7FB34;
`

const ProductItem = ({products}) => {
        return (
            <Grid container justifyContent="flex-start" spacing={5}>
                {products.map((product) => {
                    return (
                        <Grid item xs={2} key={product.id}>
                            <Link to={`/product/${product.id}`}>
                            <ProductCard>
                                <img style={{width:"100%", height:"auto", borderRadius:10}} src={product.image}/>
                                <StyledText>{product.productTitle}</StyledText>
                               <Grid container alignItems="center" justifyContent="space-between">
                                   <Grid item xs={4}>
                                       <ProductPrice>{product.price}$ </ProductPrice>
                                   </Grid>
                                   <Grid item xs={5}>
                                      <Grid container alignItems="center" justifyContent="space-between">
                                          <Grid item xs={9}>
                                                <Details>Details</Details>
                                          </Grid>
                                          <Grid item xs={3}>
                                                <KeyboardDoubleArrowRightIcon style={{color:"#B7FB34"}}/>
                                          </Grid>
                                      </Grid>

                                   </Grid>
                               </Grid>
                            </ProductCard>
                            </Link>
                        </Grid>
                    );
                })}
            </Grid>
        );
    }
;

export default ProductItem;
