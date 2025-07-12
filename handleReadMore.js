export function handleReadMore(e) {
    const eIndex = e.target.id.split("-").pop();
    //console.log(eIndex);
    const eContainer = document.getElementById(`movie-container-${eIndex}`);
    const themeBox = document.getElementById(`theme-box-${eIndex}`);

    eContainer.classList.toggle("toggle-movie-container");

    if (e.target.textContent === "Read More") {
        e.target.textContent = "Read Less";
        themeBox.classList.remove("gradient");
    } else if (e.target.textContent === "Read Less") {
        e.target.textContent = "Read More";
        themeBox.classList.add("gradient");
    }
}