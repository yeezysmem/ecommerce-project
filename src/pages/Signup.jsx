import React, {useState} from "react";

import {useFormik} from "formik";
import * as Yup from "yup";
import {Link, useNavigate} from "react-router-dom";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "../firebaseConfigs/firebaseConfig";
import {Alert, Container, Grid, TextField} from "@mui/material";
import {addDoc, collection} from "firebase/firestore";
import styled from "styled-components";
import {useUserAuth} from "../context/UserAuthContextProvider.jsx";


const SumbitButton = styled.button`
  background-color: #000;
  border-radius: 8px;
  padding: 15px 0;
  width: 100%;
`;
const ButtonText = styled.span`
  color: #fff;
  font-size: 19px;
  font-family: "MontserratSemiBold";
`;
const StyledLabel = styled.label`
  font-family: "MontserratMedium";
  font-size: 17;
`;


const SignupForm = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const [successMsg, setSuccessMsg] = useState("");
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const { signUp } = useUserAuth();

    const onSubmit = async (e) => {
        e.preventDefault()

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                navigate("/login")
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ..
            });


    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // setError("");
        try {
            await signUp(email, password);
            navigate("/");
        } catch (err) {
            // setError(err.message);
        }
    };

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(15, "Must be 15 characters or less")
                .required("Required"),
            lastName: Yup.string()
                .max(20, "Must be 20 characters or less")
                .required("Required"),
            email: Yup.string().email("Invalid email address").required("Required"),
            password: Yup.string()
                .matches(/[0-9]/, "Password requires a number")
                .matches(/[a-z]/, "Password requires a lowercase letter")
                .matches(/[^\w]/, "Password requires a symbol"),
        }),
        onSubmit: async (values) => {

            await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.firstName,
                values.lastName,
                values.password,
                values.cart
            )
                .then((userCredential) => {
                    const user = userCredential.user;
                    addDoc(collection(db, "users"), {
                        email: values.email,
                        password: values.password,
                        firstName: values.firstName,
                        lastName: values.lastName,
                        cart: [],
                    });
                    setSuccessMsg(
                        "New user added successfuly, You will now be automatically redirected to login page."
                    );
                    setTimeout(() => {
                        setSuccessMsg("");
                        navigate("/login");
                    }, 4000);
                })
                .catch((error) => {
                    if (error.message == "Firebase: Error (auth/invalid-email).") {
                        setErrorMsg("Please fill all required fields");
                    }
                    if (error.message == "Firebase: Error (auth/email-already-in-use).") {
                        setErrorMsg("User already exists.");
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
                        xs={5}
                        style={{
                            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                            padding: 40,
                            borderRadius: 20,
                        }}
                    >
                        <Grid container>
                            <Grid item xs={12}>
                                <h2>Hey, We are glad to see you there👋</h2>
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
                                        <StyledLabel htmlFor="firstName">First Name</StyledLabel>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            placeholder="First Name"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.firstName}
                                            variant="outlined"
                                            // helperText={formik.errors.firstName}
                                            // error={formik.errors.firstName}
                                            margin="normal"
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <StyledLabel htmlFor="lastName">Last Name</StyledLabel>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            placeholder="Last Name"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.lastName}
                                            variant="outlined"
                                            fullWidth
                                            // helperText={formik.errors.lastName}
                                            // error={formik.errors.lastName}
                                            margin="normal"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <StyledLabel htmlFor="email">Email</StyledLabel>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="email"
                                            name="email"
                                            type="text"
                                            placeholder="Email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            onBlur={formik.handleBlur}
                                            value={email}
                                            variant="outlined"
                                            fullWidth
                                            helperText={formik.errors.email}
                                            error={formik.errors.email}
                                            margin="normal"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <StyledLabel htmlFor="password">Password</StyledLabel>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            onBlur={formik.handleBlur}
                                            // value={formik.values.password}
                                            variant="outlined"
                                            fullWidth
                                            helperText={formik.errors.password}
                                            error={formik.errors.password}
                                            margin="normal"
                                            // endAdornment={
                                            //   <InputAdornment position="end">
                                            //     <IconButton
                                            //       aria-label="toggle password visibility"
                                            //       onClick={handleClickShowPassword}
                                            //       onMouseDown={handleMouseDownPassword}
                                            //       edge="end"
                                            //     >
                                            //       {showPassword ? <VisibilityOff /> : <Visibility />}
                                            //     </IconButton>
                                            //   </InputAdornment>
                                            // }
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <SumbitButton type="submit">
                                    <ButtonText>Submit</ButtonText>


                                </SumbitButton>
                            </Grid>
                            <button
                                type="submit"
                                onClick={onSubmit}
                            >
                                Sign up
                            </button>
                            <Grid item xs={12} style={{marginTop: 20, textAlign: "center"}}>
                                <span>If you have an Account</span>
                            </Grid>
                            <Grid item xs={12} style={{marginTop: 6, textAlign: "center"}}>
                                <Link to="/login">go to Login page</Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default SignupForm;
