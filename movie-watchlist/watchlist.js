import { populatePage } from './index.js';

const moviesInWatchlist = JSON.parse(localStorage.getItem("moviesOnWatchlist"));

console.log(moviesInWatchlist);

populatePage(moviesInWatchlist,false);

const clearWatchlistEl = document.getElementById("clear-watchlist");
clearWatchlistEl.addEventListener('click' , () =>{
    localStorage.removeItem("moviesOnWatchlist");
    const moviesEl = document.getElementById("movies");
    moviesEl.innerHTML = '';
});

