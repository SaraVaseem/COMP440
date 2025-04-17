import "../searchbar.css";
//import RentalUnit from "./RentalUnit";
//import rental unit info, users

export function SearchBar() {
    return(
        <>
        <div className="input-container">
        <label>Search for Rentals or Users</label>
        <input type="text"/>
        </div>

        <div>
            {/* <RentalUnit/> */}
        </div>
        </>
    )
}