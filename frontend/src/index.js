import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ApolloClient from 'apollo-client';
import { HttpLink, ApolloLink, InMemoryCache } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import store from './store';

import App from './App';

const httpLink = new createHttpLink({ uri: '/api/graphql' });

// Middleware to add token to request headers
const authenticateRequest = setContext(() => ({
    headers: {
        'x-token': localStorage.getItem('x-token'),
        'x-refresh-token': localStorage.getItem('x-refresh-token'),
    }
}));

// Afterware to get and set updated tokens from response 
const retrieveTokens = new ApolloLink((operation, forward) => {
    const { headers } = operation.getContext();
    if (headers) {
        const token = headers.get('x-token');
        const refreshToken = headers.get('x-refresh-token');

        if (token) {
            localStorage.setItem('x-token', token);
        }

        if (refreshToken) {
            localStorage.setItem('x-refresh-token', token);
        }
    }

    return forward(operation);
});

const link = retrieveTokens.concat(authenticateRequest.concat(httpLink));

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
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
