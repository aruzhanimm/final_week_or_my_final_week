# Postmortem: Order Service DB Misconfiguration

## What Happened
Order service failed after deployment because of invalid database connection configuration.

## Why It Happened
- No pre-deploy configuration validation gate.
- Environment variable change was not covered by smoke tests.

## Corrective Actions
1. Add config validation script (`scripts/validate-config.mjs`) to CI.
2. Add deployment smoke test for `/health` and order creation path.
3. Keep rollback-ready compose and stack manifests versioned.

## Preventive Measures
- Use Ansible templating for consistent environment variable generation.
- Keep alerting active for service availability and request failures.
