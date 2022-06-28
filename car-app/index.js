const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    cars: [Car!]!
  }

  type Car {
    id: ID!
    color: String!
    make: String!
  }

  type Mutation {
    groupDelete(groupId: ID!)
    groupPublish(groupId: ID!)
    groupUnpublish(groupId: ID!)
    groupCarAdd(groupId: ID!, carId: ID!)
    groupCarAdd(groupId: ID!, carId: ID!)
    create(
      input: CreateGroupInput
    )
    create(
      input: CreateGroupInput
    )
  }

  type Group {
    id: ID!
    name: String!
    image: Image!
    description: String!
    hasCar(idCar: ID!): Boolean!
    cars(skip: Int!, take: Int!): [Car!]!
    featureSet: GroupFeatureSet
  }

  type Image {
    id: ID!
    url: String!
  }

  type GroupFeatureSet {
    features: [GroupFeatures!]!
    applyFeaturesSeparately: Boolean!
  }

  type GroupFeatures {
    feature: GroupFeaturesFields!
  }

  enum GroupFeaturesFields {
    INCLINE_ENGINE
    FOUR_CYLINDER_ENGINE
    TWIN_CYLINDER_ENGINE
    RED_PAINT
    BLACK_PAINT
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      cars: () => [{ id: 1, color: "blue", make: "Toyota" }],
    },
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
