export default {
    Query: {
        getUserById: (parent, { id }, { models }) => models.User.findOne({
            where: { id },
        }),
        getUserByUsername: (parent, { username }, { models }) => models.User.findOne({
            where: { username },
        }),
        getAllUsers: (parent, args, { models }) => models.User.findAll(),
    },
    Mutation: {
        createUser: (parent, args, { models }) => models.User.create(args),
    },
};
