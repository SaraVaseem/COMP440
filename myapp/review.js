console.log("📦 review.js is running");

const searchInput = document.getElementById("listing-search"); 
const suggestionsBox = document.getElementById("suggestions");

searchInput.addEventListener("input", async () => {
  const query = searchInput.value;

  // If user clears the input, hide suggestions
  if (query.length === 0) {
    suggestionsBox.style.display = "none";
    return;
  }

  // Send request to backend
  const response = await fetch(`/search-listings?query=${encodeURIComponent(query)}`);
  const listings = await response.json();

  // Clear any previous results
  suggestionsBox.innerHTML = "";

  // Show new suggestions
  listings.forEach(listing => {
    const div = document.createElement("div");
    div.textContent = listing.title;
    div.addEventListener("click", () => {
      searchInput.value = listing.title;
      suggestionsBox.innerHTML = "";
      suggestionsBox.style.display = "none";
    });
    suggestionsBox.appendChild(div);
  });

  suggestionsBox.style.display = "block";
});