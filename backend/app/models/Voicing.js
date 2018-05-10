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
                is: /^[ABCDEFG][b|#]?$/,
                len: [1, 2],
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
