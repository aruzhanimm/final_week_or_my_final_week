# Automation and Capacity Planning

## Automation Implemented
- Docker-based deployment using `docker-compose.yml` and Swarm stack mode.
- Ansible playbook to prepare nodes and deploy the stack.
- Health endpoints for all services and Prometheus alerting.

## Capacity Findings
- Order and Payment services are hottest paths under write-heavy traffic.
- PostgreSQL is the main bottleneck in sustained load.

## Scaling Strategy
- Horizontal: increase replicas for API gateway, order-service, and payment-service.
- Vertical: raise CPU/memory limits for database and write-heavy services.
- Database optimization: indexing, connection pooling tuning, query profiling.

## Load Analysis Workflow
1. Run `node scripts/load-test.mjs http://localhost:8080/api/products/ 500`.
2. Review Grafana dashboard trends (request rate, p95 latency, error rate).
3. Scale services and compare before/after metrics.
