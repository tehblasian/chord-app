import { requiresAuth } from '../util/AuthUtil';
import formatErrors from '../util/ErrorUtil';

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
        createVoicing: requiresAuth
            .createResolver(async (parent, { input: { ...args } }, { models, user }) => {
                try {
                    const voicing = await models.Voicing.create({
                        ...args,
                        userId: user.id,
                    });
                    return {
                        success: true,
                        voicing,
                        errors: null,
                    };
                } catch (errors) {
                    return {
                        success: false,
                        voicing: null,
                        errors: formatErrors(errors, models),
                    };
                }
            }),
    },
};
