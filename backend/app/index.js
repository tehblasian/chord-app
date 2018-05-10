import express from 'express';
import getModels from './models';

const app = express();

const connectionDelay = 5;
const maxReconnects = 20;

getModels(connectionDelay, maxReconnects).then((models) => {
    if (models === null) {
        console.log('Could not connect to database!');
    } else {
        models.connection.sync({ forced: true }).then(() => {
            app.listen(process.env.PORT, 'backend', () => console.log(`Server listening on port ${process.env.PORT}`));
        });
    }
});

app.get('/api/', (req, res) => {
    res.send('Hello world!');
});
