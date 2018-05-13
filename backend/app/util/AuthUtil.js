import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import _ from 'lodash';

// Code from Ben Awad

export const createTokens = async (user, SECRET, REFRESH_SECRET) => {
    const createToken = jwt.sign(
        {
            user: _.pick(user, 'id'),
        },
        SECRET,
        {
            expiresIn: '1h',
        },
    );

    const createRefreshToken = jwt.sign(
        {
            user: _.pick(user, 'id'),
        },
        REFRESH_SECRET,
        {
            expiresIn: '7d',
        },
    );

    return [createToken, createRefreshToken];
};

export const tryLogin = async (username, password, models, SECRET, REFRESH_SECRET) => {
    const loginErrors = {
        success: false,
        errors: [
            { path: 'username', message: ' ' },
            { path: 'password', message: 'Incorrect username or password' },
        ],
    };

    // Get user
    const user = await models.User.findOne({ where: { username }, raw: true });
    if (!user) {
        return loginErrors;
    }

    // Check if password is valid
    const validLogin = await bcrypt.compare(password, user.password);
    if (!validLogin) {
        return loginErrors;
    }

    // Get tokens if succesful
    const refreshTokenSecret = user.password + REFRESH_SECRET;
    const [token, refreshToken] = await createTokens(user, SECRET, refreshTokenSecret);

    return {
        success: true,
        token,
        refreshToken,
    };
};

// Helper function to update tokens
const refreshTokens = async (token, refreshToken, models, SECRET, REFRESH_SECRET) => {
    let userId = 0;

    // Get the user id from token
    try {
        const { user: { id } } = jwt.decode(refreshToken);
        userId = id;
    } catch (error) {
        return {}; // If the token cannot be decoded, return an empty object
    }

    // Return empty object if user id is not set
    if (!userId) {
        return {};
    }

    // Get user from db
    const user = await models.User.findOne({ where: { id: userId }, raw: true });

    // Return empty object if user does not exist
    if (!user) {
        return {};
    }

    // Verify that the refresh token is valid
    const refreshSecret = user.password + REFRESH_SECRET;
    try {
        jwt.verify(refreshToken, refreshSecret);
    } catch (error) {
        return {};
    }

    // Create an updated set of tokens
    const [newToken, newRefreshToken] = await createTokens(user, SECRET, refreshSecret);

    return {
        token: newToken,
        refreshToken: newRefreshToken,
        user,
    };
};

// Express middleware to inject the user from the jwt token
export const injectUser = ({ SECRET, REFRESH_SECRET }) => async (req, res, next) => {
    // Get the token from the headers
    const token = req.headers['x-token'];
    if (token) {
        // If the token exists and is still valid, inject the user into the request body
        try {
            const { user } = jwt.verify(token, SECRET);
            req.user = user;
        } catch (error) {
            // Get the refresh token and try to create a new set
            const refreshToken = req.headers['x-refresh-token'];
            const newTokens = await refreshTokens(token, refreshToken, SECRET, REFRESH_SECRET);

            // Set the new tokens in the response headers so that the client can retrieve them
            if (newTokens.token && newTokens.refreshToken) {
                res.set('Access-Control-Expose-Headers', 'x-token', 'x-refresh-token');
                res.set('x-token', newTokens.token);
                res.set('x-refresh-token', newTokens.refreshToken);
            }
            // Inject the user into the request body
            req.user = newTokens.user;
        }
    }
    next();
};

// To authenticate resolvers (from graphql-express-template)
const createResolver = (resolver) => {
    const baseResolver = resolver;
    baseResolver.createResolver = (childResolver) => {
        const newResolver = async (parent, args, context, info) => {
            await resolver(parent, args, context, info);
            return childResolver(parent, args, context, info);
        };
        return createResolver(newResolver);
    };
    return baseResolver;
};

export const requiresAuth = createResolver((parent, args, { user }) => {
    if (!user || !user.id) {
        throw new Error('Not authenticated');
    }
});
