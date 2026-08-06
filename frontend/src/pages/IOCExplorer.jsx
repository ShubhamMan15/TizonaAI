import { useState } from "react";
import axios from "axios";

import "../App.css";

const API_BASE = "http://127.0.0.1:8000/api";

function IOCExplorer() {
    const [ioc, setIoc] = useState("");

    const [details, setDetails] = useState(null);

    const [history, setHistory] = useState([]);

    const [related, setRelated] = useState([]);

    const [investigationId, setInvestigationId] = useState(null);

    const investigateIOC = async () => {

        if (!ioc.trim()) return;

        try {

            // Save investigation automatically
            const enrichResponse = await axios.post(
                `${API_BASE}/ioc/enrich`,
                {
                    ioc: ioc
                }
            );

            setDetails(enrichResponse.data);

            setInvestigationId(
                enrichResponse.data.investigation_id
            );

            const historyResponse = await axios.get(
                `${API_BASE}/ioc/history/${ioc}`
            );

            setHistory(historyResponse.data);

            const relatedResponse = await axios.get(
                `${API_BASE}/ioc/related/${ioc}`
            );

            setRelated(relatedResponse.data);

        } catch (error) {

            console.error(error);

            alert("Unable to investigate IOC.");

        }

    };

    return (

        <div className="dashboard">

            <h1>🧬 IOC Explorer</h1>

            <p>
                Search and investigate IPs, domains and hashes.
            </p>

            <div className="card">

                <h2>IOC Search</h2>

                <input
                    className="ioc-input"
                    placeholder="Enter IOC..."
                    value={ioc}
                    onChange={(e) => setIoc(e.target.value)}
                />

                <button
                    className="investigate-btn"
                    onClick={investigateIOC}
                >
                    Investigate IOC
                </button>

            </div>

            {details && (

                <>

                    <div className="card">

                        <h2>IOC Details</h2>

                        <table>

                            <tbody>

                                <tr>
                                    <td>Investigation ID</td>
                                    <td>{investigationId}</td>
                                </tr>

                                <tr>
                                    <td>IOC</td>
                                    <td>{details.ioc}</td>
                                </tr>

                                <tr>
                                    <td>Type</td>
                                    <td>{details.type}</td>
                                </tr>

                                <tr>
                                    <td>Source</td>
                                    <td>{details.source}</td>
                                </tr>

                                <tr>
                                    <td>Pulse Count</td>
                                    <td>{details.pulse_count}</td>
                                </tr>

                            </tbody>

                        </table>

                    </div>

                    <div className="card">

                        <h2>Investigation History</h2>

                        <table>

                            <thead>

                                <tr>

                                    <th>Date</th>

                                    <th>Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {history.map((item, index) => (

                                    <tr key={index}>

                                        <td>{item.date}</td>

                                        <td>{item.action}</td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                    <div className="card">

                        <h2>Related IOCs</h2>

                        <table>

                            <thead>

                                <tr>

                                    <th>IOC</th>

                                    <th>Type</th>

                                </tr>

                            </thead>

                            <tbody>

                                {related.map((item, index) => (

                                    <tr key={index}>

                                        <td>{item.ioc}</td>

                                        <td>{item.type}</td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </>

            )}

        </div>

    );

}

export default IOCExplorer;
