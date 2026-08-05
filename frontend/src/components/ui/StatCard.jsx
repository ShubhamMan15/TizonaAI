function StatCard({
    title,
    value,
    icon,
    severity
}) {

return (

<div className={`stat-card ${severity || ""}`}>

<div className="stat-icon">
{icon}
</div>


<div>

<h3>
{title}
</h3>

<p>
{value}
</p>

</div>


</div>

);

}


export default StatCard;
