import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ApolloClient, { HttpLink, ApolloLink, concat } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import store from './store';

import App from './App';

const link = new HttpLink({ uri: 'http//localhost/api/graphql' });

// Middleware to add token to headers
const authenticateRequest = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('x-token');
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : null,
        }
    }));

    return forward(operation);
});

const client = new ApolloClient({
    uri: 'http://localhost/api/graphql',
    link: authenticateRequest,
    onError: ({ response, operation }) => {
        if (operation.operationName === "IgnoreErrorsQuery") {
            response.errors = null;
        }
    }
});

const root = (
    <Provider store={store}>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </Provider>
);

render(root, document.getElementById('app'));
