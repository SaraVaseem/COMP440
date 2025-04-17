import '../App.css'
//import { Grid } from "@mui/material"
// import { AddRental } from "../components/AddRental.jsx"
import { SearchBar } from "../components/SearchBar.jsx"
// import { FilterBy } from "../components/FilterBy.jsx"
import RentalUnit from "../components/RentalUnit.js" 
import "../rentalunit.css"

export const dummyData = [
  {
      id: 100,
      title: "Bat Cave",
      description: "Nice place!",
      feature: "sunny",
      price: 100
  },
  {
    id: 200,
      title: "New place",
      description: "Fun place!",
      feature: "dry",
      price: 100000
  },
  {
    id: 300,
      title: "Sunnyvale",
      description: "Bas place!",
      feature: "hot",
      price: 200
  },
  {
    id: 400,
      title: "Palm Springs",
      description: "Amazing place!",
      feature: "beautiful",
      price: 2
  },
  {
    id: 500,
      title: "Japan",
      description: "Architecture!",
      feature: "lovely",
      price: 333
  },
  {
    id: 600,
      title: "Dubai",
      description: "Expensive place!",
      feature: "fancy",
      price: 999
  }
  ]

export default function Home() {
  return (
    <>
    <div className="home-text">
      <h1>Rentals</h1>
      </div>
      <div className="search-box">
      <SearchBar/>
      </div>
       <div className="rentalunit"> 
        {
        dummyData.map((unit) => 
        <RentalUnit key={unit.id} id={unit.id} title={unit.title} description={unit.description} feature={unit.feature} price={unit.price}/>
        )}

      </div>
    </>
  );
}