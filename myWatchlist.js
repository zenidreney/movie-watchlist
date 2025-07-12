import { renderMovies } from "./renderMovies.js";

const mySavedMovies = localStorage.getItem("savedMovies");
const resultsContainer = document.getElementById("results-container");
let myWatchlist = mySavedMovies ? JSON.parse(mySavedMovies) : [];

//console.log(myWatchlist);

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("read-more")) {
        handleReadMore(e);
    } else if (e.target.id.startsWith("add-watch")) {
        console.log("clicked");
        const imdbID = e.target.id.replace("add-watch-", "");

        const reducedMovies = myWatchlist.filter((movie) => {
            return movie !== imdbID;
        });

        console.log(reducedMovies);
        myWatchlist = reducedMovies;
        deleteMoviesLocally();

        const movieToDelete = document.getElementById(`movie-container-${imdbID}`);
        console.log(movieToDelete);
        movieToDelete.innerHTML = "";
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
                renderMovies(movie, resultsContainer, "./media/minus.png");
            });
    });
}

function handleReadMore(e) {
    const eIndex = e.target.id.split("-").pop();
    //console.log(eIndex);
    const eContainer = document.getElementById(`movie-container-${eIndex}`);

    eContainer.classList.toggle("toggle-movie-container");

    if (e.target.textContent === "Read More") {
        e.target.textContent = "Read Less";
    } else if (e.target.textContent === "Read Less") {
        e.target.textContent = "Read More";
    }
}
