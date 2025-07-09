const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("results-container");

document.getElementById("search-btn").addEventListener("click", handleSearchBtn);

function handleSearchBtn(e) {
    e.preventDefault();

    fetch(`https://www.omdbapi.com/?apikey=73de4715&s=${searchInput.value}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);

            data.Search.forEach((movie) => {
                //console.log(movie.Title);
                
                 fetch(`https://www.omdbapi.com/?apikey=73de4715&i=${movie.imdbID}`)
                    .then((res) => res.json())
                    .then((data) => console.log(data))

                const movieTitle = document.createElement("h3");
                movieTitle.textContent = movie.Title;

                resultsContainer.append(movieTitle);
            });
        });
}

