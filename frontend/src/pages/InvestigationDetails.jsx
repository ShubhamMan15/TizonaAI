import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API = "http://127.0.0.1:8000/api";

function InvestigationDetails() {
    const { id } = useParams();

    const [report, setReport] = useState(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadInvestigation() {
            try {
                const reportResponse = await axios.get(
                    `${API}/investigations/${id}/report`
                );

                const eventsResponse = await axios.get(
                    `${API}/investigations/${id}/events`
                );

                setReport(reportResponse.data);
                setEvents(eventsResponse.data);
            } catch (error) {
                console.error("Failed to load investigation:", error);
            } finally {
                setLoading(false);
            }
        }

        loadInvestigation();
    }, [id]);

    if (loading) {
        return (
            <div className="page-container">
                <h2>Loading investigation...</h2>
            </div>
        );
    }

    if (!report) {
        return (
            <div className="page-container">
                <h2>Investigation not found.</h2>
            </div>
        );
    }

    const threatClass = `badge badge-${report.threat_level}`;

    const statusClass =
        report.status === "new"
            ? "badge badge-new"
            : "badge badge-closed";

    let riskColor = "risk-low";

    if (report.risk_score >= 90)
        riskColor = "risk-critical";
    else if (report.risk_score >= 70)
        riskColor = "risk-high";
    else if (report.risk_score >= 40)
        riskColor = "risk-medium";

    return (
        <div className="page-container">

            <h1>🔎 Investigation #{report.id}</h1>

            <div className="details-grid">

                <div className="details-card">

                    <h2>Investigation Summary</h2>

                    <table className="dashboard-table">
                        <tbody>

                            <tr>
                                <td><strong>IOC</strong></td>
                                <td>{report.ioc}</td>
                            </tr>

                            <tr>
                                <td><strong>Type</strong></td>
                                <td>{report.type}</td>
                            </tr>

                            <tr>
                                <td><strong>Threat Level</strong></td>
                                <td>
                                    <span className={threatClass}>
                                        {report.threat_level}
                                    </span>
                                </td>
                            </tr>

                            <tr>
                                <td><strong>Risk Score</strong></td>
                                <td>
                                    <strong>{report.risk_score}%</strong>

                                    <div className="risk-bar">
                                        <div
                                            className={`risk-fill ${riskColor}`}
                                            style={{
                                                width: `${report.risk_score}%`
                                            }}
                                        />
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td><strong>Reputation</strong></td>
                                <td>{report.reputation}</td>
                            </tr>

                            <tr>
                                <td><strong>Status</strong></td>
                                <td>
                                    <span className={statusClass}>
                                        {report.status}
                                    </span>
                                </td>
                            </tr>

                            <tr>
                                <td><strong>Source</strong></td>
                                <td>{report.source}</td>
                            </tr>

                            <tr>
                                <td><strong>Pulse Count</strong></td>
                                <td>{report.pulse_count}</td>
                            </tr>

                            <tr>
                                <td><strong>Created</strong></td>
                                <td>{report.created_at}</td>
                            </tr>

                        </tbody>
                    </table>

                </div>

                <div className="details-card">

                    <h2>MITRE ATT&CK Mapping</h2>

                    {report.mitre_attack ? (

                        <table className="dashboard-table">
                            <tbody>

                                <tr>
                                    <td><strong>Technique ID</strong></td>
                                    <td>{report.mitre_attack.technique_id}</td>
                                </tr>

                                <tr>
                                    <td><strong>Name</strong></td>
                                    <td>{report.mitre_attack.technique_name}</td>
                                </tr>

                                <tr>
                                    <td><strong>Description</strong></td>
                                    <td>{report.mitre_attack.description}</td>
                                </tr>

                            </tbody>
                        </table>

                    ) : (
                        <p>No MITRE mapping available.</p>
                    )}

                </div>

            </div>

            <div className="details-card" style={{ marginTop: "24px" }}>

                <h2>Investigation Timeline</h2>

                {events.length === 0 ? (

                    <p>No timeline events found.</p>

                ) : (

                    <table className="dashboard-table">

                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Event</th>
                                <th>Description</th>
                            </tr>
                        </thead>

                        <tbody>

                            {events.map((event) => (

                                <tr key={event.id}>
                                    <td>{event.created_at}</td>
                                    <td>{event.event_type}</td>
                                    <td>{event.description}</td>
                                </tr>

                            ))}

                        </tbody>

                    </table>

                )}

            </div>

            <div className="action-buttons">

                <button
                    className="send-button"
                    onClick={() =>
                        window.open(
                            `${API}/investigations/${id}/report/pdf`,
                            "_blank"
                        )
                    }
                >
                    📄 Download PDF
                </button>

                <button
                    className="send-button"
                    onClick={() =>
                        window.open(
                            `${API}/investigations/${id}/report/json`,
                            "_blank"
                        )
                    }
                >
                    📋 View JSON
                </button>

            </div>

        </div>
    );
}

export default InvestigationDetails;
