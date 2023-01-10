import React, {useCallback, useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {db,auth} from "../firebaseConfigs/firebaseConfig";
import ProductItem from "../components/ProductItem/ProductItem";
import {Container} from "@mui/material";
import {useUserAuth} from "../context/UserAuthContextProvider.jsx";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
     const {user} = useUserAuth();

    // useEffect(() => {
        const getAllProducts = useCallback(async () => {
            const colRef = collection(db, "products");
            const snapshots = await getDocs(colRef);
            const docs = snapshots.docs.map((doc) => {
                const data = doc.data();
                data.id = doc.id;
                return data;
            });
            setProducts(docs);
        },[user]);

    useEffect(() => {
        getAllProducts();
    }, [getAllProducts]);

    return (
        <Container maxWidth="fluid">
            <ProductItem products={products}/>
        </Container>
    );
};

export default AllProducts;
