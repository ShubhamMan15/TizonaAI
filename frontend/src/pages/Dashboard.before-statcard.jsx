import { useEffect, useState } from "react";
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

import "../App.css";

const API_BASE = "http://127.0.0.1:8000/api";

function Dashboard() {

  const [stats, setStats] = useState(null);

  const [topIocs, setTopIocs] = useState([]);

  const [threatSummary, setThreatSummary] = useState({});

  const [recentInvestigations, setRecentInvestigations] = useState([]);

  const [investigationReport, setInvestigationReport] = useState(null);


  const loadDashboard = async () => {

    try {

      const statsRes = await axios.get(
        `${API_BASE}/dashboard/stats`
      );

      const topRes = await axios.get(
        `${API_BASE}/dashboard/top-iocs`
      );

      const summaryRes = await axios.get(
        `${API_BASE}/dashboard/threat-summary`
      );

      const recentRes = await axios.get(
        `${API_BASE}/dashboard/recent-investigations`
      );


      setStats(
        statsRes.data
      );


      setTopIocs(
        topRes.data.top_iocs
      );


      setThreatSummary(
        summaryRes.data.ioc_type_distribution
      );


      setRecentInvestigations(
        recentRes.data.recent_investigations
      );


    } catch(error) {

      console.error(
        "Dashboard API Error:",
        error
      );

    }

  };


  useEffect(() => {

    loadDashboard();

  }, []);


  const handleInvestigationResult = (report) => {

    setInvestigationReport(report);

    loadDashboard();

  };


  const pieData = Object.entries(
    threatSummary
  ).map(
    ([name,value]) => ({
      name,
      value
    })
  );


  return (

    <div className="dashboard">

      <h1>
        TizonaAI Threat Intelligence Dashboard
      </h1>


      <InvestigationForm
        onResult={handleInvestigationResult}
      />


      <InvestigationPanel
        investigation={investigationReport}
      />


      <div className="stats-grid">


        <div className="card">

          <h2>
            Total Investigations
          </h2>

          <p>
            {stats?.total_investigations ?? "-"}
          </p>

        </div>



        <div className="card">

          <h2>
            High Risk
          </h2>

          <p>
            {stats?.high_risk ?? "-"}
          </p>

        </div>



        <div className="card">

          <h2>
            Critical
          </h2>

          <p>
            {stats?.critical ?? "-"}
          </p>

        </div>


      </div>



      <div className="chart-grid">


        <div className="card">


          <h2>
            IOC Type Distribution
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
                outerRadius={100}
                label
              >


                {
                  pieData.map(
                    (entry,index) => (

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

                    )
                  )
                }


              </Pie>


              <Tooltip />


            </PieChart>


          </ResponsiveContainer>


        </div>



        <div className="card">


          <h2>
            Top IOCs
          </h2>


          <ResponsiveContainer
            width="100%"
            height={300}
          >


            <BarChart
              data={topIocs}
            >


              <CartesianGrid
                strokeDasharray="3 3"
              />


              <XAxis
                dataKey="ioc"
                tick={false}
              />


              <YAxis />


              <Tooltip />


              <Bar
                dataKey="count"
              />


            </BarChart>


          </ResponsiveContainer>


        </div>


      </div>



      <div className="card">


        <h2>
          Recent Investigations
        </h2>


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


            {
              recentInvestigations.map(
                (item) => (

                  <tr
                    key={item.id}
                  >

                    <td>
                      {item.id}
                    </td>


                    <td>
                      {item.ioc}
                    </td>


                    <td>
                      {item.ioc_type}
                    </td>


                    <td>
                      {item.risk_score}
                    </td>


                    <td>
                      {item.reputation}
                    </td>


                  </tr>

                )
              )
            }


          </tbody>


        </table>


      </div>


    </div>

  );

}


export default Dashboard;
