import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Login from './components/login';
import MovieList from './components/movie-list';

class App extends Component {
  render() {
    return (
      <div className="App" style={styles.container}>
        <Login />
        <MovieList />
      </div>
    );
  }
}

const styles = {
  container: { maxWidth: 900, margin: '16px auto' },
};

export default App;
