import React, {useState} from "react";

import {addDoc, collection} from "firebase/firestore";
import {auth, db, storage} from "../firebaseConfigs/firebaseConfig";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Container, Grid, Link, TextField} from "@mui/material";
import {getDownloadURL, ref, uploadBytes, uploadBytesResumable,} from "firebase/storage";
import styled from "styled-components";
import {useUserAuth} from "../context/UserAuthContextProvider.jsx";

const StyledButton = styled.button`
  background-color: #000;
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
  color: #fff;
  font-size: 19px;
  font-family: "MontserratSemiBold";
  margin-left: 10px;
`;

const AddProduct = () => {
    const {user} = useUserAuth();


    // function GetCurrentUser() {
    // const [user, setUser] = useState('')
    //   useEffect(() => {
    //     auth.onAuthStateChanged(userlogged => {
    //       if (userlogged) {
    //         const getUsers = async () => {
    //           const q = query(collection(db, "users"), where("uid", "==", userlogged.uid))
    //           console.log(q)
    //           const data = await getDocs(q);
    //           setUser(data.docs.map((doc) => ({...doc.data(),id:doc.id})));
    //           console.log(data,"data")
    //         }
    //         getUsers()
    //       }
    //       else {
    //         setUser(null)
    //       }
    //     })
    //   }, [])
    //   return user
    // }
    // const loggeduser = GetCurrentUser();
    // console.log(loggeduser);
    const [file, setFile] = useState(""); // progress
    const [percent, setPercent] = useState(0);

    const [imageError, setImageError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const types = ["image/jpeg", "image/png", "image/jpg", "image/gif"];

    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    const handleUpload = () => {
        if (!file) {
            alert("Please upload an image first!");
        }
        const storageRef = ref(storage, `/files/${file.name}`); // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                ); // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                });
            }
        );
    };

    const formik = useFormik({
        initialValues: {
            productTitle: "",
            productType: "",
            brandName: "",
            image: "",
            description: "",
            price: "",
        },
        validationSchema: Yup.object({
            productTitle: Yup.string().min(5, "Must be at least 3 characters"),
            productType: Yup.string(),
        }),
        onSubmit: (values) => {
            const storageRef = ref(storage, `/files/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    ); // update progress
                    setPercent(percent);
                },
                (err) => console.log(err),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        console.log(url);
                    });
                }
            )
            uploadBytes(storageRef, file).then(() => {
                getDownloadURL(storageRef).then((url) => {
                    addDoc(collection(db, "products"), {
                        productTitle: values.productTitle,
                        productType: values.productType,
                        brandName: values.brandName,
                        description: values.description,
                        image: url,
                        price: values.price,
                    });
                });
            });
        },
    });
    return (
        <Container>
            {user && user.email == "yeezysmem@gmail.com" ? (
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container justifyContent="center">
                            <Grid item xs={6} style={{
                                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                padding: 40,
                                borderRadius: 20,
                            }}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <h3>Add Product</h3>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {/* {successMsg && (
                  <>
                    <div>{successMsg}</div>
                  </>
                )} */}
                                    </Grid>
                                    <Grid item xs={12}>
                                        {/* {errorMsg && (
                  <>
                    <div>{errorMsg}</div>
                  </>
                )} */}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <label htmlFor="productTitle">Product Title</label>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="productTitle"
                                                    name="productTitle"
                                                    type="text"
                                                    placeholder="Product title"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.productTitle}
                                                    variant="outlined"
                                                    fullWidth={true}
                                                    margin="normal"
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <label htmlFor="productType">Product Type</label>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="productType"
                                                    name="productType"
                                                    type="text"
                                                    placeholder="Type"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.productType}
                                                    variant="outlined"
                                                    fullWidth={true}
                                                    margin="normal"
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <label htmlFor="brandName">Brand</label>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="brandName"
                                                    name="brandName"
                                                    type="text"
                                                    placeholder="Brand name"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.brandName}
                                                    variant="outlined"
                                                    fullWidth={true}
                                                    margin="normal"
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <label htmlFor="price">Price</label>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="price"
                                                    name="price"
                                                    type="text"
                                                    placeholder="Price"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.price}
                                                    variant="outlined"
                                                    fullWidth={true}
                                                    margin="normal"
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <label htmlFor="description">Description</label>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="description"
                                                    name="description"
                                                    type="text"
                                                    placeholder="Description"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.description}
                                                    variant="outlined"
                                                    fullWidth={true}
                                                    margin="normal"
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <label htmlFor="image">Image</label>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="image"
                                                    name="image"
                                                    type="file"
                                                    onChange={handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.image}
                                                    variant="outlined"
                                                    fullWidth={true}
                                                    margin="normal"
                                                />

                                            </Grid>
                                            <Grid item xs={12}>
                                                <span>{percent}% Uploaded</span>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <StyledButton>
                                            <ButtonText>Add product</ButtonText>
                                        </StyledButton>
                                    </Grid>
                                    <Grid item xs={12}>
                    <span>
                      If you have an Account{" "}
                        <Link to="/login">go to Login page</Link>
                    </span>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            ) : (
                <div>You dont have permissions </div>
            )}
        </Container>
    );
};

export default AddProduct;
