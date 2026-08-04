import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_BASE = "http://127.0.0.1:8000/api/dashboard";

function App() {
  const [stats, setStats] = useState(null);
  const [topIocs, setTopIocs] = useState([]);
  const [threatSummary, setThreatSummary] = useState({});
  const [recentInvestigations, setRecentInvestigations] = useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const statsRes = await axios.get(`${API_BASE}/stats`);
        const topRes = await axios.get(`${API_BASE}/top-iocs`);
        const summaryRes = await axios.get(`${API_BASE}/threat-summary`);
        const recentRes = await axios.get(
          `${API_BASE}/recent-investigations`
        );

        setStats(statsRes.data);
        setTopIocs(topRes.data.top_iocs);
        setThreatSummary(summaryRes.data.ioc_type_distribution);
        setRecentInvestigations(recentRes.data.recent_investigations);
      } catch (error) {
        console.error("Dashboard API Error:", error);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="dashboard">
      <h1>TizonaAI Dashboard</h1>

      <div className="stats-grid">
        <div className="card">
          <h2>Total Investigations</h2>
          <p>{stats?.total_investigations ?? "-"}</p>
        </div>

        <div className="card">
          <h2>High Risk</h2>
          <p>{stats?.high_risk ?? "-"}</p>
        </div>

        <div className="card">
          <h2>Critical</h2>
          <p>{stats?.critical ?? "-"}</p>
        </div>
      </div>

      <div className="card">
        <h2>IOC Type Distribution</h2>

        {Object.keys(threatSummary).length === 0 ? (
          <p>No data</p>
        ) : (
          <ul>
            {Object.entries(threatSummary).map(([type, count]) => (
              <li key={type}>
                {type}: {count}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card">
        <h2>Top IOCs</h2>

        <table>
          <thead>
            <tr>
              <th>IOC</th>
              <th>Count</th>
            </tr>
          </thead>

          <tbody>
            {topIocs.map((ioc, index) => (
              <tr key={index}>
                <td>{ioc.ioc}</td>
                <td>{ioc.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>Recent Investigations</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>IOC</th>
              <th>Type</th>
              <th>Risk</th>
              <th>Reputation</th>
            </tr>
          </thead>

          <tbody>
            {recentInvestigations.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.ioc}</td>
                <td>{item.ioc_type}</td>
                <td>{item.risk_score}</td>
                <td>{item.reputation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
