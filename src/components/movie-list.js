import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import MovieTile from './movie-tile';

const MOVIES_QUERY = gql`
  fragment MovieInfo on Movie {
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

  query movieList($sort: SORT_TYPE, $showLikes: Boolean!) {
    movies(sort: $sort) @skip(if: $showLikes) {
      ...MovieInfo
    }
    likes @include(if: $showLikes) {
      ...MovieInfo
    }
  }
`;

export default class MovieList extends Component {
  state = { sort: null };

  getSortValue = option => {
    switch (option.toLowerCase()) {
      case 'popularity':
        return 'POPULARITY';
      case 'release date':
        return 'RELEASE_DATE';
      case 'liked':
        return 'LIKES';
    }
  };

  render = () => {
    const { user } = this.props;
    return (
      <Query
        query={MOVIES_QUERY}
        variables={{ showLikes: false }}
        context={{
          headers: { authorization: user && user.token ? user.token : '' },
        }}
      >
        {({ loading, error, data, refetch }) =>
          loading || error ? (
            <div>Loading...</div>
          ) : (
            <div>
              <select
                style={{ marginBottom: 8 }}
                onChange={({ target: { value } }) => {
                  refetch({
                    sort:
                      this.getSortValue(value) === 'LIKES'
                        ? null
                        : this.getSortValue(value),
                    showLikes: this.getSortValue(value) === 'LIKES',
                  });
                }}
                defaultValue={'default'}
              >
                <option value="default" disabled hidden>
                  Sort By...
                </option>
                {user ? <option>Liked</option> : null}
                <option>Popularity</option>
                <option>Release Date</option>
              </select>
              {(data.movies || data.likes).map(movie => (
                <MovieTile key={movie.id} movie={movie} user={user} />
              ))}
            </div>
          )
        }
      </Query>
    );
  };
}
