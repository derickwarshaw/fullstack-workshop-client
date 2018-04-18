import React from 'react';
import Heart from './heart';

const getScoreIcon = score => {
  if (score >= 7.5) return '👏';
  else if (score < 7.5 && score >= 5) return '🙂';
  if (score < 5 && score >= 2.5) return '🙁';
  if (score < 2.5) return '👎';
};

export default ({ title, poster, overview, popularity, score, isLiked }) => (
  <div style={styles.container}>
    <img src={poster} style={{ height: 160 }} alt={title} />
    <div style={styles.content}>
      <h3 style={{ display: 'inline' }}>{title}</h3>
      <p>{overview}</p>
      <p>
        Rating: {score}/10 {getScoreIcon(score)}
      </p>
      <Heart bold active={isLiked} color={isLiked ? 'red' : 'black'} />
    </div>
  </div>
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
};
