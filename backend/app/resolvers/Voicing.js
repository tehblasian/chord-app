export default {
    Query: {
        getVoicingById: (parent, { id }, { models }) => models.Voicing.findOne({
            where: { id },
        }),
        getVoicingsByChordType: (parent, { root, quality }, { models }) => models.Voicing.findOne({
            where: {
                root,
                quality,
            },
        }),
        getAllVoicings: (parent, args, { models }) => models.Voicing.findAll(),
    },
    Mutation: {
        createVoicing: (parent, args, { models, user }) => models.Voicing.create({
            ...args,
            userId: user.id,
        }),
    },
};
