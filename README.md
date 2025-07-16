# Movie List Time
## An app to look for movies using OMDb API

This is an extended version of a SOLO Project of Scrimba Front-End Developer Career Path.
It uses the Open Movie Database API https://www.omdbapi.com/

Since it is just for demonstration purposes I left my API key in the code. I am aware that it should best be at the back end for a big project.

The app also handles the possible error in the promises.

One challenge I had was broken images I had in the forEach loop second fetch block (index.js), which retrieves info
(images, title etc) of each individual movie.

So some movie posters which receive a 200 response and has a URL assigned did not have valid img files. I tried to solve
this in the fetch block but because of CORS policy couldnt get the result I wanted. Eventually, I made a simple solution
in renderMovies.js handling with the onerror attribure of the img tag. I am aware that in a bigger project this is
better dealt with in the async function block.
