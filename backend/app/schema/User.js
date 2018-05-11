export default `
    type User {
        id: Int!
        username: String!
        email: String!
    }

    input RegisterInput {
        username: String!
        email: String!
        password: String!
    }

    type RegisterResponse {
        success: Boolean!
        user: User
        errors: [Error!]
    }

    type LoginResponse {
        success: Boolean!
        token: String
        refreshToken: String
        errors: [Error!]
    }

    type Mutation {
        register(input: RegisterInput!): RegisterResponse!
        login(username: String!, password: String!): LoginResponse!
    }

    type Query {
        getUserById(id: Int!): User!
        getUserByUsername(username: String!): User!
        getAllUsers: [User!]!
    }
`;
