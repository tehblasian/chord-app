import formatErrors from '../util/ErrorUtil';
import { tryLogin } from '../util/AuthUtil';

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
        login: (parent, { username, password }, { models, SECRET, REFRESH_SECRET }) => tryLogin(
            username,
            password,
            models,
            SECRET,
            REFRESH_SECRET,
        ),
        register: async (parent, { input: { ...args } }, { models }) => {
            try {
                const user = await models.User.create(args);
                return {
                    success: true,
                    user,
                    errors: null,
                };
            } catch (errors) {
                return {
                    success: false,
                    user: null,
                    errors: formatErrors(errors, models),
                };
            }
        },
    },
};
