import { useState } from "react";

import Dashboard from "./Dashboard";

import { startMonitoring } from "./api";

function App() {
  const [url, setUrl] = useState("");

  const [metrics, setMetrics] = useState([]);

  const [loading, setLoading] = useState(false);

  const [totalRequests, setTotalRequests] = useState(0);

  const [pageSummary, setPageSummary] = useState(null);

  const [mainStatus, setMainStatus] = useState(null);

  const [finalUrl, setFinalUrl] = useState("");

  async function handleMonitoring() {
    try {
      if (!url) {
        alert("Please Enter URL");

        return;
      }

      setLoading(true);

      setMetrics([]);

      setPageSummary(null);

      const data = await startMonitoring(url);

      console.log("API RESPONSE:", data);

      setMetrics(data.metrics || []);

      setTotalRequests(data.totalRequests || 0);

      setPageSummary(data.pageSummary || {});

      setMainStatus(data.mainStatus || null);

      setFinalUrl(data.finalUrl || "");

      if (data.finalUrl) {
        setUrl(data.finalUrl);
      }
    } catch (error) {
      console.log(error);

      alert("Monitoring Failed");
    } finally {
      setLoading(false);
    }
  }

  function openHistory() {
    window.location.href = "/history";
  }

  function openComparison() {
    window.location.href = "/comparison";
  }

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial",
        background: "#f4f7fb",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "10px",
          marginBottom: "25px",
          boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h1>Website Monitoring System</h1>

        <input
          type="text"
          placeholder="Enter Website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            marginBottom: "15px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "15px",
          }}
        />

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={handleMonitoring}
            style={{
              padding: "12px 20px",
              background: "#111827",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            {loading ? "Monitoring..." : "Start Monitoring"}
          </button>

          <button
            onClick={openHistory}
            style={{
              padding: "12px 20px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            History
          </button>

          <button
            onClick={openComparison}
            style={{
              padding: "12px 20px",
              background: "#059669",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            Comparison
          </button>
        </div>
      </div>

      {finalUrl && (
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "25px",
            boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Website Preview</h2>

          <p>
            <b>Final URL:</b> {finalUrl}
          </p>

          <iframe
            src={finalUrl}
            title="website-preview"
            width="100%"
            height="600px"
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          />
        </div>
      )}

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "25px",
          boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2>Monitoring Summary</h2>

        <p>
          <b>Status:</b> {mainStatus}
        </p>

        <p>
          <b>Total Requests:</b> {totalRequests}
        </p>
      </div>

      {pageSummary && (
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "25px",
            boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Page Summary</h2>

          <p>
            <b>Title:</b> {pageSummary.title}
          </p>

          <p>
            <b>Buttons:</b> {pageSummary.buttons}
          </p>

          <p>
            <b>Forms:</b> {pageSummary.forms}
          </p>

          <p>
            <b>Links:</b> {pageSummary.links}
          </p>

          <p>
            <b>Tables:</b> {pageSummary.tables}
          </p>

          <p>
            <b>Inputs:</b> {pageSummary.inputs}
          </p>

          <p>
            <b>Images:</b> {pageSummary.images}
          </p>

          <p>
            <b>Scripts:</b> {pageSummary.scripts}
          </p>

          <p>
            <b>Iframes:</b> {pageSummary.iframes}
          </p>

          <p>
            <b>Headings:</b> {pageSummary.headings}
          </p>

          <p>
            <b>Paragraphs:</b> {pageSummary.paragraphs}
          </p>
        </div>
      )}

      <Dashboard metrics={metrics} />
    </div>
  );
}

export default App;
