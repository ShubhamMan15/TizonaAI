import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../App.css";

const API_BASE = "http://127.0.0.1:8000/api";

function IOCExplorer() {
    const navigate = useNavigate();

    const [ioc, setIoc] = useState("");
    const [loading, setLoading] = useState(false);

    const investigateIOC = async () => {
        if (!ioc.trim()) return;

        setLoading(true);

        try {
            const response = await axios.post(
                `${API_BASE}/ioc/enrich`,
                {
                    ioc: ioc
                }
            );

            navigate(
                `/investigations/${response.data.investigation_id}`
            );
        } catch (error) {
            console.error(error);
            alert("Unable to investigate IOC.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard">

            <h1>🧬 IOC Explorer</h1>

            <p>
                Search and investigate IP addresses, domains and file hashes.
            </p>

            <div className="card">

                <h2>IOC Search</h2>

                <input
                    className="ioc-input"
                    placeholder="Enter IP, Domain or Hash..."
                    value={ioc}
                    onChange={(e) => setIoc(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            investigateIOC();
                        }
                    }}
                />

                <button
                    className="investigate-btn"
                    onClick={investigateIOC}
                    disabled={loading}
                >
                    {loading ? "Investigating..." : "Investigate IOC"}
                </button>

            </div>

        </div>
    );
}

export default IOCExplorer;
