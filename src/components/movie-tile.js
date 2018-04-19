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
      isLiked
    }
  }
`;

const GET_USER_QUERY = gql`
  {
    token @client
  }
`;

export default ({
  title,
  poster,
  overview,
  popularity,
  score,
  isLiked,
  id,
}) => (
  <Query query={GET_USER_QUERY}>
    {({ data: { token }, loading, error }) =>
      loading || error ? null : (
        <Mutation mutation={LIKE_MOVIE_MUTATION}>
          {(toggleMovieLike, { data }) => (
            <div style={styles.container}>
              <img src={poster} style={{ height: 160 }} alt={title} />
              <div style={styles.content}>
                <h3 style={{ display: 'inline' }}>{title}</h3>
                <p style={styles.p}>{overview}</p>
                <p>
                  Rating: {score}/10 {getScoreIcon(score)}
                </p>
                <div onClick={() => toggleMovieLike({ variables: { id } })}>
                  <Heart
                    bold
                    active={isLiked}
                    color={isLiked ? 'red' : 'black'}
                  />
                </div>
              </div>
            </div>
          )}
        </Mutation>
      )
    }
  </Query>
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
