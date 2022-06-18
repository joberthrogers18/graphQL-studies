const { ApolloServer, gql } = require("apollo-server");

const { typeDefs } = require('./schema');
const resolvers = require('./resolvers');
const { categories, products, reviews } = require('./db');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    categories,
    products,
    reviews,
  }
});

server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});
