const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type Query {
    hello: [String]
    products(filter: ProductsFilterInput): [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
  }

  type Mutation {
    addCategory(input: addCategoryInput!): Category!
    addProduct(input: addProductInput!): Product!
    addReview(input: addReviewInput!): Review!
    deleteCategory(id: ID!): Boolean!
    deleteProduct(id: ID!): Boolean!
    deleteReview(id: ID!): Boolean!
    updateCategory(id: ID!, input: UpdateCategoryInput!): Category
    updateProduct(id: ID!, input: UpdateProductInput!): Product
    updateReview(id: ID!, input: UpdateReviewInput!): Review
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    image: String!
    category: Category
    reviews: [Review!]!
  }

  type Category {
    id: ID!
    name: String!
    products(filter: ProductsFilterInput): [Product!]!
  }

  type Review {
    id: ID!
    title: String!
    date: String!
    comment: String!
    rating: Int!
    productId: ID!
  }

  input ProductsFilterInput {
    onSale: Boolean
    avgRating: Int
  }

  input addCategoryInput {
    name: String
  }

  input UpdateCategoryInput {
    name: String
  }

  input addProductInput {
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    image: String!
    categoryId: String!
  }

  input UpdateProductInput {
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    image: String!
    categoryId: String!
  }

  input addReviewInput {
    title: String!
    date: String!
    comment: String!
    rating: Int!
    productId: ID!
  }

  input UpdateReviewInput {
    title: String!
    date: String!
    comment: String!
    rating: Int!
    productId: ID!
  }
`;
