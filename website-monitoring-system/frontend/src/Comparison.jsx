import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:5001";

function Comparison() {
  const [sessions, setSessions] = useState([]);

  const [session1, setSession1] = useState("");

  const [session2, setSession2] = useState("");

  const [comparison, setComparison] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    try {
      const response = await fetch(`${BASE_URL}/history`);

      const data = await response.json();

      const uniqueSessions = [];

      const sessionMap = new Map();

      data.forEach((item) => {
        if (!sessionMap.has(item.sessionId)) {
          sessionMap.set(item.sessionId, true);

          uniqueSessions.push(item);
        }
      });

      setSessions(uniqueSessions);
    } catch (error) {
      console.log(error);
    }
  }

  async function compareSessions() {
    try {
      if (!session1 || !session2) {
        alert("Please Select Two Sessions");

        return;
      }

      if (session1 === session2) {
        alert("Please Select Different Sessions");

        return;
      }

      const response = await fetch(
        `${BASE_URL}/compare/${session1}/${session2}`,
      );

      const data = await response.json();

      console.log(data);

      setComparison(data);
    } catch (error) {
      console.log(error);
    }
  }

  function getDifference(oldValue, newValue) {
    const diff = newValue - oldValue;

    if (diff > 0) {
      return `+${diff}`;
    }

    if (diff < 0) {
      return `${diff}`;
    }

    return "0";
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
          boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h1>Session Comparison</h1>

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <select
            value={session1}
            onChange={(e) => setSession1(e.target.value)}
            style={{
              padding: "10px",
              width: "100%",
            }}
          >
            <option value="">Select Old Session</option>

            {sessions.map((session) => (
              <option key={session.sessionId} value={session.sessionId}>
                {session.sessionId}

                {" - "}

                {session.domain}
              </option>
            ))}
          </select>

          <select
            value={session2}
            onChange={(e) => setSession2(e.target.value)}
            style={{
              padding: "10px",
              width: "100%",
            }}
          >
            <option value="">Select New Session</option>

            {sessions.map((session) => (
              <option key={session.sessionId} value={session.sessionId}>
                {session.sessionId}

                {" - "}

                {session.domain}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={compareSessions}
          style={{
            padding: "12px 20px",
            background: "#111827",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Compare Sessions
        </button>
      </div>

      {comparison && (
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "10px",
            marginTop: "25px",
            boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Page Summary Comparison</h2>

          <table
            border="1"
            cellPadding="12"
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr>
                <th>Element</th>

                <th>Old Count</th>

                <th>New Count</th>

                <th>Difference</th>
              </tr>
            </thead>

            <tbody>
              {Object.keys(comparison.oldSummary || {})

                .filter(
                  (key) => key !== "mainStatus" && key !== "totalRequests",
                )

                .map((key) => {
                  const oldValue = comparison.oldSummary[key] || 0;

                  const newValue = comparison.newSummary[key] || 0;

                  return (
                    <tr key={key}>
                      <td>{key}</td>

                      <td>{oldValue}</td>

                      <td>{newValue}</td>

                      <td>{getDifference(oldValue, newValue)}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Comparison;
