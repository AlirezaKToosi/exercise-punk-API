function showView(viewId) {
    switch (viewId) {
      case 1:
        document.getElementById("randomPageView").style.display = "block";
        document.getElementById("beerDetails").style.display = "none";
        document.getElementById("searchPageView").style.display = "none";
        break;
      case 2:
        document.getElementById("randomPageView").style.display = "none";
        document.getElementById("beerDetails").style.display = "grid";
        document.getElementById("searchPageView").style.display = "none";
        break;
      default:
        document.getElementById("randomPageView").style.display = "none";
        document.getElementById("beerDetails").style.display = "none";
        document.getElementById("searchPageView").style.display = "flex";
    }
  }