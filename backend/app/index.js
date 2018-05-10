import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import path from 'path';

import getModels from './models';

const app = express();

// Create GraphQL schema
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

// Try to connect to database
const connectionDelay = 5;
const maxReconnects = 20;
getModels(connectionDelay, maxReconnects).then((models) => {
    if (models === null) {
        console.log('Could not connect to database!');
    } else {
        // Set up GraphQL endpoint and editor
        const graphqlEndpoint = '/graphql';
        app.use(
            graphqlEndpoint,
            bodyParser.json(),
            graphqlExpress({
                schema,
                context: {
                    models,
                    user: {
                        id: 1,
                    },
                },
            }),
        );
        app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpoint }));

        models.connection.sync().then(() => {
            app.listen(process.env.PORT, 'backend', () => console.log(`Server listening on port ${process.env.PORT}`));
        });
    }
});

app.get('/api/', (req, res) => {
    res.send('Hello world!');
});
