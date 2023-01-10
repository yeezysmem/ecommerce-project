import React, {useState} from "react";

import {useFormik} from "formik";
import * as Yup from "yup";
import {Link, useNavigate} from "react-router-dom";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup
} from "firebase/auth";
import {Alert, Container, Divider, Grid, TextField} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import SumbitButton from "../common/SumbitButton/SumbitButton";
import styled from "styled-components";
import {useUserAuth} from "../context/UserAuthContextProvider.jsx";

const StyledButton = styled.button`
  background-color: #fff;
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
  color: #000;
  font-size: 19px;
  font-family: "MontserratSemiBold";
  margin-left: 10px;
`;


const Login = () => {
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const { logIn, googleSignIn } = useUserAuth();

    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        // setError("");
        try {
            await logIn(email, password);
            navigate("/");
        } catch (err) {
            console.log(err.message);
        }
    };
    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            await googleSignIn();
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    };

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                navigate("/")
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });

    }
    const navigate = useNavigate();

    const handleGoogleAuth = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                setSuccessMsg("Well done!");
                setTimeout(() => {
                    setSuccessMsg("");
                    navigate("/");
                }, 4000);
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Required"),
            password: Yup.string(),
        }),
        onSubmit: (values) => {
            signInWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setSuccessMsg("Well done!");
                    setTimeout(() => {
                        setSuccessMsg("");
                        navigate("/");
                    }, 4000);
                })
                .catch((error) => {
                    if (error.message == "Firebase: Error (auth/invalid-email).") {
                        setErrorMsg("Please fill all required fields");
                    }
                    if (error.message == "Firebase: Error (auth/user-not-found).") {
                        setErrorMsg("Email not found");
                    }
                    if (error.message == "Firebase: Error (auth/wrong-password).") {
                        setErrorMsg("Wrong password");
                    }
                });
        },
    });

    return (
        <Container>
            <form onSubmit={formik.handleSubmit}>
                <Grid container justifyContent="center">
                    <Grid
                        item
                        sm={5}
                        style={{
                            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                            padding: 40,
                            borderRadius: 20,
                        }}
                    >
                        <Grid container>
                            <Grid item sm={12}>
                                <h2>Sign In</h2>
                            </Grid>
                            <Grid item xs={12}>
                                {successMsg && (
                                    <>
                                        <Alert severity="success">{successMsg}</Alert>
                                    </>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                {errorMsg && (
                                    <>
                                        <Alert severity="error">{errorMsg}</Alert>
                                    </>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <label htmlFor="email">Email</label>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="email"
                                            name="email"
                                            type="text"
                                            placeholder="Email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            onBlur={formik.handleBlur}
                                            // value={formik.values.email}
                                            variant="outlined"
                                            fullWidth
                                            helperText={formik.errors.email}
                                            error={formik.errors.email}
                                            margin="normal"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <label htmlFor="password">Password</label>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            onBlur={formik.handleBlur}
                                            // value={formik.values.password}
                                            variant="outlined"
                                            fullWidth
                                            helperText={formik.errors.password}
                                            error={formik.errors.password}
                                            margin="normal"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <button onClick={handleSubmit}>logiin</button>
                                <SumbitButton buttonText="Sumbit"/>
                                <Divider>or</Divider>
                                <StyledButton onClick={handleGoogleSignIn}><GoogleIcon/><ButtonText>sign in with
                                    Google</ButtonText></StyledButton>
                                <Link to="/signup">Create new Account</Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Login;
