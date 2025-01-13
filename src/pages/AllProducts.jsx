import React, { useCallback, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfigs/firebaseConfig";
import ProductItem from "../components/ProductItem/ProductItem";
import { Container } from "@mui/material";
import { useUserAuth } from "../context/UserAuthContextProvider.jsx";
import CategoriesFilter from "../common/CategoriesFilter/CategoriesFilter.jsx";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category
  const { user } = useUserAuth();

  const categories = ["Nike", "Addidas", "Solomun", "NewBalance"]; // Example categories

  const getAllProducts = useCallback(async () => {
    const colRef = collection(db, "products");
    let q = colRef;

    if (selectedCategory) {
      // Filter products by selected category
      q = query(colRef, where("category", "==", selectedCategory));
    }

    const snapshots = await getDocs(q);
    const docs = snapshots.docs.map((doc) => {
      const data = doc.data();
      data.id = doc.id;
      return data;
    });
    setProducts(docs);
    setLoading(false);
  }, [selectedCategory]); // Fetch products based on selected category

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category); // Set selected category
  };

  return (
    <Container maxWidth="xl">
      {/* <CategoriesFilter
        categories={categories}
        onSelectCategory={handleCategorySelect}
      /> */}
      <ProductItem products={products} loading={loading} />
    </Container>
  );
};

export default AllProducts;
