import { renderMovies } from "./renderMovies.js";
import { handleReadMore } from "./handleReadMore.js";

const mySavedMovies = localStorage.getItem("savedMovies");
let myWatchlist = mySavedMovies ? JSON.parse(mySavedMovies) : [];

const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("results-container");

document.addEventListener("click", function (e) {
    if (e.target.matches("#search-btn")) {
        handleSearchBtn(e);
    } else if (e.target.classList.contains("read-more")) {
        handleReadMore(e);
    } else if (e.target.id.startsWith("add-remove")) {
        /*UI*/
        const movieAdded = document.getElementById("movie-added");
        console.log("added");
        movieAdded.classList.add("visible");
        setTimeout(function(){
            movieAdded.classList.remove("visible");
        }, 2000);
        
        
        const imdbID = e.target.id.replace("add-remove-", "");
        if (!myWatchlist.includes(imdbID)) {
            myWatchlist.unshift(imdbID);
            saveMoviesLocally();
        } else return;
        
        
    }
});

function saveMoviesLocally() {
    localStorage.setItem("savedMovies", JSON.stringify(myWatchlist));
}

function handleSearchBtn(e) {
    e.preventDefault();
    resultsContainer.innerHTML = "";

    fetch(`https://www..com/?apikey=73de4715&s=${searchInput.value}`) /*Deleted the URL for error handling test*/
        .then((res) => res.json())
        .then((data) => {
            //console.log(data);

            if (data.Response === "False") {
                resultsContainer.innerHTML = `
                <div class="landing-container">
                    
                    <p>Unable to find what you’re looking for. Please try another search.</p>
                </div>
                `;
                return;
            }

            data.Search.forEach((movie, i) => {
                //console.log(movie.Title);
                fetch(`https://www.omdbapi.com/?apikey=73de4715&i=${movie.imdbID}`)
                    .then((res) => res.json())
                    .then((movie) => {
                        //console.log(movie);
                        renderMovies(movie, resultsContainer, "./media/plus.png", "Watchlist");
                    });
            });
        })
        .catch(err => console.log("err"));

    /*Reset form field*/

    document.getElementById("search-form").reset();
}
