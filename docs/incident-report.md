# Incident Report: Order Service Failure

## Incident Summary
- Incident: Order creation unavailable.
- Trigger: Incorrect database configuration in `order-service`.
- Impact: Users could not create new orders; partial platform degradation.

## Timeline
- T0: Deployment completed.
- T0+5m: Alert fired (`ServiceDown` for order-service).
- T0+10m: Logs inspected; DB connection string mismatch identified.
- T0+20m: Config corrected and service restarted.
- T0+25m: Metrics returned to baseline.

## Root Cause
- Incorrect `DATABASE_URL` value injected into order service.

## Recovery Actions
- Revert to valid environment value.
- Restart service replicas.
- Confirm health endpoint and request success recovery.
