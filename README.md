Website Monitoring System
A full-stack web application that monitors a website using a real browser, collects request-level performance and response data, and stores monitoring sessions for history and comparison.
Features
- Monitor a website by entering its URL.
- Capture browser network requests using Playwright.
- Collect request details such as HTTP status, method, resource type, duration, response size, and request state.
- Summarize page elements, including links, forms, buttons, images, scripts, and headings.
- Store request metrics and session summaries in InfluxDB.
- View previous monitoring sessions and inspect session details.
- Compare two monitoring sessions.
- Use Grafana to explore stored metrics and build dashboards.
Tech Stack
- Frontend: React, Vite, React Router
- Backend: Node.js, Express
- Browser automation: Playwright
- Time-series storage: InfluxDB 2.x
- Metrics visualization: Grafana
- Containerization: Docker Compose
Project Structure
website-monitoring-system/
├── backend/
│   ├── src/
│   │   ├── server.js
│   │   ├── monitor.js
│   │   ├── browser.js
│   │   ├── listeners.js
│   │   ├── metrics.js
│   │   ├── influx.js
│   │   ├── summary.js
│   │   ├── history.js
│   │   ├── sessionDetails.js
│   │   └── compare.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── docker/
    └── docker-compose.yml
Prerequisites
Install the following before running the project:
- Node.js and npm
- Docker Desktop (for InfluxDB and Grafana)
- A browser supported by Playwright
Configuration
Configure the backend environment variables in backend/.env:
INFLUX_URL=http://localhost:8086
INFLUX_TOKEN=replace_with_your_influxdb_token
INFLUX_ORG=monitoring
INFLUX_BUCKET=website_metrics
Use values that match your InfluxDB setup. If the backend runs inside Docker, INFLUX_URL should use the InfluxDB service name rather than localhost.

Security: Do not commit .env files, API tokens, or real credentials to source control. Replace any sample/default credentials before using the project beyond local development.
Run the Project Locally
1. Start InfluxDB and Grafana
From the project root, run:
docker compose -f docker/docker-compose.yml up -d
- InfluxDB: http://localhost:8086
- Grafana: http://localhost:3000
The Compose file configures persistent volumes for both services. For a non-local deployment, change the default credentials and tokens before starting the containers.
2. Install and Start the Backend
Open a terminal:
cd backend
npm install
npm start
The Express API runs at http://localhost:5001.

Playwright may require browser binaries on a fresh installation. If needed, install the Chromium browser supported by your installed Playwright version:
npx playwright install chromium
On Linux environments, Playwright may also require system dependencies.
3. Install and Start the Frontend
Open a second terminal from the project root:
cd frontend
npm install
npm run dev
Open the local URL printed by Vite in the terminal (commonly http://localhost:5173).
API Endpoints
Method	Endpoint	Description
POST	/monitor	Monitor the URL provided in the JSON request body, for example {"url":"https://example.com"}.
GET	/history	Retrieve saved monitoring sessions.
GET	/history/:sessionId	Retrieve details for a specific monitoring session.
GET	/compare/:session1/:session2	Compare two monitoring sessions.


Example request:
curl -X POST http://localhost:5001/monitor \
  -H "Content-Type: application/json" \
  -d "{\"url\":\"https://example.com\"}"
The monitor endpoint returns the final URL, main HTTP status, page summary, captured metrics, and total request count when available.
How It Works
1. A user submits a website URL through the frontend.
2. The backend validates the URL and opens it in a Playwright-controlled browser.
3. Browser listeners collect request and response information.
4. The backend extracts a summary of key page elements.
5. Request metrics and session details are written to InfluxDB.
6. The frontend can display the monitoring result, browse session history, and compare sessions.
7. Grafana can be configured to query InfluxDB for custom visualizations.
Troubleshooting
- Frontend cannot reach the API: Confirm the backend is running on port 5001.
- InfluxDB connection errors: Check the INFLUX_URL, token, organization, and bucket in backend/.env.
- Browser launch errors: Run npx playwright install chromium from the backend directory and install any required system dependencies.
- Grafana shows no data: Confirm that monitoring sessions have been run and that Grafana is configured with InfluxDB as a data source.
- Port already in use: Stop the process using the port or update the corresponding configuration.
Notes
- This project is intended for authorized testing and monitoring. Only monitor websites you are permitted to test.
- Monitoring results depend on the target website, network conditions, browser behavior, and the time of the test.
- Grafana dashboards and data-source configuration may need to be set up manually.
