# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BankGraph is a **federated GraphQL API** for a financial services demo — a workshop starter for "Build Your First Federated Graph". It has two independent subgraphs that compose into a unified API via Apollo Router.

## Running the Project

Start both subgraphs first, then run the router:

```bash
# Terminal 1 — Accounts subgraph (port 4001)
cd subgraph-accounts && npm install && npm start

# Terminal 2 — Transactions subgraph (port 4002)
cd subgraph-transactions && npm install && npm start

# Terminal 3 — Compose and start Apollo Router (port 4000)
rover dev --config supergraph.yaml
```

There are no build, lint, or test commands — this is an intentionally minimal workshop starter.

## Architecture

```
Apollo Router (port 4000)          ← unified GraphQL endpoint
    │                   │
Accounts subgraph    Transactions subgraph
   (port 4001)           (port 4002)
```

- Each subgraph is a standalone Apollo Server with in-memory data
- `supergraph.yaml` configures `rover dev` to compose both schemas and start the router
- Both schemas use `extend schema @link(...)` — no cross-subgraph entity references are defined yet (that's added during the workshop)

## Key Files

| File | Purpose |
|------|---------|
| `supergraph.yaml` | Rover dev config — federation version and subgraph URLs |
| `subgraph-accounts/schema.graphql` | Account and User types (CHECKING, SAVINGS, MONEY_MARKET) |
| `subgraph-transactions/schema.graphql` | Transaction types (DEBIT, CREDIT, TRANSFER) |
| `subgraph-accounts/index.js` | Apollo Server + resolvers + in-memory data |
| `subgraph-transactions/index.js` | Apollo Server + resolvers + in-memory data |

## Federation Notes

- `federation_version` in `supergraph.yaml` must use full semver: `=2.12.0` (not `=2.12`)
- The accounts subgraph serves `Query.account(id)` and `Query.accounts`
- The transactions subgraph serves `Query.recentTransactions(limit)`
- Skills for Apollo Federation, Router, Server, GraphQL schema/operations, and Rover are installed in `.claude/skills/`
