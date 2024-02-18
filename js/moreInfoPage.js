import { showView } from "../js/randomPage.js";

async function showBeerDetails(beerId) {
  showView(2);
  const beerDetailsContainer = document.getElementById("beerDetails");
  beerDetailsContainer.innerHTML = ``;
  try {
    const response = await fetch(`https://api.punkapi.com/v2/beers/${beerId}`);
    const beer = await response.json();

    const beerInfo = document.createElement("div");
    beerInfo.classList.add("beer-info");
    beerInfo.innerHTML = `
          <h2>${beer[0].name}</h2>
          <p>Tagline:<br> ${beer[0].tagline}</p>
          <p>First Brewed:<br> ${beer[0].first_brewed}</p>
          <p>Description:<br> ${beer[0].description}</p>
          <figure>
          <img src="${beer[0].image_url}" alt="${beer[0].name}">
          <p>ABV: ${beer[0].abv}<br>IBU: ${beer[0].ibu}<br>EBC: ${beer[0].ebc}</p>
          </figure>
      `;
    beerDetailsContainer.appendChild(beerInfo);

    const ingredients = document.createElement("div");
    ingredients.classList.add("ingredients");
    ingredients.innerHTML = `
          <h2>Ingredients</h2>
          <p>Yeast:<br> ${beer[0].ingredients.yeast}</p>
          <br>
          <h3>Malt</h3>
          <ul>
              ${beer[0].ingredients.malt
                .map(
                  (malt) =>
                    `<li>${malt.name} - ${malt.amount.value} ${malt.amount.unit}</li>`
                )
                .join("")}
          </ul>
      `;
    beerDetailsContainer.appendChild(ingredients);

    const foodPairing = document.createElement("div");
    foodPairing.classList.add("food-pairing");
    foodPairing.innerHTML = `
          <h2>Food Pairing</h2>
          <ul>
              ${beer[0].food_pairing
                .map((pairing) => `<li>${pairing}</li>`)
                .join("")}
          </ul>
      `;
    beerDetailsContainer.appendChild(foodPairing);

    const brewersTips = document.createElement("div");
    brewersTips.classList.add("brewers-tips");
    brewersTips.innerHTML = `
          <h2>Brewer's Tips</h2>
          <p>${beer[0].brewers_tips}</p>
      `;
    beerDetailsContainer.appendChild(brewersTips);
  } catch (error) {
    console.error("Error fetching beer details:", error);
    beerDetailsContainer.innerHTML =
      "<p>Error fetching beer details. Please try again later.</p>";
  }
}

export { showBeerDetails };
