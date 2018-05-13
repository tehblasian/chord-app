import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isUnique: async (username, next) => {
                    const exists = await User.findOne({ where: { username } });
                    if (exists) {
                        return next('This username is already taken');
                    }
                    return next();
                },
                len: {
                    args: [3, 20],
                    msg: 'The username must be between 3 and 20 characters long',
                },
                is: {
                    args: /^[a-z0-9_-]{3,20}$/,
                    msg: 'The username may only alphanumeric characters, hyphens, and underscores',
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [6, 20],
                    msg: 'The password must be between 6 and 20 characters long',
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Please enter a valid email',
                },
            },
        },
    }, {
        hooks: {
            afterValidate: async (user) => {
                // eslint-disable-next-line no-param-reassign
                user.password = await bcrypt.hash(user.password, 12);
            },
        },
    });

    return User;
};
