import { useEffect, useState } from "react";

function History() {
  const [history, setHistory] = useState([]);

  async function loadHistory() {
    try {
      const response = await fetch("http://localhost:5001/history");

      const data = await response.json();

      console.log(data);

      setHistory(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <h1>Monitoring History</h1>

      {history.length === 0 && <p>No History Found</p>}

      {history.map((item, index) => (
        <div
          key={index}
          style={{
            background: "white",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "10px",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <p>
            <b>Session:</b> {item.sessionId}
          </p>

          <p>
            <b>Domain:</b> {item.domain}
          </p>

          <p>
            <b>Status:</b> {item.mainStatus}
          </p>

          <p>
            <b>Total Requests:</b> {item.totalRequests}
          </p>

          <p>
            <b>Timestamp:</b> {new Date(item.timestamp).toLocaleString()}
          </p>

          {/* <p>
                <b>URL:</b>
                {" "}
                {
                  item.finalUrl
                }
              </p> */}
        </div>
      ))}
    </div>
  );
}

export default History;
