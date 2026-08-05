import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import "./layout.css";


function Layout({children}){


return (

<div>


<Sidebar/>


<div className="main">


<Topbar/>


<div className="content">

{children}

</div>


</div>


</div>

)


}


export default Layout;
