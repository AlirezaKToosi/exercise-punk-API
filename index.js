async function fetchAndRenderBeers() {
  try {
    const randomBeerCard = document.getElementById("beerCard");
    const randomBeerName = document.getElementById("beerName");
    const randomBeerPhoto = document.getElementById("beerPhoto");
    const randomBeerInfo = document.getElementById("beerInfo")
    const randomBeerButton = document.getElementById("moreInfoButton");
    const response = await fetch("https://api.punkapi.com/v2/beers/random");
    const beers = await response.json();
    beers.forEach((beer) => {
      console.log(beer);
      randomBeerName.innerHTML = `<h2>${beer.name}</h2>`;
      randomBeerPhoto.innerHTML = `<img src="${beer.image_url}" alt="${beer.name}" style="max-width: 10%; max-height: 10%;">`;
      randomBeerInfo.innerHTML = `<p>${beer.description}</p>`;
      randomBeerButton.innerHTML = `<button onclick="showBeerDetails(${beer.id})">See more</button>`;
    });
  } catch (error) {
    console.error("Error fetching pokemons:", error);
  }
}
fetchAndRenderBeers();
