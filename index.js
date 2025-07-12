import { renderMovies } from "./renderMovies.js";

const mySavedMovies = localStorage.getItem("savedMovies");
let myWatchlist = mySavedMovies ? JSON.parse(mySavedMovies) : [];

const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("results-container");


document.addEventListener("click", function (e) {
    if (e.target.matches("#search-btn")) {
        handleSearchBtn(e);
    } else if (e.target.classList.contains("read-more")) {
        handleReadMore(e);
    } else if (e.target.id.startsWith("add-watch")) {
        const imdbID = e.target.id.replace("add-watch-", "");
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

    fetch(`https://www.omdbapi.com/?apikey=73de4715&s=${searchInput.value}`)
        .then((res) => res.json())
        .then((data) => {
            //console.log(data);
            data.Search.forEach((movie, i) => {
                //console.log(movie.Title);
                fetch(`https://www.omdbapi.com/?apikey=73de4715&i=${movie.imdbID}`)
                    .then((res) => res.json())
                    .then((movie) => {
                        //console.log(movie);
                        renderMovies(movie, resultsContainer, "./media/plus.png");
                    });
            });
        });

    /*Reset form field*/

    document.getElementById("search-form").reset();
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
