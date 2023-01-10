import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  query,
  getDocs,
  where,
} from "firebase/firestore/lite";
import { auth, db } from "../firebaseConfigs/firebaseConfig";
import AllProducts from "./AllProducts";

const Home = () => {

  return <AllProducts />;
};

export default Home;
