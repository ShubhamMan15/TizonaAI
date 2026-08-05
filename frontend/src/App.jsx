import { Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";

import Dashboard from "./pages/Dashboard";
import Investigations from "./pages/Investigations";
import ThreatIntel from "./pages/ThreatIntel";
import IOCExplorer from "./pages/IOCExplorer";
import Mitre from "./pages/Mitre";
import Reports from "./pages/Reports";
import Assistant from "./pages/Assistant";
import Settings from "./pages/Settings";


import "./App.css";


function App(){


return (

<Layout>


<Routes>


<Route path="/" element={<Dashboard/>}/>

<Route path="/investigations" element={<Investigations/>}/>

<Route path="/threat-intelligence" element={<ThreatIntel/>}/>

<Route path="/ioc-explorer" element={<IOCExplorer/>}/>

<Route path="/mitre" element={<Mitre/>}/>

<Route path="/reports" element={<Reports/>}/>

<Route path="/assistant" element={<Assistant/>}/>

<Route path="/settings" element={<Settings/>}/>


</Routes>


</Layout>

);


}


export default App;
