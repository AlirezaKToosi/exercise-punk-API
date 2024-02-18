import { showBeerDetails } from "../js/moreInfoPage.js";

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const searchResults = document.getElementById("BeerList");
const pageInfo = document.getElementById("pageInfo");
const backgroundColors = ["#8e8e8e", "#e1dede", "#444444"];
const colors = ["#000000", "#444444", "#8e8e8e"];
let beers;
let currentPage = 1;
const beersPerPage = 6;

searchButton.addEventListener("click", async () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== "") {
    searchResults.innerHTML = "";
    try {
      beers = await fetchBeerData(searchTerm);
      displaySearchResults(beers);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
});

async function fetchBeerData(beerName) {
  try {
    const response = await fetch(
      `https://api.punkapi.com/v2/beers?beer_name=${beerName}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch beer data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching beer data: ${error.message}`);
  }
}

function displaySearchResults(beerList) {
  if (beerList.length === 0) {
    searchResults.innerHTML = "<p>No beers found</p>";
    return;
  }
  displayBeers(1);
}

function displayBeers(page) {
  const searchResults = document.getElementById("BeerList");
  searchResults.innerHTML = "";

  const startIndex = (page - 1) * beersPerPage;
  const endIndex = Math.min(startIndex + beersPerPage, beers.length);

  for (let i = startIndex; i < endIndex; i++) {
    const beer = beers[i];
    const listItem = document.createElement("li");
    listItem.style.height = "50px";
    const beerLink = document.createElement("a");
    listItem.style.fontSize = "20px";
    listItem.style.color = colors[i % 3];
    listItem.style.backgroundColor = backgroundColors[i % 3];
    listItem.textContent = beer.name;
    beerLink.href = "#";
    listItem.style.cursor = "pointer";
    listItem.addEventListener("click", () => showBeerDetails(beer.id));

    listItem.appendChild(beerLink);
    searchResults.appendChild(listItem);
  }

  pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(
    beers.length / beersPerPage
  )}`;
}

document.getElementById("previousPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayBeers(currentPage);
  }
});

document.getElementById("nextPage").addEventListener("click", () => {
  const totalPage = Math.ceil(beers.length / beersPerPage);
  if (currentPage < totalPage) {
    currentPage++;
    displayBeers(currentPage);
  }
});
