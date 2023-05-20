const movieData = localStorage.getItem("movieData");
console.log(movieData);
//89303cfa
//836f9959
const apiKey = "89303cfa";
const searchBarEl = document.getElementById("search-bar");
const moviesEl = document.getElementById("movies");
const clearSearchBarBtn = document.getElementById("clear-btn");
const webTitle = document.getElementById("website-title");

if(clearSearchBarBtn){
    clearSearchBarBtn.addEventListener('click', ()=>{
        searchBarEl.value = ""
        webTitle.innerHTML = `Search for your favourite movies.`;
        moviesEl.innerHTML = "";
    })
}

let debounceTimer;
if(searchBarEl){
    searchBarEl.addEventListener("keyup", () => {
        clearTimeout(debounceTimer);
    
        debounceTimer = setTimeout(() => {
            moviesEl.innerHTML = "";
            let searchTerm = searchBarEl.value;
            if (searchBarEl.value.length > 0) {
                webTitle.innerHTML = `Showing results for '${searchTerm}'`;
            } else {
                webTitle.innerHTML = `Search for your favourite movies.`;
            }
    
            let Url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}&type=movie`;
            fetch(Url)
                .then(response => response.json())
                .then(data => {
                    const totalResults = parseInt(data.totalResults);
                    const itemsPerPage = 10; // Number of items per page
                    const totalPages = Math.ceil(totalResults / itemsPerPage);
    
                    for (let i = 1; i <= totalPages; i++) {
                        let pageUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}&type=movie&page=${i}`;
                        fetch(pageUrl)
                            .then(response => response.json())
                            .then(data => {
                                populatePage(data,true);
                            });
                    }
                })
                .catch(error => {
                    console.log("Error:", error);
                });
        }, 500); // Set debounce delay in milliseconds
    });
}


export const populatePage = (movieData, isQuery) => {
    let sortedMovies = movieData;
    if(isQuery == true){
        const moviesWithPoster = movieData.Search.filter(movie => movie.Poster !== "N/A");
        sortedMovies = moviesWithPoster.sort((a, b) => b.Year.localeCompare(a.Year));
    }
    
    sortedMovies.forEach(movie => {

        const movieObject = document.createElement('div');
        movieObject.classList.add('movie-object');
        
        const ribbon = document.createElement('img');
        ribbon.src = './assets/ribbon.png';
        ribbon.alt = 'bookmark';
        ribbon.classList.add('ribbon');
        ribbon.addEventListener('click' , () => {
            showAddToWatchlistModal(movie);
        })
        
        const poster = document.createElement('img');
        poster.src = movie.Poster;
        poster.alt = 'poster';
        poster.classList.add('poster');
        
        const movieInfo = document.createElement('div');
        const movieTitle = document.createElement('p');
        movieTitle.classList.add('movie-title');
        movieTitle.textContent = movie.Title;
        
        const movieYear = document.createElement('p');
        movieYear.classList.add('movie-year');
        movieYear.textContent = `(${movie.Year})`;

        movieInfo.appendChild(movieTitle);
        movieInfo.appendChild(movieYear);
        
        movieObject.appendChild(ribbon);
        movieObject.appendChild(poster);
        movieObject.appendChild(movieInfo);

        moviesEl.appendChild(movieObject);

    });
}

const watchlistEl =  document.getElementById("watchlist");
watchlistEl.addEventListener('click', () => {
    window.location.href = "./watchlist.html";
});

const homeEl = document.getElementById("home-element");
homeEl.addEventListener('click' , () => {
    window.location.href = "./index.html";
});

const showAddToWatchlistModal = (dataObj) => {
    const blurEl = document.getElementsByClassName("blur");
    Array.from(blurEl).forEach(element => {
        element.classList.add("blurry");
    });

    const modal = document.getElementById("modal");
    modal.style.display = "flex";
    const movieTitle = document.getElementById("movie-title");
    movieTitle.textContent = dataObj.Title;

    const yesBtn = document.getElementById("yes");
    const noBtn = document.getElementById("no");

    yesBtn.addEventListener("click", () => {
        const moviesOnWatchlistArr = localStorage.getItem("moviesOnWatchlist")
        ? JSON.parse(localStorage.getItem("moviesOnWatchlist"))
        : [];

    // Remove any existing item with the same imdbID
    const updatedArr = moviesOnWatchlistArr.filter(movie => movie.imdbID !== dataObj.imdbID);

    // Add the new item to the array
    updatedArr.push(dataObj);

    localStorage.setItem("moviesOnWatchlist", JSON.stringify(updatedArr));
    
    removeModal();
    })

    noBtn.addEventListener("click", () => {
        removeModal();
    })
}

const removeModal = () => {
    const blurEl = document.getElementsByClassName("blur");
    const modal = document.getElementById("modal");
    Array.from(blurEl).forEach(element => {
        element.classList.remove("blurry");
    });
    modal.style.display = "none";
}




// {
//     "Title":"Guardians of the Galaxy Vol. 2",
//     "Year":"2017",
//     "Rated":"PG-13",
//     "Released":"05 May 2017",
//     "Runtime":"136 min",
//     "Genre":"Action, Adventure, Comedy",
//     "Director":"James Gunn",
//     "Writer":"James Gunn, Dan Abnett, Andy Lanning",
//     "Actors":"Chris Pratt, Zoe Saldana, Dave Bautista",
//     "Plot":"The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father the ambitious celestial being Ego.",
//     "Language":"English",
//     "Country":"United States",
//     "Awards":"Nominated for 1 Oscar. 15 wins & 60 nominations total",
//     "Poster":"https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg",
//     "Ratings":[{"Source":"Internet Movie Database","Value":"7.6/10"},{"Source":"Rotten Tomatoes","Value":"85%"},{"Source":"Metacritic","Value":"67/100"}],
//     "Metascore":"67",
//     "imdbRating":"7.6",
//     "imdbVotes":"699,402",
//     "imdbID":"tt3896198",
//     "Type":"movie",
//     "DVD":"22 Aug 2017",
//     "BoxOffice":"$389,813,101",
//     "Production":"N/A",
//     "Website":"N/A",
//     "Response":"True"
// }