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
        const imdbID = e.target.id.replace("add-remove-", "");
        if (!myWatchlist.includes(imdbID)) {
            myWatchlist.unshift(imdbID);
            saveMoviesLocally();

            /*UI*/
            const movieAdded = document.getElementById("movie-added");
            //console.log("added");
            movieAdded.classList.add("visible");
            setTimeout(function () {
                movieAdded.classList.remove("visible");
            }, 2000);
        } else {
            const movieAlready = document.getElementById("movie-already");
            //console.log(movieAlready);
            movieAlready.classList.add("visible");
            setTimeout(function () {
                movieAlready.classList.remove("visible");
            }, 2000);
        }
    }
});

function saveMoviesLocally() {
    localStorage.setItem("savedMovies", JSON.stringify(myWatchlist));
}

function handleSearchBtn(e) {
    e.preventDefault();
    resultsContainer.innerHTML = "";

    if (!searchInput.value.trim()) {
        console.log("do something");
        searchInput.focus();
        resultsContainer.innerHTML = `
                            <div class="landing-container">
                                <p>Please type in a movie to search.</p>
                            </div>
                            `;
        return;
    }

    fetch(`https://www.omdbapi.com/?apikey=73de4715&s=${searchInput.value}`)
        .then((res) => {
            //console.log(res.status);
            if (!res.ok) {
                throw Error(`Error code: ${res.status} could not get search results!`);
            }
            return res.json();
        })
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
            data.Search.forEach((movie) => {
                //console.log(movie.Title);
                fetch(`https://www.omdbapi.com/?apikey=73de4715&i=${movie.imdbID}`)
                    .then((res) => {
                        //console.log(res);
                        if (!res.ok) {
                            throw Error(`Error code: ${res.status} could not get movie!`);
                        }
                        return res.json();
                    })
                    .then((singleMovie) => {
                        console.log(singleMovie);
                        if (singleMovie.Response === "False") {
                            throw Error(`${movie.Title} response false. imdbID: ${movie.imdbID} is not valid!`);
                        }
                        renderMovies(singleMovie, resultsContainer, "./media/plus.png", "Watchlist");
                    })
                    .catch((err) => {
                        console.error(err, movie.imdbID, movie.Title);
                        resultsContainer.innerHTML += `<div>
                                <p>${movie.Title} cannot be reached.</p>
                            </div>
                            `;
                    });
            });
        })
        .catch((err) => {
            console.error(err);
            resultsContainer.innerHTML = `
                            <div class="landing-container">
                                <p>Something went wrong. Please try again later.</p>
                            </div>
                            `;
        });

    /*Reset form field*/

    document.getElementById("search-form").reset();
}
