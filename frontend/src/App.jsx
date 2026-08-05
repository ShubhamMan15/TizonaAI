import { Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";

import Dashboard from "./pages/Dashboard";

import "./App.css";


function App() {


return (

<Layout>


<Routes>


<Route
path="/"
element={<Dashboard />}
/>


</Routes>


</Layout>

);


}


export default App;
