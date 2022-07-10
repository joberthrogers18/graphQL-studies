import { gql } from 'apollo-server';

export const typeDefs = gql`
    type Query {
        me: User
        posts: [Post!]!
        profile(userId: ID!): Profile
    }

    type Mutation {
        postCreate(post: PostInput!): PostPayload!
        postUpdate(postId: ID!, post: PostInput!): PostPayload!
        postDelete(postId: ID!): PostPayload!
        postPublished(postId: ID!): PostPayload!
        postUnpublished(postId: ID!): PostPayload!
        signup(
            credentials: CredentialInput!
            name: String!, 
            bio: String!
        ): AuthPayLoad!
        signin(credentials: CredentialInput!): AuthPayLoad!
    }

    type Post {
        id : ID!
        title: String!
        content: String!
        published: Boolean!
        createdAt: String!
        user: User! 
    }

    type User {
        id: ID!
        name: String!
        email: String!
        posts: [Post!]!
    }

    type Profile {
        id: ID!
        bio: String!
        isMyProfile: Boolean!
        user: User!
    }

    type UserError {
        message: String!
    }

    type PostPayload {
        userErrors: [UserError!]!
        post: Post
    }

    input PostInput {
        title: String
        content: String
    }

    type AuthPayLoad {
        userErrors: [UserError!]!
        token: String
    }

    input CredentialInput {
        email: String!
        password: String!
    }
`