import { Movie } from './components/movie/movie.js'
import { Grid } from './components/grid/grid.js'
import { Controls } from './components/controls/controls.js'

import moviesData from './moviesData.js'

// Data
const movies = moviesData.map(movie => new Movie(movie))

// UI
const grid = new Grid(
  document.querySelector('.grid'),
  movies
)

/* eslint-disable */
const controls = new Controls(
  document.querySelector('.controls'),
  moviesData,
  grid.filterByCategoryId.bind(grid),
  grid.resetFilter.bind(grid)
)
