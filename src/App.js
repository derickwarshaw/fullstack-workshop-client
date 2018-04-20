import React, { Component } from 'react';

import Login from './components/Login';
import MovieList from './components/MovieList';

class App extends Component {
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>My Favorite Movies 🎬</h1>
          <Login />
        </div>
        <MovieList />
      </div>
    );
  }
}

const styles = {
  container: { maxWidth: 900, margin: '16px auto' },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    width: '100%',
  },
};

export default App;
