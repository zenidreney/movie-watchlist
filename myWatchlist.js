import { renderMovies } from "./renderMovies.js";
import { handleReadMore } from "./handleReadMore.js";

const mySavedMovies = localStorage.getItem("savedMovies");
const resultsContainer = document.getElementById("results-container");
let myWatchlist = mySavedMovies ? JSON.parse(mySavedMovies) : [];

//console.log(myWatchlist);

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("read-more")) {
        handleReadMore(e);
    } else if (e.target.id.startsWith("add-remove")) {
        const imdbID = e.target.id.replace("add-remove-", "");
        const reducedMovies = myWatchlist.filter((movie) => {
            return movie !== imdbID;
        });

        myWatchlist = reducedMovies;
        deleteMoviesLocally();

        const movieToDelete = document.getElementById(`movie-container-${imdbID}`);
        movieToDelete.innerHTML = "";

        if (myWatchlist.length === 0) {
            resultsContainer.innerHTML = `
                <div class="landing-container">
                    <p>Your watchlist is looking a little empty</p>
                    <a href="./index.html" class="details-box"><img src="media/plus.png" />
                                    Let'd add some movies</a>
                </div>`;
        }
    }
});

function deleteMoviesLocally() {
    localStorage.setItem("savedMovies", JSON.stringify(myWatchlist));
}

if (myWatchlist.length > 0) {
    resultsContainer.innerHTML = "";

    myWatchlist.forEach((movie) => {
        fetch(`https://www.omdbapi.com/?apikey=73de4715&i=${movie}`)
            .then((res) => res.json())
            .then((movie) => {
                //console.log(movie);
                renderMovies(movie, resultsContainer, "./media/minus.png", "Remove");
            });
    });
}
