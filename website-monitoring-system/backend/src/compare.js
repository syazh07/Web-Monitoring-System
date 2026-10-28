import dotenv from "dotenv";

import { InfluxDB } from "@influxdata/influxdb-client";

dotenv.config();

const influxDB = new InfluxDB({
  url: process.env.INFLUX_URL,

  token: process.env.INFLUX_TOKEN,
});

const queryApi = influxDB.getQueryApi(process.env.INFLUX_ORG);

export async function compareSessions(oldSession, newSession) {
  try {
    const query = `


from(bucket: "${process.env.INFLUX_BUCKET}")

|> range(start: -30d)

|> filter(fn: (r) =>
r._measurement == "monitoring_sessions"
)

|> filter(fn: (r) =>
r.sessionId == "${oldSession}"
or
r.sessionId == "${newSession}"
)

|> pivot(
rowKey: ["sessionId"],
columnKey: ["_field"],
valueColumn: "_value"
)

`;
    // WHERE sessionId='s1'
    // OR sessionId='s2'
    //group rows by sessionId
    //take values inside _field and make them column names
    //fill column values using _value

    const rows = await queryApi.collectRows(query);

    const oldData = rows.find((row) => row.sessionId === oldSession);

    const newData = rows.find((row) => row.sessionId === newSession);

    if (!oldData || !newData) {
      return {
        success: false,

        message: "Sessions Not Found",
      };
    }

    const oldSummary = {
      buttons: oldData.buttons || 0,

      forms: oldData.forms || 0,

      links: oldData.links || 0,

      tables: oldData.tables || 0,

      inputs: oldData.inputs || 0,

      images: oldData.images || 0,

      scripts: oldData.scripts || 0,

      iframes: oldData.iframes || 0,

      headings: oldData.headings || 0,

      paragraphs: oldData.paragraphs || 0,
    };

    const newSummary = {
      buttons: newData.buttons || 0,

      forms: newData.forms || 0,

      links: newData.links || 0,

      tables: newData.tables || 0,

      inputs: newData.inputs || 0,

      images: newData.images || 0,

      scripts: newData.scripts || 0,

      iframes: newData.iframes || 0,

      headings: newData.headings || 0,

      paragraphs: newData.paragraphs || 0,
    };

    return {
      success: true,

      oldSummary,

      newSummary,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,

      oldSummary: {},

      newSummary: {},
    };
  }
}
