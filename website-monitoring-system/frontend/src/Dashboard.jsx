function Dashboard({ metrics = [] }) {
  if (!metrics.length) {
    return (
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2>Request Metrics</h2>

        <p>No Metrics Available</p>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
        overflowX: "auto",
      }}
    >
      <h2>Request Metrics</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#111827",
              color: "white",
            }}
          >
            <th style={thStyle}>URL</th>

            <th style={thStyle}>Status</th>

            <th style={thStyle}>State</th>

            <th style={thStyle}>Method</th>

            <th style={thStyle}>Resource Type</th>

            <th style={thStyle}>Duration</th>

            <th style={thStyle}>Response Size</th>
          </tr>
        </thead>

        <tbody>
          {metrics.map((metric, index) => (
            <tr key={index}>
              <td style={tdStyle}>{metric.url}</td>

              <td style={tdStyle}>{metric.status}</td>

              <td style={tdStyle}>
                {metric.status >= 400 ? "failed" : "success"}
              </td>

              <td style={tdStyle}>{metric.method}</td>

              <td style={tdStyle}>{metric.resourceType}</td>

              <td style={tdStyle}>{metric.duration} ms</td>

              <td style={tdStyle}>{metric.responseSize} bytes</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: "12px",

  border: "1px solid #ddd",

  textAlign: "left",
};

const tdStyle = {
  padding: "10px",

  border: "1px solid #ddd",

  fontSize: "14px",
};

export default Dashboard;
