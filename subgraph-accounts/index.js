const { ApolloServer } = require('@apollo/server');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { readFileSync } = require('fs');
const gql = require('graphql-tag');

const typeDefs = gql(readFileSync('./schema.graphql', 'utf8'));

const accounts = [
  {
    id: 'acc_001',
    accountNumber: '****1234',
    accountType: 'CHECKING',
    status: 'ACTIVE',
    openedDate: '2022-03-15',
    owner: { id: 'usr_001', name: 'Alex Rivera', email: 'alex.r@example.com' },
  },
  {
    id: 'acc_002',
    accountNumber: '****5678',
    accountType: 'SAVINGS',
    status: 'ACTIVE',
    openedDate: '2021-07-01',
    owner: { id: 'usr_002', name: 'Jordan Kim', email: 'jordan.k@example.com' },
  },
  {
    id: 'acc_003',
    accountNumber: '****9012',
    accountType: 'MONEY_MARKET',
    status: 'ACTIVE',
    openedDate: '2020-11-20',
    owner: { id: 'usr_003', name: 'Sam Chen', email: 'sam.c@example.com' },
  },
];

const resolvers = {
  Query: {
    account: (_, { id }) => accounts.find((a) => a.id === id),
    accounts: () => accounts,
  },
  Account: {
    __resolveReference: (reference) => {
      return accounts.find(a => a.id === reference.id);
    },
  }
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

startStandaloneServer(server, { listen: { port: 4001 } }).then(({ url }) => {
  console.log(`Subgraph [accounts] ready at ${url}`);
});
