import { launchBrowser } from "./browser.js";

// import {page} from "playwright";

import { attachListeners } from "./listeners.js";

import { writeMetrics } from "./influx.js";

import { extractPageSummary } from "./summary.js";

export async function startMonitoring(url) {
  const sessionId = "session_" + Date.now();

  const metrics = [];

  const { browser, page } = await launchBrowser();

  attachListeners(page, sessionId, metrics);

  const response = await page.goto(url, {
    waitUntil: "domcontentloaded",

    timeout: 60000,
  });

  await Promise.race([
    page.waitForLoadState("networkidle"),

    page.waitForTimeout(5000),
  ]);

  const finalUrl = page.url();

  const pageSummary = await extractPageSummary(page);

  const mainStatus = response ? response.status() : 500;

  await browser.close();

  await writeMetrics(metrics, {
    sessionId,

    domain: new URL(finalUrl).hostname,

    finalUrl,

    mainStatus,

    pageSummary,

    totalRequests: metrics.length,
  });

  return {
    finalUrl,

    mainStatus,

    pageSummary,

    metrics,

    totalRequests: metrics.length,
  };
}
