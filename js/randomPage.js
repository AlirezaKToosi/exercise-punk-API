import { showBeerDetails } from "../js/moreInfoPage.js";
async function fetchAndRenderRandomBeers() {
  try {
    const randomBeerCard = document.getElementById("beerCard");
    const randomBeerName = document.getElementById("beerName");
    const randomBeerPhoto = document.getElementById("beerPhoto");
    const randomBeerInfo = document.getElementById("beerInfo");
    const randomBeerLink = document.getElementById("moreInfoLink");
    const response = await fetch("https://api.punkapi.com/v2/beers/random");
    const beers = await response.json();
    beers.forEach((beer) => {
      console.log(beer);
      randomBeerName.innerHTML = `<h2>${beer.name}</h2>`;
      randomBeerPhoto.innerHTML = `<img src="${beer.image_url}" alt="${beer.name}">`;
      randomBeerInfo.innerHTML = `<p>${beer.description}</p>`;
      randomBeerLink.innerHTML = `<a href="#" id="moreInfoLink">See more info ... </a>`;
      randomBeerLink.addEventListener("click", () => showBeerDetails(beer.id));
    });
  } catch (error) {
    console.error("Error fetching pokemons:", error);
  }
}
document.getElementById("randomPageView").style.display = "block";
fetchAndRenderRandomBeers();


