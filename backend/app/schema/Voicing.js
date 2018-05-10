export default `
    type Voicing {
        id: Int!
        userId: Int!
        name: String!
        root: String!
        quality: String!
        voicing: [String!]!
    }

    type Mutation {
        createVoicing(name: String!, root: String!, quality: String!, voicing: [String!]!): Voicing!
    }

    type Query {
        getVoicingById(id: Int!): Voicing!
        getVoicingsByChordType(root: String!, quality: String!): Voicing!
        getAllVoicings: [Voicing!]!
    }
`;
