import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

function SessionDetails() {
  const { sessionId } = useParams();

  const [session, setSession] = useState(null);

  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    fetchDetails();
  }, []);

  async function fetchDetails() {
    try {
      const response = await fetch(
        `http://localhost:5001/history/${sessionId}`,
      );

      const data = await response.json();

      console.log(data);

      setSession(data.session);

      setMetrics(data.metrics || []);
    } catch (error) {
      console.log(error);
    }
  }

  if (!session) {
    return <h2>Loading...</h2>;
  }

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <h1>Session Details</h1>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <p>
          <b>Session:</b> {session.sessionId}
        </p>

        <p>
          <b>Domain:</b> {session.domain}
        </p>

        <p>
          <b>Status:</b> {session.mainStatus}
        </p>

        <p>
          <b>Total Requests:</b> {session.totalRequests}
        </p>

        <p>
          <b>Title:</b> {session.title}
        </p>
      </div>

      <h2>Request Metrics</h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>URL</th>

            <th>Status</th>

            <th>Method</th>

            <th>Type</th>

            <th>Duration</th>
          </tr>
        </thead>

        <tbody>
          {metrics.map((metric, index) => (
            <tr key={index}>
              <td>{metric.url}</td>

              <td>{metric.status}</td>

              <td>{metric.method}</td>

              <td>{metric.resourceType}</td>

              <td>{metric.duration} ms</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SessionDetails;
