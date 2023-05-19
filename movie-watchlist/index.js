
const movieData = localStorage.getItem("movieData");
console.log(movieData);


const apiKey = "836f9959";
const searchBarEl = document.getElementById("search-bar");
searchBarEl.addEventListener("keyup", () => {
   
    let searchTerm = searchBarEl.value;
    let Url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}&type=movie`;
    fetch(Url)
    .then(response => response.json())
    .then(data => {
        populatePage(data);

    })
    .catch(error => {
        console.log("Error:", error);
    });

}); 

const populatePage = (movieData) => {
    const moviesEl = document.getElementById("movies");
    moviesEl.innerHTML="";
    movieData.Search.forEach(movie => {
        moviesEl.innerHTML += `
        <div class="movie-object">
            <img src="./assets/ribbon.png" alt="bookmark" class="ribbon">
            <img src="${movie.Poster}" alt="poster" class="poster">
            <div>
            <p class="movie-title">${movie.Title}</p>
            <p class="movie-year">(${movie.Year})</p>
            </div>
        </div>
    `;
    });
   
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