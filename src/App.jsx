import React from 'react'

import Layout from "./components/Layout/Layout";
import {UserAuthContextProvider} from "./context/UserAuthContextProvider.jsx";

const App = () => {
    return <UserAuthContextProvider><Layout></Layout></UserAuthContextProvider>
}

export default App