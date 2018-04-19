import React from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';

import Heart from './heart';

const getScoreIcon = score => {
  if (score >= 7.5) return '👏';
  else if (score < 7.5 && score >= 5) return '🙂';
  if (score < 5 && score >= 2.5) return '🙁';
  if (score < 2.5) return '👎';
};

const LIKE_MOVIE_MUTATION = gql`
  mutation toggleMovieLike($id: ID!) {
    toggleLike(id: $id) {
      id
      isLiked
    }
  }
`;

export default ({
  movie: { title, poster, overview, popularity, score, isLiked, id },
  user,
}) => (
  <Mutation
    mutation={LIKE_MOVIE_MUTATION}
    context={{
      headers: { authorization: user && user.token ? user.token : '' },
    }}
  >
    {(toggleMovieLike, { data }) => {
      const movieIsLiked =
        isLiked || (data && data.toggleLike && data.toggleLike.isLiked);

      return (
        <div style={styles.container}>
          <img src={poster} style={{ height: 160 }} alt={title} />
          <div style={styles.content}>
            <h3 style={{ display: 'inline' }}>{title}</h3>
            <p style={styles.p}>{overview}</p>
            <p>
              Rating: {score}/10 {getScoreIcon(score)}
            </p>
            <div
              onClick={() =>
                toggleMovieLike({
                  variables: { id },
                  optimisticResponse: {
                    __typename: 'Movie',
                    id,
                    isLiked: !isLiked,
                  },
                })
              }
            >
              <Heart
                bold
                active={movieIsLiked}
                color={movieIsLiked ? 'red' : 'black'}
              />
            </div>
          </div>
        </div>
      );
    }}
  </Mutation>
);

const styles = {
  container: {
    minHeight: 160,
    padding: 8,
    backgroundColor: 'white',
    display: 'flex',
    width: '100%',
    border: '1px solid',
    marginBottom: 16,
    borderRadius: 4,
  },
  content: {
    marginLeft: 8,
  },
  p: {
    marginTop: 8,
  },
};
