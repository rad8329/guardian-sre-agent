# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Guardian SRE is an autonomous control plane for infrastructure monitoring and remediation. It uses agentic AI to connect observability signals to operational responses, with a core principle of **Deterministic Safety** - no automated action occurs without simulation, validation, and human approval.

## Architecture

**Tech Stack:**
- **Orchestration:** Mastra.ai (TypeScript) for graph-based agent workflows
- **Tool Execution:** Model Context Protocol (MCP) servers expose system tools to the LLM
- **Real-Time:** Fastify + Socket.io for Human-in-the-loop (HITL) handshake protocol
- **Persistence:** PostgreSQL + pgvector for incident history and Runbook RAG
- **Observability:** OpenTelemetry for tracing agent decision paths

**Key Patterns:**
- Monorepo structure separating reasoning engine from execution layer
- Two-Phase Commit for remediation: Analyze/Simulate → Handshake → Execute (with human approval)
- All remediation scripts must pass sandbox validation in transient Docker containers

## Guardrail Architecture

Four layers of safety controls:
1. **Input Guardrails:** Semantic validation of alerts to prevent prompt injection
2. **Structural Guardrails:** Zod schema validation for all LLM tool calls
3. **Security Policies:** Hardcoded "Denied Actions" blocking high-risk commands
4. **Sandbox Validation:** Isolated Docker execution tests before approval

## MCP Toolset Categories

- **Diagnostic:** `fetch-service-logs`, `analyze-slow-queries`, `inspect-http-status`, `get-system-load`
- **Context/Knowledge:** `query-operational-runbooks` (RAG), `get-last-deployments`, `inspect-cache-keys`
- **Safety/Remediation:** `simulate-action` (sandbox execution), `test-upstream-latency`

## Development Guidelines

- All MCP tools must have Zod schemas for input/output validation
- Remediation actions require sandbox simulation before HITL approval
- Use OpenTelemetry spans to trace agent decision paths
- WebSocket events follow the two-phase commit pattern: `PROPOSE` → `ACK/REJECT` → `EXECUTE`
- Security-sensitive code requires review for OWASP top 10 vulnerabilities

## Documentation References

- [Mastra.ai Docs](https://mastra.ai/docs)
- [MCP Specification](https://modelcontextprotocol.io)
- [Zod Schema Validation](https://zod.dev)
- [pgvector](https://github.com/pgvector/pgvector)
- [OpenTelemetry JS](https://opentelemetry.io/docs/languages/js/)
