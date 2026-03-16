const { ApolloServer } = require('@apollo/server');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { readFileSync } = require('fs');
const gql = require('graphql-tag');

const typeDefs = gql(readFileSync('./schema.graphql', 'utf8'));

const transactions = [
  {
    id: 'txn_001',
    accountId: 'acc_001',
    amount: -45.99,
    currency: 'USD',
    description: 'Coffee Shop',
    date: '2026-03-10',
    transactionType: 'DEBIT',
  },
  {
    id: 'txn_002',
    accountId: 'acc_001',
    amount: 2500.00,
    currency: 'USD',
    description: 'Direct Deposit',
    date: '2026-03-08',
    transactionType: 'CREDIT',
  },
  {
    id: 'txn_003',
    accountId: 'acc_001',
    amount: -120.00,
    currency: 'USD',
    description: 'Utility Bill',
    date: '2026-03-07',
    transactionType: 'DEBIT',
  },
  {
    id: 'txn_004',
    accountId: 'acc_002',
    amount: -55.00,
    currency: 'USD',
    description: 'Grocery Store',
    date: '2026-03-09',
    transactionType: 'DEBIT',
  },
  {
    id: 'txn_005',
    accountId: 'acc_002',
    amount: 500.00,
    currency: 'USD',
    description: 'Transfer In',
    date: '2026-03-06',
    transactionType: 'TRANSFER',
  },
  {
    id: 'txn_006',
    accountId: 'acc_003',
    amount: -250.00,
    currency: 'USD',
    description: 'Insurance Premium',
    date: '2026-03-05',
    transactionType: 'DEBIT',
  },
];

const resolvers = {
  Query: {
    recentTransactions: (_, { limit }) => transactions.slice(0, limit),
  },
  Account: {
    __resolveReference: (reference) => {
      return { id: reference.id };
    },
    transactions: (account, { limit }) => {
      return transactions
        .filter(t => t.accountId === account.id)
        .slice(0, limit);
    },
    totalDebits: (account) => {
      const debits = transactions
        .filter(t => t.accountId === account.id && t.amount < 0);
      return Math.abs(debits.reduce((sum, t) => sum + t.amount, 0));
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

startStandaloneServer(server, { listen: { port: 4002 } }).then(({ url }) => {
  console.log(`Subgraph [transactions] ready at ${url}`);
});
