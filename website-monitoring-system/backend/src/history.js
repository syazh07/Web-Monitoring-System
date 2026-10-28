import dotenv from "dotenv";

import { InfluxDB } from "@influxdata/influxdb-client";

dotenv.config();

const influxDB = new InfluxDB({
  url: process.env.INFLUX_URL,

  token: process.env.INFLUX_TOKEN,
});

const queryApi = influxDB.getQueryApi(process.env.INFLUX_ORG);

export async function getHistory() {
  try {
    const fluxQuery = `
      from(bucket: "${process.env.INFLUX_BUCKET}")
        |> range(start: -30d)
        |> filter(fn: (r) =>
          r._measurement == "monitoring_sessions"
        )
    `;

    const rows = [];

    await new Promise((resolve, reject) => {
      queryApi.queryRows(
        fluxQuery,

        {
          next(row, tableMeta) {
            const data = tableMeta.toObject(row);

            rows.push(data);
          },

          error(error) {
            reject(error);
          },

          complete() {
            resolve();
          },
        },
      );
    });

    const grouped = {};

    rows.forEach((row) => {
      const sessionId = row.sessionId;

      if (!grouped[sessionId]) {
        grouped[sessionId] = {
          sessionId,

          domain: row.domain,

          finalUrl: row.finalUrl,

          mainStatus: null,

          totalRequests: null,

          timestamp: row._time,
        };
      }

      if (row._field === "mainStatus") {
        grouped[sessionId].mainStatus = row._value;
      }

      if (row._field === "totalRequests") {
        grouped[sessionId].totalRequests = row._value;
      }
    });

    return Object.values(grouped);
  } catch (error) {
    console.log(error);

    return [];
  }
}
