export default `
    type Voicing {
        id: Int!
        userId: Int!
        name: String!
        root: String!
        quality: String!
        voicing: [String!]!
    }

    input CreateVoicingInput {
        name: String!
        root: String!
        quality: String!
        voicing: [String!]!
    }

    type CreateVoicingResponse {
        success: Boolean!
        voicing: Voicing
        errors: [Error!]
    }

    type Mutation {
        createVoicing(input: CreateVoicingInput!): CreateVoicingResponse!
    }

    type Query {
        getVoicingById(id: Int!): Voicing!
        getVoicingsByChordType(root: String!, quality: String!): Voicing!
        getAllVoicings: [Voicing!]!
    }
`;
