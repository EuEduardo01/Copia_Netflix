let carousel = document.querySelector(".carousel");
let movieContainer = document.querySelector(".movies");
let recomendation = document.querySelector(".recommendation")
const API_KEY = 'api_key=b4b5f9d98442f11bbdd50a5adf70f1d1';
const BASE_URL = 'https://api.themoviedb.org/3/';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const language = 'language=pt-BR';

let movies = [];
console.log(movies)
//percorrer pelos filmes e aparacer
async function getMovies(){
    for(let i = 1; i < 4 ; i++){
        try{
             let response = await fetch(`${BASE_URL}movie/popular?${API_KEY}&${language}&page=${i}`)
             let data = await response.json();

             movies.push(...data.results);
             console.log(data.results);
            }catch(e){
        console.log(e.mensagem)
            }
            incrementMovies()
    }
}
function incrementMovies(){
carousel.innerHTML = ""
movies.forEach(movie => {
    carousel.innerHTML += `<img onclick="getMovie(${movie.id})" src=${IMG_URL + movie.poster_path} 
    alt="${movie.title} poster">`  
});
}
//filmes populares
async function getPopular(){

        let response = await fetch(`${BASE_URL}movie/upcoming?${API_KEY}&${language}-BR&page=1`)
        let data = await response.json()
        let dataResult = data.results

    let randomElement = dataResult[Math.floor(Math.random() * dataResult.length)]
        recomendation.innerHTML += `
        <div class="recomendationBox"
            <h1 class= "title">${randomElement.title}</h1>
            <p> ${randomElement.overview}</p>
        </div>
        <img src=${IMG_URL + randomElement.poster_path} 
        alt="${randomElement.title} poster">`  
        console.log(randomElement)

}

//tela de sinopse
async function getMovie(id){
    let movie = movies.find((item) => id == item.id)
    console.log()
    let responseMovie = await fetch(`${BASE_URL}movie/${id}?${API_KEY}&${language}`)
    movie = await responseMovie.json()
    console.log(movie)

    movieContainer.innerHTML = `
    <div class= "posterContainer">
        <button class="fechar"> x </button>
        <div class= "posterCamadaTwo">
        <img class="posterImg" src= ${IMG_URL + movie.poster_path}> 
        <p>${movie.overview}</p>
        </div>
    </div>`
//fecha o poster container
    let closePoster = document.querySelector(".fechar")
     closePoster.addEventListener("click", function(){
        let posterContainer = document.querySelector(".posterContainer")
         posterContainer.classList.toggle("hide")
     });
}
getMovies()
getPopular()

function goLeft() {
    carousel.scrollLeft -= carousel.offsetWidth
}

function goRight() {
    carousel.scrollLeft += carousel.offsetWidth
}