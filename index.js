const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("results-container");

document.addEventListener("click", function (e) {
    if (e.target.matches("#search-btn")) {
        handleSearchBtn(e);
    } else if (e.target.classList.contains("read-more")) {
        handleReadMore(e);
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
                        //console.log(movie);

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
                                <p class="theme-para">
                                    ${movie.Plot}
                                </p>
                                <button class="read-more" id="read-more-${i}">Read More</button>
                            </div>
                        </div>
                        `;
                        readMore();
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
    
    if(e.target.textContent === "Read More") {
        e.target.textContent = "Read Less";
    } else if (e.target.textContent === "Read Less") {
        e.target.textContent = "Read More";
    }
}

function readMore() {
    const themePara = document.querySelectorAll(".theme-para");

    themePara.forEach((para, i) => {
        console.log(para.offsetHeight, para.scrollHeight, para.clientHeight, window.getComputedStyle(para).lineHeight);
        const readMoreBtn = document.getElementById(`read-more-${i}`);

        if (para.scrollHeight > para.offsetHeight) {
            //console.log(i, readMoreBtn);
            readMoreBtn.style.display = "inline-block";
           
        }
    });
}

readMore();








