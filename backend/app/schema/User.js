export default `
    type User {
        id: Int!
        username: String!
        email: String!
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): User!
    }

    type Query {
        getUserById(id: Int!): User!
        getUserByUsername(username: String!): User!
        getAllUsers: [User!]!
    }
`;
