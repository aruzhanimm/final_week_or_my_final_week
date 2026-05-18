# SLI and SLO Definition

## SLIs
- Availability: `up` metric from Prometheus targets.
- Latency: p95 latency from `gateway_http_request_duration_seconds`.
- Error rate: ratio of 5xx responses over all requests from `gateway_http_requests_total`.
- Request success rate: ratio of 2xx responses over total requests.

## SLOs
- Availability >= 99%
- Latency <= 200ms (p95)
- Error rate <= 1%

## Alert Mapping
- ServiceDown -> availability breach.
- HighGatewayLatency -> latency breach.
- HighGatewayErrorRate -> error-rate breach.
