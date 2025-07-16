//renderMovies({ movieObject }, <div>, "img", "text string")
export function renderMovies(movie, container, addOrRemoveIcon, addRemoveText) {
    
    container.innerHTML += `
                        <div class="movie-container" id="movie-container-${movie.imdbID}">
                            <div class="grid-item poster-box">
                                <img 
                                onerror="this.onerror = null; this.src='media/movieicon.png'"
                                src="${movie.Poster === "N/A" ? "./media/movieicon.png" : movie.Poster}"/>
                            </div>
                            <div class="grid-item name-box">
                                <h3>${movie.Title} </h3>
                                <img src="media/star-icon.png" />
                                <p>${movie.imdbRating}</p>
                            </div>
                            <div class="grid-item details-box">
                                <p>${movie.Runtime}</p>
                                <p>${movie.Genre}</p>
                                <button id="add-remove-${movie.imdbID}">
                                    <img src=${addOrRemoveIcon} />
                                    ${addRemoveText}
                                </button>
                            </div>
                            <div class="grid-item theme-box" id="theme-box-${movie.imdbID}">
                                <p class="theme-para" id="theme-para-${movie.imdbID}">
                                    ${movie.Plot}
                                </p>
                                <button class="read-more" id="read-more-${movie.imdbID}">Read More</button>
                            </div>
                        </div>
                        `;
    
      /*Logic to add a Read-More button if the theme is too long*/

                        const themePara = document.getElementById(`theme-para-${movie.imdbID}`);
                        const readMoreBtn = document.getElementById(`read-more-${movie.imdbID}`);
                        const themeBox = document.getElementById(`theme-box-${movie.imdbID}`);
    
                        if (themePara.scrollHeight > themePara.clientHeight + 2) {
                            //console.log("do something");
                            readMoreBtn.style.display = "block";
                            themeBox.classList.add("gradient");
                        }
}
