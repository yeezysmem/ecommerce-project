import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Container, Grid, } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { auth } from "../../firebaseConfigs/firebaseConfig";
import styled from "styled-components";
import { useUserAuth } from "../../context/UserAuthContextProvider.jsx";

const StyledHeader = styled.nav`
  display: flex;
  position: static;
  margin-bottom: 80px;
  padding: 15px 0;
  border-bottom: 0.5px solid #F4F4F4;
`;


const StyledLogo = styled.div`
  font-size: 30px;
  font-family: "MontserratSemiBold";
  cursor: pointer;
  transition: 0.3s;
  span {
    color: #D0FD11;
    transition: 0.3s;
  }
  &:hover {
    padding-top: 10px;
    transition: 0.3s;
  }
 
  &:hover span {
    color: #000;
    transition: 0.3s;
  }
`;

const LoginButton = styled.button`
  border: none;
  font-family: "MontserratMedium";
  font-size: 18px;
  padding: 8px 15px;
  margin-left: 10px;
  border-radius: 8px;
  align-items: center;

  &:hover {
    background: #000;
    color: #fff;
  }
`;

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Header = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const { user } = useUserAuth();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const navigate = useNavigate();

    const handleLogOut = () => {
        auth.signOut(auth).then(() => {
            navigate("/login");
        });
    };


    return (
        <StyledHeader>
            <Container maxWidth="fluid">
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item xs={3}>
                        <Link to="/">
                            <StyledLogo>BR.<span>F</span></StyledLogo>
                        </Link>
                    </Grid>
                    {!user && (
                        <Grid item>
                            <Grid container alignItems="center" justifyContent="center">
                                <Grid item>
                                    <AccountCircleIcon fontSize="medium" />
                                </Grid>
                                <Grid item>
                                    <Link to="/login">
                                        <LoginButton>Login</LoginButton>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                    {user && (
                        <Grid item>
                            <Grid container alignItems="center" justifyContent="space-between" columnSpacing={1}>
                                <Grid item>
                                    <Link to="/addProduct">
                                        <AddBoxOutlinedIcon fontSize='medium' />
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to="/cart">
                                        <ShoppingBagOutlinedIcon fontSize='medium' />
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to="/profile">
                                        <img
                                            style={{ borderRadius: 50}}
                                            width={25}
                                            height={25}
                                            src={user.photoURL}
                                        />
                                    </Link>
                                </Grid>
                                {/* <LoginButton onClick={handleLogOut}>Log Out</LoginButton> */}
                                </Grid>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </StyledHeader>
    );
};

export default Header;
{
    /* <span>{user.displayName}</span> */
}
