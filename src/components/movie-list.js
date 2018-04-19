import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import MovieTile from './movie-tile';

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
      cast {
        name
        id
        photo
      }
    }
  }
`;

export default ({ onLoginPress, onLogoutPress }) => (
  <Query query={MOVIES_QUERY}>
    {({ loading, error, data }) =>
      loading || error ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data.movies.map(movie => <MovieTile key={movie.id} {...movie} />)}
        </div>
      )
    }
  </Query>
);
