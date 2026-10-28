//network activity
import { createMetric } from "./metrics.js";
const requestStore = new Map();

export function attachListeners(page, sessionId, metrics) {
  page.on("request", async (request) => {
    requestStore.set(request, {
      startTime: Date.now(),
    });
  });

  page.on("response", async (response) => {
    try {
      const request = response.request();

      if (!requestStore.has(request)) {
        return;
      }

      const requestData = requestStore.get(request);

      requestStore.delete(request);

      const metric = await createMetric(
        sessionId,
        request,
        response,
        requestData.startTime,
      );

      metrics.push(metric);
    } catch (error) {
      console.log(error);
    }
  });

  page.on("requestfailed", (request) => {
    requestStore.delete(request);
  });
}
