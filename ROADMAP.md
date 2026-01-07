# Roadmap

## Phase 1: Foundations & Monorepo
- [ ] Turborepo + npm workspaces + strict TypeScript
- [ ] MCP server implementation (`packages/mcp-server`)
- [ ] CI/CD pipeline (GitHub Actions)

## Phase 2: Agentic Core
- [ ] Mastra.ai orchestration and system prompts
- [ ] Decision graphs (agent decides when to gather more info)
- [ ] Dynamic script generation engine (Bash/SQL)

## Phase 3: Trust, Safety & Sandboxing
- [ ] Docker sandbox service (ephemeral containers)
- [ ] Zod guardrails for LLM output validation
- [ ] OpenTelemetry integration for agent tracing

## Phase 4: Real-Time & UX
- [ ] HITL Widget (`apps/widget`) - embeddable React/Web Component
- [ ] Playground (`apps/playground`) - dev/testing app
- [ ] WebSocket handshake (agent pauses for human approval)
- [ ] Real-time logs streaming

## Phase 5: Memory & RAG
- [ ] PostgreSQL + pgvector setup
- [ ] Runbook RAG (semantic search over SOPs)
- [ ] Incident memory (agent recalls past fixes)

## Phase 6: Packaging & Deployment
- [ ] Multi-stage Dockerfiles
- [ ] docker-compose for local dev
- [ ] Helm chart for Kubernetes
- [ ] Widget distribution (npm + CDN)
- [ ] Configuration documentation
