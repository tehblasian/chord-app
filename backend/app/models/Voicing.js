export default (sequelize, DataTypes) => {
    const Voicing = sequelize.define('Voicing', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        voicing: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
    }, { underscored: true });

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
