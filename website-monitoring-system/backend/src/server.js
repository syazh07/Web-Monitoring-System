import express from "express";

import cors from "cors";

import { startMonitoring } from "./monitor.js";
import { getHistory } from "./history.js";
import { getSessionDetails } from "./sessionDetails.js";
import { compareSessions } from "./compare.js";

const app = express();

app.use(cors());

app.use(express.json());

function isValidUrl(url) {
  try {
    new URL(url);

    return true;
  } catch {
    return false;
  }
}

app.post("/monitor", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,

        statusCode: 400,

        message: "URL Required",
      });
    }

    if (!isValidUrl(url)) {
      return res.status(400).json({
        success: false,

        statusCode: 400,

        message: "Invalid URL Format",
      });
    }

    const result = await startMonitoring(url);

    const status = result.mainStatus;

    if (status >= 400 && status < 500) {
      return res.status(status).json({
        success: false,

        statusCode: status,

        message: "Client Error",

        finalUrl: result.finalUrl,

        pageSummary: result.pageSummary,

        metrics: result.metrics,

        totalRequests: result.totalRequests,
      });
    }

    if (status >= 500) {
      return res.status(status).json({
        success: false,

        statusCode: status,

        message: "Server Error",

        finalUrl: result.finalUrl,

        pageSummary: result.pageSummary,

        metrics: result.metrics,

        totalRequests: result.totalRequests,
      });
    }

    res.json({
      success: true,

      statusCode: status,

      finalUrl: result.finalUrl,

      mainStatus: result.mainStatus,

      pageSummary: result.pageSummary,

      metrics: result.metrics,

      totalRequests: result.totalRequests,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      statusCode: 500,

      message: "Internal Server Error",
    });
  }
});

app.get("/history", async (req, res) => {
  try {
    const history = await getHistory();

    res.json(history);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: "Failed To Fetch History",
    });
  }
});
app.get("/history/:sessionId", async (req, res) => {
  try {
    const result = await getSessionDetails(req.params.sessionId);

    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
    });
  }
});
app.get(
"/compare/:session1/:session2",

async (req, res) => {

try {

  const result =
    await compareSessions(

      req.params.session1,

      req.params.session2

    );

  res.json(result);

} catch (error) {

  console.log(error);

  res.status(500).json({

    success: false,

    message:
      "Comparison Failed",

  });

}


}
);

app.listen(5001, () => {
  console.log("Server running on port 5001");
});
