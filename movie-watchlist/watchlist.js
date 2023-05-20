import { populatePage } from './index.js';

const moviesInWatchlist = JSON.parse(localStorage.getItem("moviesOnWatchlist"));

console.log(moviesInWatchlist);

populatePage(moviesInWatchlist,false);