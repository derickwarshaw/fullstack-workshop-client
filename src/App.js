import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Login from './components/login';
import MovieList from './components/movie-list';

const GET_USER_QUERY = gql`
  {
    token @client
    email @client
  }
`;

class App extends Component {
  render() {
    return (
      <Query query={GET_USER_QUERY}>
        {({ data: { email, token }, loading, error }) => {
          return loading || error ? null : (
            <div className="App" style={styles.container}>
              <Login user={email ? { email, token } : null} />
              <MovieList user={email ? { email, token } : null} />
            </div>
          );
        }}
      </Query>
    );
  }
}

const styles = {
  container: { maxWidth: 900, margin: '16px auto' },
};

export default App;
