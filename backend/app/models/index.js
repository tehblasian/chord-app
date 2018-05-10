import Sequelize from 'sequelize';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default async (delay, tries) => {
    const {
        DB_NAME,
        DB_USER,
        DB_PASS,
        DB_HOST,
        DB_PORT,
    } = process.env;

    const connection = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
        dialect: 'postgres',
        host: DB_HOST || 'localhost',
        port: DB_PORT,
        operatorsAliases: Sequelize.Op,
    });
    
    let connected = false;
    let maxReconnects = tries;
    while (!connected && maxReconnects) {
        try {
            // eslint-disable-next-line no-await-in-loop
            await connection.authenticate();
            connected = true;
        } catch (error) {
            console.log(`Reconnecting in ${delay} seconds`);
            // eslint-disable-next-line no-await-in-loop
            await sleep(5000);
            maxReconnects -= 1;
        }
    }

    if (!connected) {
        return null;
    }

    const Models = {
        User: connection.import('./User.js'),
        Voicing: connection.import('./Voicing.js'),
    };

    Object.keys(Models).forEach((name) => {
        if ('associate' in Models[name]) {
            Models[name].associate(Models);
        }
    });

    Models.connection = connection;
    Models.Sequelize = Sequelize;

    return Models;
};
