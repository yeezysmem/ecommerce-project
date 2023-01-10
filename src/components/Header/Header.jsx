import React from "react";
import {Link, useNavigate} from "react-router-dom";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {Container, Grid,} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {auth} from "../../firebaseConfigs/firebaseConfig";
import styled from "styled-components";
import {useUserAuth} from "../../context/UserAuthContextProvider.jsx";

const StyledHeader = styled.nav`
  display: flex;
  position: static;
  margin-bottom: 80px;
  padding: 15px 0;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;


const StyledLogo = styled.div`
  font-size: 30px;
  font-family: "MontserratSemiBold";
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
    const {user} = useUserAuth();

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
                            <StyledLogo>Ecommerce</StyledLogo>
                        </Link>
                    </Grid>
                    {!user && (
                        <Grid item>
                            <Grid container alignItems="center" justifyContent="center">
                                <Grid item>
                                    <AccountCircleIcon fontSize="large"/>
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
                                        <AddCircleIcon fontSize='large'/>
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to="/cart">
                                        <ShoppingBasketIcon fontSize='large'/>
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to="/profile">
                                        <img
                                            style={{borderRadius: 50, border: "1.5px solid #000"}}
                                            width={35}
                                            height={35}
                                            src={user.photoURL}
                                        />
                                    </Link>
                                </Grid>
                                <LoginButton onClick={handleLogOut}>Log Out</LoginButton>
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
