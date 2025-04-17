import '../reviews.css';

export default function Reviews() {

    // console.log("📦 review.js is running");
    
    // const searchInput = document.getElementById("listing-search"); 
    // const suggestionsBox = document.getElementById("suggestions");
    
    // searchInput.addEventListener("input", async () => {
    //   const query = searchInput.value;
    
    //   // If user clears the input, hide suggestions
    //   if (query.length === 0) {
    //     suggestionsBox.style.display = "none";
    //     return;
    //   }
    
    //   // Send request to backend
    //   const response = await fetch(`/search-listings?query=${encodeURIComponent(query)}`);
    //   const listings = await response.json();
    
    //   // Clear any previous results
    //   suggestionsBox.innerHTML = "";
    
    //   // Show new suggestions
    //   listings.forEach(listing => {
    //     const div = document.createElement("div");
    //     div.textContent = listing.title;
    //     div.addEventListener("click", () => {
    //       searchInput.value = listing.title;
    //       suggestionsBox.innerHTML = "";
    //       suggestionsBox.style.display = "none";
    //     });
    //     suggestionsBox.appendChild(div);
    //   });
    
    //   suggestionsBox.style.display = "block";
    // });

    return (
        <html>
<head>
  <title>Leave a Review</title>
</head>
<body>
  <h1>Leave a Review</h1>

  <form id="review-form" method="POST" action="/home">
    
    {/* <!-- Search bar --> */}
    <label>Listing Title:</label>
    <div className="input">
        <input
            type="text" id="listing-search" name="listing"
                    />
    </div>
    {/* <!-- Dropdown suggestions will appear here --> */}
    <div id="suggestions"></div>

    {/* <!-- Rating dropdown --> */}
    <label>Rating:</label>
    <select id="rating" name="rating">
      <option value="Excellent">Excellent</option>
      <option value="Good">Good</option>
      <option value="Fair">Fair</option>
      <option value="Poor">Poor</option>
    </select>

    {/* <!-- Description --> */}
    <label>Description:</label>
    <textarea id="description" name="description"></textarea>

    <button type="submit">Submit Review</button>
  </form>


  {/* <!-- This links html file to js file--> */}
  <script src="review.js"></script>
</body>
</html>
    )
}