# Endterm SRE Project

Comprehensive SRE implementation for a distributed microservices system using Node.js, HTML/CSS/JS frontend, Docker Swarm, Kubernetes manifests, Terraform, Ansible, Prometheus, and Grafana.

## Services
- `api-gateway` (port 8080)
- `auth-service` (3001)
- `product-service` (3002)
- `order-service` (3003)
- `payment-service` (3004)
- `notification-service` (3005)
- `user-profile-service` (3006)
- `frontend` via Nginx (80)
- `postgres` (5432)

## Run Locally with Docker Compose
1. `docker compose build`
2. `docker compose up -d`
3. Open frontend: `http://localhost`
4. Prometheus: `http://localhost:9090`
5. Grafana: `http://localhost:3000` (admin/admin)

## Run in Docker Swarm
1. `docker swarm init`
2. `docker stack deploy -c docker-compose.yml app`
3. `docker service ls`

## Kubernetes Manifests
1. `kubectl apply -f k8s/namespace.yaml`
2. `kubectl apply -f k8s/app.yaml`
3. `kubectl apply -f k8s/microservices.yaml`
4. `kubectl apply -f k8s/monitoring.yaml`

## Terraform (AWS VM Provisioning)
1. `cd terraform`
2. Copy `terraform.tfvars.example` to `terraform.tfvars` and set values.
3. `terraform init`
4. `terraform plan`
5. `terraform apply`

## Ansible
1. Copy `ansible/inventory.ini.example` to `ansible/inventory.ini`
2. Fill host IPs from Terraform outputs.
3. `ansible-playbook -i ansible/inventory.ini ansible/site.yml`

## Monitoring Setup
- Prometheus config: `monitoring/prometheus.yml`
- Alerts: `monitoring/alerts.yml`
- Grafana datasource provisioned in `monitoring/grafana/provisioning/datasources/prometheus.yml`
- Grafana dashboard auto-provisioned from `monitoring/grafana/dashboards/system-overview.json`
- No manual dashboard creation required.

## Validation Scripts
- `node scripts/validate-config.mjs`
- `node scripts/load-test.mjs`
- `node scripts/inspect-log-patterns.mjs <logfile>`

## Deliverables Checklist
- [x] 6+ microservices source code
- [x] Docker Compose / Swarm configuration
- [x] Kubernetes manifests
- [x] Terraform files for AWS VMs
- [x] Ansible playbooks
- [x] Monitoring setup (Prometheus + Grafana + alerts)
- [x] Incident report and postmortem
- [x] Capacity planning and automation documentation
- [x] Frontend in HTML/CSS/JS
