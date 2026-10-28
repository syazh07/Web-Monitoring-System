import dotenv from "dotenv";

import { InfluxDB, Point } from "@influxdata/influxdb-client";

dotenv.config();

const influxDB = new InfluxDB({
  url: process.env.INFLUX_URL,

  token: process.env.INFLUX_TOKEN,
});

export async function writeMetrics(metrics, sessionData) {
  try {
    const writeApi = influxDB.getWriteApi(
      process.env.INFLUX_ORG,

      process.env.INFLUX_BUCKET,
    );

    /*
      REQUEST METRICS
    */

    for (const metric of metrics) {
      const point = new Point("website_requests")

        .tag("sessionId", metric.sessionId)

        .tag("method", metric.method)

        .tag("resourceType", metric.resourceType)

        .tag("status", String(metric.status))

        .tag("requestState", metric.requestState)

        .stringField("url", metric.url)

        .floatField("duration", metric.duration)

        .floatField("responseSize", metric.responseSize)

        .timestamp(new Date());

      writeApi.writePoint(point);
    }

    /*
      SESSION HISTORY
    */
    console.log("PAGE SUMMARY:", sessionData.pageSummary);

    const sessionPoint = new Point("monitoring_sessions")

      .tag("sessionId", sessionData.sessionId)

      .tag("domain", sessionData.domain)

      .stringField("finalUrl", sessionData.finalUrl)

      .intField("mainStatus", sessionData.mainStatus)

      .intField("totalRequests", sessionData.totalRequests)

      .intField("buttons", sessionData.pageSummary.buttons || 0)

      .intField("forms", sessionData.pageSummary.forms || 0)

      .intField("links", sessionData.pageSummary.links || 0)

      .intField("tables", sessionData.pageSummary.tables || 0)

      .intField("inputs", sessionData.pageSummary.inputs || 0)

      .intField("images", sessionData.pageSummary.images || 0)

      .intField("scripts", sessionData.pageSummary.scripts || 0)

      .intField("iframes", sessionData.pageSummary.iframes || 0)

      .intField("headings", sessionData.pageSummary.headings || 0)

      .intField("paragraphs", sessionData.pageSummary.paragraphs || 0)

      .timestamp(new Date());

    writeApi.writePoint(sessionPoint);

    await writeApi.close();

    console.log("Data Stored In InfluxDB");
  } catch (error) {
    console.log(error);
  }
}
