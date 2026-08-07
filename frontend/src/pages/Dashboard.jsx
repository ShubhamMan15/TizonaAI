import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";

import InvestigationForm from "../components/InvestigationForm";
import InvestigationPanel from "../components/InvestigationPanel";
import StatCard from "../components/ui/StatCard";

import "../App.css";

const API_BASE = "http://127.0.0.1:8000/api";

function Dashboard() {

    const [stats, setStats] = useState(null);
    const [topIocs, setTopIocs] = useState([]);
    const [threatSummary, setThreatSummary] = useState({});
    const [recentInvestigations, setRecentInvestigations] = useState([]);
    const [investigationReport, setInvestigationReport] = useState(null);

    const [lastUpdated, setLastUpdated] = useState("");

    const [search, setSearch] = useState("");

    const [riskFilter, setRiskFilter] = useState("ALL");

    const [typeFilter, setTypeFilter] = useState("ALL");

    const [reputationFilter, setReputationFilter] = useState("ALL");

    const loadDashboard = async () => {

        try {

            const [
                statsRes,
                topRes,
                summaryRes,
                recentRes
            ] = await Promise.all([

                axios.get(`${API_BASE}/dashboard/stats`),

                axios.get(`${API_BASE}/dashboard/top-iocs`),

                axios.get(`${API_BASE}/dashboard/threat-summary`),

                axios.get(`${API_BASE}/dashboard/recent-investigations`)

            ]);

            setStats(statsRes.data);

            setTopIocs(
                topRes.data.top_iocs || []
            );

            setThreatSummary(
                summaryRes.data.ioc_type_distribution || {}
            );

            setRecentInvestigations(
                recentRes.data.recent_investigations || []
            );

            setLastUpdated(
                new Date().toLocaleTimeString()
            );

        } catch (error) {

            console.error(
                "Dashboard Error:",
                error
            );

        }

    };

    useEffect(() => {

        loadDashboard();

        const interval = setInterval(() => {

            loadDashboard();

        }, 30000);

        return () => clearInterval(interval);

    }, []);

    const handleInvestigationResult = (report) => {

        setInvestigationReport(report);

        loadDashboard();

    };

    const pieData = Object.entries(
        threatSummary
    ).map(([name, value]) => ({
        name,
        value
    }));

    const filteredInvestigations =
        recentInvestigations.filter((item) => {

            const searchMatch =
                search === "" ||
                item.ioc
                    .toLowerCase()
                    .includes(search.toLowerCase());

            let riskLabel = "LOW";

            if (item.risk_score >= 90)
                riskLabel = "CRITICAL";
            else if (item.risk_score >= 70)
                riskLabel = "HIGH";
            else if (item.risk_score >= 40)
                riskLabel = "MEDIUM";

            const riskMatch =
                riskFilter === "ALL" ||
                riskLabel === riskFilter;

            const typeMatch =
                typeFilter === "ALL" ||
                item.ioc_type.toUpperCase() === typeFilter;

            const reputationMatch =
                reputationFilter === "ALL" ||
                item.reputation.toUpperCase() === reputationFilter;

            return (
                searchMatch &&
                riskMatch &&
                typeMatch &&
                reputationMatch
            );

        });

   return (

    <div className="dashboard">

        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px"
            }}
        >

            <h1>
                ⚔ TizonaAI Threat Intelligence Dashboard
            </h1>

            <span
                style={{
                    color: "#94a3b8",
                    fontSize: "14px"
                }}
            >
                Last Updated: {lastUpdated}
            </span>

        </div>

        <InvestigationForm
            onResult={handleInvestigationResult}
        />

        {

            investigationReport && (

                <InvestigationPanel
                    investigation={investigationReport}
                />

            )

        }

        <div className="stats-grid">

            <StatCard
                title="Total Investigations"
                value={stats?.total_investigations ?? 0}
                icon="📊"
            />

            <StatCard
                title="High Risk"
                value={stats?.high_risk ?? 0}
                icon="⚠️"
                severity="danger"
            />

            <StatCard
                title="Critical"
                value={stats?.critical ?? 0}
                icon="🔥"
                severity="critical"
            />

        </div>

        <div className="chart-grid">

            <div className="card">

                <h2>
                    IOC Threat Distribution
                </h2>

                <ResponsiveContainer
                    width="100%"
                    height={300}
                >

                    <PieChart>

                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={110}
                            label
                        >

                            {

                                pieData.map((entry, index) => (

                                    <Cell
                                        key={index}
                                        fill={
                                            [
                                                "#3b82f6",
                                                "#ef4444",
                                                "#10b981",
                                                "#f59e0b",
                                                "#8b5cf6"
                                            ][index % 5]
                                        }
                                    />

                                ))

                            }

                        </Pie>

                        <Tooltip />

                    </PieChart>

                </ResponsiveContainer>

            </div>

            <div className="card">

                <h2>
                    Top Indicators of Compromise
                </h2>

                <ResponsiveContainer
                    width="100%"
                    height={300}
                >

                    <BarChart data={topIocs}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                            dataKey="ioc"
                            hide
                        />

                        <YAxis />

                        <Tooltip />

                        <Bar dataKey="count" />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

        <div className="card">

            <h2>
                Recent Investigations
            </h2>

            <div
                style={{
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                    marginBottom: "20px"
                }}
            >

                <input
                    className="ioc-input"
                    style={{
                        flex: 1,
                        minWidth: "220px",
                        margin: 0
                    }}
                    placeholder="Search IOC..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <select
                    value={riskFilter}
                    onChange={(e) =>
                        setRiskFilter(e.target.value)
                    }
                >
                    <option value="ALL">All Risk</option>
                    <option value="CRITICAL">Critical</option>
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                </select>

                <select
                    value={typeFilter}
                    onChange={(e) =>
                        setTypeFilter(e.target.value)
                    }
                >
                    <option value="ALL">All Types</option>
                    <option value="IP">IP</option>
                    <option value="DOMAIN">DOMAIN</option>
                    <option value="HASH">HASH</option>
                </select>

                <select
                    value={reputationFilter}
                    onChange={(e) =>
                        setReputationFilter(e.target.value)
                    }
                >
                    <option value="ALL">All Reputation</option>
                    <option value="MALICIOUS">Malicious</option>
                    <option value="SUSPICIOUS">Suspicious</option>
                    <option value="UNKNOWN">Unknown</option>
                    <option value="SAFE">Safe</option>
                </select>

            </div>

            <table className="dashboard-table">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>IOC</th>

                        <th>Type</th>

                        <th>Risk</th>

                        <th>Reputation</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        filteredInvestigations.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="6"
                                    style={{
                                        textAlign: "center"
                                    }}
                                >
                                    No investigations found.
                                </td>

                            </tr>

                        ) : (

                            filteredInvestigations.map((item) => {

                                let riskLabel = "LOW";
                                let riskClass = "badge badge-low";

                                if (item.risk_score >= 90) {

                                    riskLabel = "CRITICAL";
                                    riskClass = "badge badge-critical";

                                }

                                else if (item.risk_score >= 70) {

                                    riskLabel = "HIGH";
                                    riskClass = "badge badge-high";

                                }

                                else if (item.risk_score >= 40) {

                                    riskLabel = "MEDIUM";
                                    riskClass = "badge badge-medium";

                                }

                                let reputationClass = "badge badge-low";

                                if (item.reputation === "malicious") {

                                    reputationClass = "badge badge-critical";

                                }

                                else if (item.reputation === "suspicious") {

                                    reputationClass = "badge badge-high";

                                }

                                else if (item.reputation === "unknown") {

                                    reputationClass = "badge badge-medium";

                                }

                                return (

                                    <tr key={item.id}>

                                        <td>{item.id}</td>

                                        <td>{item.ioc}</td>

                                        <td>{item.ioc_type}</td>

                                        <td>

                                            <span className={riskClass}>
                                                {riskLabel}
                                            </span>

                                        </td>

                                        <td>

                                            <span className={reputationClass}>
                                                {item.reputation.toUpperCase()}
                                            </span>

                                        </td>

                                        <td>

                                            <Link
                                                to={`/investigations/${item.id}`}
                                            >

                                                <button
                                                    className="investigate-btn"
                                                >
                                                    View
                                                </button>

                                            </Link>

                                        </td>

                                    </tr>

                                );

                            })

                        )

                    }

                </tbody>

            </table>

        </div>

    </div>

);

}

export default Dashboard;
