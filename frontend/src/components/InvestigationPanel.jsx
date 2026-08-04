function InvestigationPanel({ investigation }) {

  if (!investigation) {
    return null;
  }

  return (
    <div className="card">

      <h2>Investigation Details</h2>

      <p>
        <strong>IOC:</strong>{" "}
        {investigation.ioc}
      </p>

      <p>
        <strong>Type:</strong>{" "}
        {investigation.type}
      </p>

      <p>
        <strong>Threat Level:</strong>{" "}
        {investigation.threat_level}
      </p>

      <p>
        <strong>Risk Score:</strong>{" "}
        {investigation.risk_score}/100
      </p>

      <p>
        <strong>Reputation:</strong>{" "}
        {investigation.reputation}
      </p>

      <p>
        <strong>Source:</strong>{" "}
        {investigation.source}
      </p>

      <p>
        <strong>Pulse Count:</strong>{" "}
        {investigation.pulse_count}
      </p>


      <h3>MITRE ATT&CK</h3>

      {
        investigation.mitre_attack?.map(
          (technique, index) => (

            <div key={index}>

              <strong>
                {technique.technique_id}
              </strong>

              {" - "}

              {technique.technique_name}

              <p>
                {technique.description}
              </p>

            </div>

          )
        )
      }

    </div>
  );
}


export default InvestigationPanel;
