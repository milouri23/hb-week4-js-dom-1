/* eslint-disable */
import { Movie } from './components/movie/movie.js'
import { Grid } from './components/grid/grid.js'
import { Controls } from './components/controls/controls.js'

import moviesData from './moviesData.js'

// Data
const movies = moviesData.map((movie) => {
  return new Movie(movie)
})

// UI
const grid = new Grid(
  document.querySelector('.grid'),
  movies
)

const controls = new Controls(
  document.querySelector('.controls'),
  moviesData,
  (categoryId) => {
    grid.filterByCategoryId(categoryId)
  },
  () => {
    grid.resetFilter()
  }
)
