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

  query movieList($sort: SORT_TYPE, $showLikes: Boolean!, $page: Int!) {
    movies(sort: $sort, page: $page) @skip(if: $showLikes) {
      ...MovieInfo
    }
    likes @include(if: $showLikes) {
      ...MovieInfo
    }
  }
`;

export default class MovieList extends Component {
  state = { sort: null, page: 1 };

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
        variables={{ showLikes: false, page: 1 }}
        context={{
          headers: { authorization: user && user.token ? user.token : '' },
        }}
      >
        {({ loading, error, data, refetch, fetchMore }) =>
          loading || error ? (
            <div>Loading...</div>
          ) : (
            <div>
              <select
                style={{ marginBottom: 8 }}
                onChange={({ target: { value } }) => {
                  const sort = this.getSortValue(value);
                  this.setState(s => ({ sort }));
                  refetch({
                    sort: sort === 'LIKES' ? null : sort,
                    showLikes: sort === 'LIKES',
                    page: 1,
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
              <button
                onClick={() => {
                  const page = this.state.page + 1;
                  this.setState(s => ({ page }));
                  return fetchMore({
                    variables: {
                      page,
                      sort: this.state.sort,
                      showLikes: this.state.sort === 'LIKES',
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) return prev;
                      return {
                        ...prev,
                        movies: [...prev.movies, ...fetchMoreResult.movies],
                      };
                    },
                  });
                }}
              >
                Load More
              </button>
            </div>
          )
        }
      </Query>
    );
  };
}
