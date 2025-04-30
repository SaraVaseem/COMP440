// import "../searchbar.css";
//import RentalUnit from "./RentalUnit";
//import rental unit info, users

export function SubSearchBar() {
    return(
      <>
          <p>Or Search by Adjacent Rentals!</p>
          <br/>
          <input
            type="search"
            placeholder="Rental One" />
          <input
            type="search"
            placeholder="Rental Two" />            
          <button>
            Search
          </button>
        </>
    )
}