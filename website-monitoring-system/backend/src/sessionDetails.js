import dotenv from "dotenv";

import {InfluxDB
} from "@influxdata/influxdb-client";

dotenv.config();

const influxDB =
  new InfluxDB({

    url:
      process.env.INFLUX_URL,

    token:
      process.env.INFLUX_TOKEN,

  });

const queryApi =
  influxDB.getQueryApi(
    process.env.INFLUX_ORG
  );

export async function
getSessionDetails(
  sessionId
) {

  const query = `

from(bucket: "${process.env.INFLUX_BUCKET}")
  |> range(start: -30d)
  |> filter(fn: (r) =>
    r.sessionId == "${sessionId}"
  )

`;

  const rows = [];

  return new Promise(
    (resolve, reject) => {

      queryApi.queryRows(
        query,
        {

          next(row, tableMeta) {

            const data =
              tableMeta.toObject(
                row
              );

            rows.push(data);

          },

          error(error) {

            reject(error);

          },

          complete() {

            resolve(rows);

          },

        }
      );

    }
  );

}