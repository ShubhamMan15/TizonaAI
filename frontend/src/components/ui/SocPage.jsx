function SocPage({title,description,icon}){


return (

<div className="card">

<h1>
{icon} {title}
</h1>


<p>
{description}
</p>


<div
style={{
marginTop:"30px",
padding:"30px",
background:"#0f172a",
borderRadius:"12px"
}}
>

<h2>
Module Status
</h2>

<p>
This module is under active development.
</p>

<p>
TizonaAI AI Threat Hunting Platform
</p>

</div>


</div>

);


}


export default SocPage;
