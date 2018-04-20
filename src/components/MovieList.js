/*
TODO: Creating Query components

PART 1:
1. Remove the seed data that's currently powering the MovieTile component
2. Create queries - you should have two (GET_MOVIES) and (GET_LIKED_MOVIES).
Both should share the same fields through a fragment.
3. You can pass different queries into the Query component depending on state and props.
Check out this.state.sort and the Filter component to choose your query based on what
sorting option is selected.
4. Handle loading and error state

PART 2:
1. Wire up the load more button so it uses fetchMore for pagination
2. HINT: Each page has 20 items. This will help you when you calculate the next page number
*/

import React, { Component } from 'react';

import MovieTile from './MovieTile';
import Filter from './Filter';

import data from '../data';

export default class MovieList extends Component {
  state = { sort: 'POPULARITY' };

  onFilterChange = sort => this.setState({ sort });

  render = () => {
    return (
      <div>
        <Filter
          onFilterChange={this.onFilterChange}
          selected={this.state.sort}
        />
        {(data.movies || data.likes).map(movie => (
          <MovieTile key={movie.id} movie={movie} />
        ))}
        {data.movies && <button onClick={() => {}}>Load More</button>}
      </div>
    );
  };
}
