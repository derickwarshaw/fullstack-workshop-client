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
      poster
      cast {
        name
        id
        photo
      }
    }
  }
`;

export default ({ onLoginPress, onLogoutPress, user }) => (
  <Query
    query={MOVIES_QUERY}
    context={{
      headers: { authorization: user && user.token ? user.token : '' },
    }}
  >
    {({ loading, error, data }) =>
      loading || error ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data.movies.map(movie => {
            console.log(movie);
            return <MovieTile key={movie.id} movie={movie} user={user} />;
          })}
        </div>
      )
    }
  </Query>
);
