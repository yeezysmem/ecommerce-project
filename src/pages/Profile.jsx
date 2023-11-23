import React, { useState, useEffect } from "react";

import {
  collection,
  doc,
  query,
  getDocs,
  where,
} from "firebase/firestore/lite";
import { auth, db } from "../firebaseConfigs/firebaseConfig";
import { Container, Grid, Divider } from "@mui/material";
import styled from "styled-components";
import { useUserAuth } from "../context/UserAuthContextProvider.jsx";

const StyledText = styled.p`
  font-family:"SatoshiMedium";
`
const LoginButton = styled.button`
  border: none;
  font-family: "SatoshiMedium";
  font-size: 18px;
  padding: 8px 15px;
  margin-left: 10px;
  border-radius: 8px;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: #000;
    color: #fff;
  }
`;

const StyledUserName = styled.p`
  font-family: "MontserratMedium";
  font-size: 18px;
`;  

const Profile = () => {
  const { user } = useUserAuth();

  const handleLogOut = () => {
    auth.signOut(auth).then(() => {
      navigate("/login");
    });
  };

  return (
    <Container>
      {user && (
        <Grid container justifyContent="center" >
          <Grid item xs={12} sm={10} md={10}>
            <Grid container style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', padding: 40, borderRadius: 8 }}>
              <Grid item xs={3}>
                <img src={user.photoURL} style={{ borderRadius: "50%" }}></img>
              </Grid>

              <Grid item xs={9}>
                <Grid container>
                  <Grid item xs={12}>
                    <StyledUserName>{user.displayName}</StyledUserName>
                  </Grid>
                  <Grid item xs={12}>
                    <p>{user.email}</p>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <LoginButton onClick={handleLogOut}>Log Out</LoginButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
      {!user && <span>You have to auth </span>}
    </Container>
  );
};

export default Profile;
