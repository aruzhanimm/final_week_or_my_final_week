import fs from "node:fs";

const required = [
  "docker-compose.yml",
  "monitoring/prometheus.yml",
  "monitoring/alerts.yml",
  "monitoring/grafana/dashboards/system-overview.json",
  "terraform/main.tf",
  "ansible/site.yml",
  "k8s/app.yaml"
];

const missing = required.filter((f) => !fs.existsSync(f));
if (missing.length) {
  console.error("Missing required files:", missing);
  process.exit(1);
}
console.log("All critical configuration files are present.");
