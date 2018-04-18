import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import MovieTile from './components/movie-tile';

const MOVIES_QUERY = gql`
  {
    movies {
      id
      title
      isLiked
      score
      overview
      popularity
      isLiked
      poster
    }
  }
`;

class App extends Component {
  render() {
    return (
      <div className="App" style={styles.container}>
        <Query query={MOVIES_QUERY}>
          {({ loading, error, data }) =>
            loading || error ? (
              <div />
            ) : (
              <div>
                {data.movies.map(movie => (
                  <MovieTile key={movie.id} {...movie} />
                ))}
              </div>
            )
          }
        </Query>
      </div>
    );
  }
}

const styles = {
  container: { maxWidth: 900, margin: '16px auto' },
};

export default App;
