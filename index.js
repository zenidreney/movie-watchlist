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

            data.Search.forEach((movie) => {
                //console.log(movie.Title);

                fetch(`https://www.omdbapi.com/?apikey=73de4715&i=${movie.imdbID}`)
                    .then((res) => res.json())
                    .then((movie) => {
                        console.log(movie);
                    
                        const div = document.createElement("div");

                            const moviePoster = document.createElement("img");
                            moviePoster.src = movie.Poster;
                            moviePoster.className = "movie-poster";

                            const movieNameContainer = document.createElement("div");
                            movieNameContainer.className = "movie-name-container";


                                const movieTitle = document.createElement("h3");
                                movieTitle.textContent = movie.Title;

                                const starIcon = document.createElement("img");
                                starIcon.src = "./media/star-icon.png";

                                const ratingScore = document.createElement("p");
                                ratingScore.textContent = movie.imdbRating;

                            movieNameContainer.append(movieTitle, starIcon, ratingScore);

                        div.append(moviePoster, movieNameContainer);
                    
                    resultsContainer.append(div);
                    
                    });
            });
        });
    
    /*Reset form field*/
    
    document.getElementById("search-form").reset();
}
