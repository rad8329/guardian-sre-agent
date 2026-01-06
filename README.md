# Guardian SRE: Autonomous Control Plane

Guardian SRE is an experimental agentic framework designed for intelligent infrastructure monitoring and remediation. It leverages **Agentic AI** to bridge the gap between observability signals and actionable operational responses.

The system is built on the principle of **Deterministic Safety**, ensuring that no automated action is taken without prior simulation, strict validation, and explicit human approval.

## 🏗️ Core Architecture

The project follows a pragmatic monorepo structure, decoupling the reasoning engine from the execution layer:

* **Orchestration:** [Mastra.ai](https://mastra.ai) (TypeScript) for graph-based agent workflows.
* **Execution Protocol:** [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) to securely expose system tools to the LLM.
* **Real-Time Layer:** Fastify + Socket.io for the "Human-in-the-loop" (HITL) handshake protocol.
* **Persistence & Memory:** PostgreSQL + `pgvector` for incident history and Runbook RAG (Retrieval-Augmented Generation).
* **Observability:** OpenTelemetry (OTel) integration for tracing agent decision paths.

## 🛡️ Trust & Safety (Guardrails)

To ensure operational stability, the framework implements a multi-layered **Guardrail Architecture**:

1.  **Input Guardrails:** Semantic validation of incoming alerts to prevent prompt injection or out-of-scope requests.
2.  **Structural Guardrails:** Strict schema validation using **Zod** for all LLM-generated tool calls, ensuring deterministic execution.
3.  **Security Policies:** A hardcoded "Denied Actions" layer that intercepts and blocks high-risk commands (e.g., destructive operations without backup).
4.  **Sandbox Validation:** Every remediation script must pass an isolated execution test in a transient Docker container before being presented for approval.

## 🛠️ Agent Capabilities (MCP Toolset)

The agent interacts with the infrastructure through a strictly typed MCP server:

### 🔍 Diagnostic Tools
* `fetch-service-logs`: Granular log filtering and tailing for root cause analysis.
* `analyze-slow-queries`: PostgreSQL performance bottleneck detection via `pg_stat_statements`.
* `inspect-http-status`: Deep-dive into endpoint health, SSL status, and response headers.
* `get-system-load`: Real-time node resource telemetry (CPU, RAM, Disk I/O).

### 🧠 Context & Knowledge
* `query-operational-runbooks`: RAG-based search through internal Standard Operating Procedures (SOPs).
* `get-last-deployments`: Correlates current anomalies with recent CI/CD pipeline events.
* `inspect-cache-keys`: Cache health and memory fragmentation analysis.

### 🛡️ Safety & Remediation
* **`simulate-action`**: Runs proposed remediation scripts in a safe, isolated environment to validate outcomes.
* `test-upstream-latency`: Validates network path health and connectivity.

## 🚦 The "Human-in-the-loop" Protocol

Guardian SRE follows a **Two-Phase Commit** for all remediation actions:
1.  **Analyze & Simulate:** The agent diagnoses the issue and validates a fix in the sandbox.
2.  **Handshake:** The system pauses and streams the full "Intent Report" (Diagnostics + Simulation Results + Proposed Code) via WebSockets.
3.  **Execute:** Action only proceeds after a human operator reviews and signs off.
