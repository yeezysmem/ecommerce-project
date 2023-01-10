import React, { useState, useEffect } from "react";

import {
  collection,
  doc,
  query,
  getDocs,
  where,
} from "firebase/firestore/lite";
import { auth, db } from "../firebaseConfigs/firebaseConfig";
import { Container, Grid,Divider } from "@mui/material";
import styled from "styled-components";
import {useUserAuth} from "../context/UserAuthContextProvider.jsx";

const StyledText = styled.p`
  font-family:"MontserratSemiBold";
`

const Profile = () => {
  const {user} = useUserAuth();

  return (
    <Container>
      {user && (
        <Grid container justifyContent="center" >
          <Grid item xs={6}>
            <Grid container style={{boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', padding:40, borderRadius:8}}>
              <Grid item xs={12}>
                <img src={user.photoURL} style={{borderRadius:4}}></img>
              </Grid>
              <Grid item xs={6}>
                <StyledText>Your Name</StyledText>
              <Divider />
              </Grid>
              <Grid item xs={6}>
                <p>{user.displayName}</p>
                <Divider />
              </Grid>
              <Grid item xs={6}>
                <StyledText>Your Email</StyledText>
              <Divider />
              </Grid>
              <Grid item xs={6}>
                <p>{user.email}</p>
              <Divider />
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
