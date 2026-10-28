export async function createMetric(sessionId, request, response, startTime) {
  const endTime = Date.now();

  const duration = endTime - startTime;

  let responseSize = 0;

  try {
    const body = await response.body();

    responseSize = body.length;
  } catch {
    responseSize = 0;
  }

  const status = response.status();

  let requestState = "success";

  if (status >= 300 && status < 400) {
    requestState = "redirect";
  }

  if (status >= 400 && status < 500) {
    requestState = "client_error";
  }

  if (status >= 500) {
    requestState = "server_error";
  }

  return {
    sessionId,

    url: request.url(),

    method: request.method(),

    status,

    requestState,

    resourceType: request.resourceType(),

    startTime,

    endTime,

    duration,

    responseSize,

    timestamp: new Date().toISOString(),
  };
}
