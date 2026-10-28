function RequestTable({ metrics }) {
  return (
    <div
      style={{
        overflowX: "auto",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white",
          boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
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

            <th style={thStyle}>Method</th>

            <th style={thStyle}>Resource Type</th>

            <th style={thStyle}>Duration</th>

            <th style={thStyle}>Response Size</th>
          </tr>
        </thead>

        <tbody>
          {metrics?.map((metric, index) => (
            <tr key={index}>
              <td style={tdStyle}>
                <div
                  style={{
                    maxWidth: "350px",
                    wordBreak: "break-word",
                  }}
                >
                  {metric.url}
                </div>
              </td>

              <td style={tdStyle}>
                <span
                  style={{
                    color: metric.status >= 400 ? "red" : "green",
                    fontWeight: "bold",
                  }}
                >
                  {metric.status}
                </span>
              </td>

              <td style={tdStyle}>{metric.method}</td>

              <td style={tdStyle}>{metric.resourceType}</td>

              <td style={tdStyle}>{metric.duration} ms</td>

              <td style={tdStyle}>{metric.responseSize} bytes</td>

              {/* <td
                    style={tdStyle}
                  >

                    <div
                      style={{
                        maxWidth:
                          "250px",
                        wordBreak:
                          "break-word",
                      }}
                    >

                      {
                        metric.initiator
                      }

                    </div>

                  </td> */}
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

export default RequestTable;
