import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import './index.css';
import App from './App';

const client = new ApolloClient({
  uri: 'http://localhost:8001/graphql',
  clientState: {
    defaults: {
      // token: 'ZGF3a2luc2poQGdtYWlsLmNvbQ==',
      // email: 'dawkinsjh@gmail.com',
      token: null,
      email: null,
    },
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
