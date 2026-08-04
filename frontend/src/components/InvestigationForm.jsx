import { useState } from "react";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

function InvestigationForm({ onResult }) {
  const [ioc, setIoc] = useState("");
  const [loading, setLoading] = useState(false);

  const investigate = async (e) => {
    e.preventDefault();

    if (!ioc.trim()) {
      return;
    }

    try {
      setLoading(true);

      // Step 1: Enrich IOC
      const enrichResponse = await axios.post(
        `${API_BASE}/ioc/enrich`,
        {
          ioc: ioc.trim(),
        }
      );

      const investigationId =
        enrichResponse.data.investigation_id;

      // Step 2: Fetch full investigation report
      const reportResponse = await axios.get(
        `${API_BASE}/investigations/${investigationId}/report`
      );

      // Step 3: Send complete report to parent component
      onResult(reportResponse.data);

      setIoc("");
    } catch (error) {
      console.error(
        "Investigation Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.detail ||
          error.message ||
          "Investigation failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Investigate IOC</h2>

      <form onSubmit={investigate}>
        <input
          type="text"
          placeholder="Enter IP, Domain, URL, or Hash"
          value={ioc}
          onChange={(e) => setIoc(e.target.value)}
          className="ioc-input"
        />

        <button
          type="submit"
          className="investigate-btn"
          disabled={loading}
        >
          {loading ? "Investigating..." : "Investigate"}
        </button>
      </form>
    </div>
  );
}

export default InvestigationForm;
