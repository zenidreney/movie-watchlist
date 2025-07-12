export function renderMovies(movie, container) {
    container.innerHTML += `
                        <div class="movie-container" id="movie-container-${movie.imdbID}">
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
                                <button id="add-watch-${movie.imdbID}">
                                    <img src="media/plus.png" />
                                    Watchlist
                                </button>
                            </div>
                            <div class="grid-item theme-box">
                                <p class="theme-para" id="theme-para-${movie.imdbID}">
                                    ${movie.Plot}
                                </p>
                                <button class="read-more" id="read-more-${movie.imdbID}">Read More</button>
                            </div>
                        </div>
                        `;
    
      /*Logic to add a Read-More button if the theme is too long*/

                        const themePara = document.getElementById(`theme-para-${movie.imdbID}`);
                        //console.log(themePara);
                        const readMoreBtn = document.getElementById(`read-more-${movie.imdbID}`);
                        //console.log(readMoreBtn);

                        //console.log(
                        //    "Offset: ",
                        //    themePara.offsetHeight,
                        //    "Scroll:",
                        //    themePara.scrollHeight,
                        //    "Client: ",
                        //    themePara.clientHeight,
                        //    "Window: ",
                        //    window.getComputedStyle(themePara).lineHeight
                        //);

                        if (themePara.scrollHeight > themePara.clientHeight + 2) {
                            //console.log("do something");
                            readMoreBtn.style.display = "block";
                        }
}
