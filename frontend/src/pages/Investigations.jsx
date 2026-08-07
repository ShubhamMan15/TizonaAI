import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "http://127.0.0.1:8000/api";

function Investigations() {
    const navigate = useNavigate();

    const [investigations, setInvestigations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${API}/investigations`)
            .then((res) => {
                setInvestigations(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="page-container">
                <h1>🔎 Investigation Center</h1>
                <p>Loading investigations...</p>
            </div>
        );
    }

    return (
        <div className="page-container">

            <h1>🔎 Investigation Center</h1>

            <p>
                Manage security investigations, timelines and analyst findings.
            </p>

            <table className="dashboard-table">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>IOC</th>
                        <th>Type</th>
                        <th>Risk</th>
                        <th>Status</th>
                        <th>Source</th>
                    </tr>
                </thead>

                <tbody>

                    {investigations.length === 0 ? (
                        <tr>
                            <td colSpan="6">
                                No investigations found.
                            </td>
                        </tr>
                    ) : (
                        investigations.map((item) => (

                            <tr
                                key={item.id}
                                onClick={() =>
                                    navigate(`/investigations/${item.id}`)
                                }
                                style={{
                                    cursor: "pointer"
                                }}
                            >

                                <td>{item.id}</td>

                                <td>{item.ioc}</td>

                                <td>{item.ioc_type}</td>

                                <td>{item.risk_score}</td>

                                <td>{item.status}</td>

                                <td>{item.source}</td>

                            </tr>

                        ))
                    )}

                </tbody>

            </table>

        </div>
    );
}

export default Investigations;
