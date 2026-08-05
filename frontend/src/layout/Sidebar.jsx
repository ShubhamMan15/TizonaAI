import { Link } from "react-router-dom";

import "./layout.css";


function Sidebar(){


return (

<div className="sidebar">


<h2 className="logo">
⚔ TizonaAI
</h2>



<nav>


<Link to="/">
Dashboard
</Link>


<Link to="/investigations">
Investigations
</Link>


<Link to="/threat-intelligence">
Threat Intelligence
</Link>


<Link to="/ioc-explorer">
IOC Explorer
</Link>


<Link to="/mitre">
MITRE ATT&CK
</Link>


<Link to="/reports">
Reports
</Link>


<Link to="/assistant">
AI Assistant
</Link>


<Link to="/settings">
Settings
</Link>



</nav>


</div>

);


}


export default Sidebar;
