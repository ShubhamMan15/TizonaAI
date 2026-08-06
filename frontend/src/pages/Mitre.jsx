import { useEffect, useState } from "react";
import axios from "axios";

import "../App.css";

const API_BASE = "http://127.0.0.1:8000/api";

function Mitre() {

    const [techniques, setTechniques] = useState([]);
    const [tactics, setTactics] = useState([]);
    const [groups, setGroups] = useState([]);

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const [
                techniquesRes,
                tacticsRes,
                groupsRes
            ] = await Promise.all([

                axios.get(`${API_BASE}/mitre/techniques`),
                axios.get(`${API_BASE}/mitre/tactics`),
                axios.get(`${API_BASE}/mitre/groups`)

            ]);

            setTechniques(techniquesRes.data);
            setTactics(tacticsRes.data);
            setGroups(groupsRes.data);

        } catch (error) {

            console.error("MITRE API Error:", error);

        }

    };

    return (

        <div className="dashboard">

            <h1>🎯 MITRE ATT&CK Explorer</h1>

            <p>
                Browse ATT&CK techniques, tactics and threat actor groups.
            </p>

            <div className="card">

                <h2>MITRE Techniques</h2>

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Technique</th>
                            <th>Tactic</th>
                            <th>Severity</th>

                        </tr>

                    </thead>

                    <tbody>

                        {techniques.map((item) => (

                            <tr key={item.id}>

                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.tactic}</td>
                                <td>{item.severity}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            <div className="card">

                <h2>MITRE Tactics</h2>

                <table>

                    <thead>

                        <tr>

                            <th>Tactic</th>
                            <th>Techniques</th>

                        </tr>

                    </thead>

                    <tbody>

                        {tactics.map((item) => (

                            <tr key={item.name}>

                                <td>{item.name}</td>
                                <td>{item.techniques}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            <div className="card">

                <h2>Threat Actor Groups</h2>

                <table>

                    <thead>

                        <tr>

                            <th>Group</th>
                            <th>Country</th>

                        </tr>

                    </thead>

                    <tbody>

                        {groups.map((item) => (

                            <tr key={item.name}>

                                <td>{item.name}</td>
                                <td>{item.country}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default Mitre;
