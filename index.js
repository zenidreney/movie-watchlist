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
                    
                            const movieContainer = document.createElement("div");

                                const movieNameContainer = document.createElement("div");
                                movieNameContainer.className = "movie-info-container";


                                    const movieTitle = document.createElement("h3");
                                    movieTitle.textContent = movie.Title;

                                    const starIcon = document.createElement("img");
                                    starIcon.src = "./media/star-icon.png";

                                    const ratingScore = document.createElement("p");
                                    ratingScore.textContent = movie.imdbRating;

                                movieNameContainer.append(movieTitle, starIcon, ratingScore);
                    
                                const detailsContainer = document.createElement("div");
                                detailsContainer.className = "movie-info-container";
                    
                                    const lengthPara = document.createElement("p");
                                    lengthPara.textContent = movie.Runtime;
                    
                                    const genresPara = document.createElement("p");
                                    genresPara.textContent = movie.Genre;
                    
                                    const addButton = document.createElement("button");
                    
                                        const addIcon = document.createElement("img");
                                        addIcon.src = "./media/plus.png";
                    
                                        const addPara = document.createElement("p");
                                        addPara.textContent = "Watchlist";
                                       
                    
                                    addButton.append(addIcon, addPara);
                    
                    
                    
                                detailsContainer.append(lengthPara, genresPara, addButton);
                    
                                const resumePara = document.createElement("p");
                                resumePara.textContent = movie.Plot;
                    
        
                    
                            movieContainer.append(movieNameContainer, detailsContainer, resumePara);

                        div.append(moviePoster, movieContainer);
                    
                    resultsContainer.append(div);
                    
                    });
            });
        });
    
    /*Reset form field*/
    
    document.getElementById("search-form").reset();
}
