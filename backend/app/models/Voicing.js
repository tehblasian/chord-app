export default (sequelize, DataTypes) => {
    const Voicing = sequelize.define('Voicing', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        root: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: /^[ABCDEFG][b|#]?$/,
                    msg: 'Invalid chord root',
                },
                len: {
                    args: [1, 2],
                    msg: 'Invalid chord root',
                },
            },
        },
        quality: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        voicing: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
    });

    Voicing.associate = (models) => {
        Voicing.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                field: 'user_id',
            },
        });
    };

    return Voicing;
};
