const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("results-container");

document.addEventListener("click", function (e) {
    if (e.target.matches("#search-btn")) {
        handleSearchBtn(e);
    }
});

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
                        console.log(movie);
                    
                    
                        //const gridItem = document.createElement("div");
                        //gridItem.className = "grid-item poster-box";
                    //
                        //    const moviePoster = document.createElement("img");
                        //    moviePoster.src = movie.Poster;
                    //
                        //gridItem.append(moviePoster);
                    //
                    //
                        //resultsContainer.append(gridItem);

                        resultsContainer.innerHTML += `
                        <div class="movie-container" id="movie-container-${i}">
                            <div class="grid-item poster-box">
                                <img src="${movie.Poster}"/>
                            </div>
                            <div class="grid-item name-box">
                                <h3>${movie.Title} </h3>
                                <img src="media/star-icon.png" />
                                <p>${movie.imdbRating}</p>
                            </div>
                            <div class="grid-item details-box">
                                <p>${movie.Runtime}</p>
                                <p>${movie.Genre}</p>
                                <button id="add-watch-btn-${i}">
                                    <img src="media/plus.png" />
                                    Watchlist
                                </button>
                            </div>
                            <div class="grid-item theme-box">
                                <p>
                                    ${movie.Plot}
                                </p>
                            </div>
                        </div>
                        `;

                    });
            });
        });

    /*Reset form field*/

    document.getElementById("search-form").reset();
}
