import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import store from './store';

import App from './App';

const client = new ApolloClient({
    uri: `http://localhost/api/graphql`,
    onError: (({ response, operation }) => {
        if (operation.operationName === "IgnoreErrorsQuery") {
            response.errors = null;
        }
    })
});

const root = (
    <Provider store={store}>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </Provider>
);

render(root, document.getElementById('app'));
