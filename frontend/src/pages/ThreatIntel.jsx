import { useEffect, useState } from "react";
import axios from "axios";

import "../App.css";

const API_BASE = "http://127.0.0.1:8000/api";

function ThreatIntel() {

  const [summary, setSummary] = useState({});
  const [latestThreats, setLatestThreats] = useState([]);
  const [feeds, setFeeds] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [mitre, setMitre] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {

    loadThreatIntel();

  }, []);

  const loadThreatIntel = async () => {

    try {

      const [
        summaryRes,
        latestRes,
        feedsRes,
        campaignsRes,
        mitreRes,
        countriesRes
      ] = await Promise.all([

        axios.get(`${API_BASE}/threat-intelligence/summary`),
        axios.get(`${API_BASE}/threat-intelligence/latest`),
        axios.get(`${API_BASE}/threat-intelligence/feed-status`),
        axios.get(`${API_BASE}/threat-intelligence/campaigns`),
        axios.get(`${API_BASE}/threat-intelligence/mitre`),
        axios.get(`${API_BASE}/threat-intelligence/countries`)

      ]);

      setSummary(summaryRes.data);
      setLatestThreats(latestRes.data);
      setFeeds(feedsRes.data);
      setCampaigns(campaignsRes.data);
      setMitre(mitreRes.data);
      setCountries(countriesRes.data);

    } catch (err) {

      console.error("Threat Intelligence Error", err);

    }

  };

  return (

    <div className="dashboard">

      <h1>🌐 Threat Intelligence Center</h1>

      <p>
        Live threat feeds, malware campaigns and intelligence sources.
      </p>

      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon">🚨</div>
          <div>
            <h3>Malicious IOCs</h3>
            <p>{summary.malicious_iocs}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🛰</div>
          <div>
            <h3>Campaigns</h3>
            <p>{summary.active_campaigns}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🦠</div>
          <div>
            <h3>Malware Families</h3>
            <p>{summary.malware_families}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👤</div>
          <div>
            <h3>Threat Actors</h3>
            <p>{summary.threat_actors}</p>
          </div>
        </div>

      </div>

      <div className="card">

        <h2>Latest Threat Indicators</h2>

        <table>

          <thead>

            <tr>
              <th>IOC</th>
              <th>Type</th>
              <th>Threat</th>
              <th>Risk</th>
              <th>Source</th>
            </tr>

          </thead>

          <tbody>

            {latestThreats.map((item, index) => (

              <tr key={index}>

                <td>{item.ioc}</td>
                <td>{item.type}</td>
                <td>{item.threat}</td>
                <td>{item.risk}</td>
                <td>{item.source}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="chart-grid">

        <div className="card">

          <h2>Threat Intelligence Feeds</h2>

          <table>

            <thead>

              <tr>
                <th>Feed</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {feeds.map((feed, index) => (

                <tr key={index}>

                  <td>{feed.name}</td>
                  <td>{feed.status}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        <div className="card">

          <h2>Active Campaigns</h2>

          <table>

            <thead>

              <tr>
                <th>Name</th>
                <th>Severity</th>
              </tr>

            </thead>

            <tbody>

              {campaigns.map((camp, index) => (

                <tr key={index}>

                  <td>{camp.name}</td>
                  <td>{camp.severity}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      <div className="chart-grid">

        <div className="card">

          <h2>MITRE ATT&CK Techniques</h2>

          <table>

            <thead>

              <tr>
                <th>ID</th>
                <th>Technique</th>
              </tr>

            </thead>

            <tbody>

              {mitre.map((item, index) => (

                <tr key={index}>

                  <td>{item.id}</td>
                  <td>{item.name}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        <div className="card">

          <h2>Top Threat Source Countries</h2>

          <table>

            <thead>

              <tr>
                <th>Country</th>
                <th>Threats</th>
              </tr>

            </thead>

            <tbody>

              {countries.map((item, index) => (

                <tr key={index}>

                  <td>{item.country}</td>
                  <td>{item.threats}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default ThreatIntel;
