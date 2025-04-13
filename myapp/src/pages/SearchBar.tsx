import '../searchbar.css';

export default function SearchBar() {
    return (
<html>
<head>
  <title>CSS Test</title>
</head>
    <div className="feature-form">
        <h1>Select desired Features</h1>
        <form method="POST" action="/search">
            <label><input type="checkbox" name = "features" value="WiFi"/> WiFi</label><br/>
            <label><input type="checkbox" name = "features" value="Balcony"/> Balcony</label><br/>
            <label><input type="checkbox" name = "features" value="In-unit laundry"/> In-unit laundry</label><br/>
            <label><input type="checkbox" name = "features" value="Hardwood Floor"/> Hardwood Floor</label><br/>
            <label><input type="checkbox" name = "features" value="Pet Friendly"/> Pet Friendly</label><br/>
            <label><input type="checkbox" name = "features" value="Parking"/> Parking</label><br/>
            <label><input type="checkbox" name = "features" value="Pool"/> Pool</label><br/>
            <button type="submit">Search</button>
        </form>
    </div>
</html>
    )
}