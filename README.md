# BankGraph — Workshop Starter Repo

A federated GraphQL API for a financial services application. Used in the **Build Your First Federated Graph** hands-on workshop.

---

## Prerequisites

Before the workshop, confirm you have the following installed:

| Tool | Version | Check |
|------|---------|-------|
| Node.js | 18 or higher | `node --version` |
| Git | any | `git --version` |
| Rover CLI | latest | `rover --version` |

**Installing Rover (macOS / Linux / WSL):**
```bash
curl -sSL https://rover.apollo.dev/nix/latest | sh
```

---

## Setup

Clone the repo and install dependencies for both subgraphs:

```bash
git clone <REPO_URL>
cd make-your-first-federated-graph

cd subgraph-accounts && npm install && cd ..
cd subgraph-transactions && npm install && cd ..
```

---

## Running the Workshop

You'll need **three terminal windows** open from the `bankgraph` directory.

**Terminal 1 — start the accounts subgraph:**
```bash
cd subgraph-accounts
npm start
# Ready at http://localhost:4001/graphql
```

**Terminal 2 — start the transactions subgraph:**
```bash
cd subgraph-transactions
npm start
# Ready at http://localhost:4002/graphql
```

**Terminal 3 — start the router with rover dev:**
```bash
rover dev --supergraph-config supergraph.yaml
# Router running at http://localhost:4000
```

Then open **http://localhost:4000** in your browser to access Apollo Sandbox.

---

## Project Structure

```
make-your-first-federated-graph/
├── subgraph-accounts/
│   ├── index.js          ← Apollo Server + resolvers
│   ├── schema.graphql    ← Accounts subgraph schema
│   └── package.json
├── subgraph-transactions/
│   ├── index.js          ← Apollo Server + resolvers
│   ├── schema.graphql    ← Transactions subgraph schema
│   └── package.json
└── supergraph.yaml       ← rover dev config
```

---

## What You'll Build

By the end of the workshop, this query will work — fetching from both subgraphs in a single request:

```graphql
query GetAccountWithTransactions {
  account(id: "acc_001") {
    id
    accountType
    status
    owner {
      name
      email
    }
    transactions(limit: 5) {
      id
      amount
      currency
      description
      date
    }
    totalDebits
  }
}
```

---

## Sample Data

**Accounts:** `acc_001` (Alex Rivera, CHECKING), `acc_002` (Jordan Kim, SAVINGS), `acc_003` (Sam Chen, MONEY_MARKET)

**Transactions:** Mix of DEBIT, CREDIT, and TRANSFER entries spread across `acc_001`, `acc_002`, and `acc_003`.
