import { useState, useEffect } from 'react';
import axios from 'axios';
import RentalUnit from "../components/RentalUnit";
import AddRental from "../components/AddRental";
// import { SubSearchBar } from "../components/SearchBar";
import '../App.css';
import ReviewRental from '../components/Reviews.tsx';
import { FilterBy } from '../components/FilterBy.tsx';
import User from '../components/User.tsx';
// import { RentalFilters } from '../components/FilterBy.tsx';
import { Button } from '@mui/material';

interface Unit {
  id: number;
  title: string;
  description: string;
  feature: string;
  price: number;
  username: string;
  date: string;
}

interface User {
  username: string;
}

interface Review {
  username: string;
  description: string;
  rating: string;
  title: string;
}

export default function Home() {
  const [result, setResult] = useState<Unit[]>([]);
  const [review, setReview] = useState<Review[]>([]);
  const [user, setUser] = useState<User[]>([]);
  // const [category, setCategory] = useState<RentalFilters['category']>();
  const [secondsearchTerm, setSecondSearchTerm] = useState<string>("");
  const [thirdsearchTerm, setThirdSearchTerm] = useState<string>("");
  // const [filter, setFilter] = useState<boolean>(false);

// const secondSearchTerm = localStorage.getItem("secondSearchTerm") ?? "null";

  const [firstsearchTerm, setFirstSearchTerm] = useState<string>("");
  
  const [submit, setSubmit] = useState(false);

  const handleSubmit = () => {
    setSubmit(true);
  };
  const getTwoFeatureRentals = () => {
    axios.get("http://localhost:3000/TwoFeatueRentals")
    .then((res) => {
      console.log("Users with rentals having both features:", res.data);
      setUser(res.data)
    })
    .catch((err) => console.error("Fetch error:", err));      
  };

  const filteredUnits = result.filter(unit => {
    const feature = unit.feature.toLowerCase();

    const matchesFirst = firstsearchTerm && 
      (feature.includes(firstsearchTerm));
    
    //eventually make it like below
    //if (!firstsearchTerm && !filter && !secondSearchTerm && !thirdSearchTerm) return true;
    if (!firstsearchTerm && !secondsearchTerm && !thirdsearchTerm) return true;

   if(submit) return matchesFirst; //returning nothing  --> need to erase to filter

    return matchesFirst
  });

  const filteredUsers = user.filter(user => {
         
    const matchesFirst = firstsearchTerm && 
    (user.username.includes(firstsearchTerm));

          //   // If both search modes are empty, show all
          //   if (!secondsearchTerm && !thirdsearchTerm) return true;
          if (!firstsearchTerm && !secondsearchTerm && !thirdsearchTerm) return true;

         if(submit) return matchesFirst; // --> need to erase to filter

    return matchesFirst;
  });

  useEffect(() => {
    axios.get("http://localhost:3000/listings")
      .then((res) => {
        console.log("Fetched listings:", res.data);
        setResult(res.data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []); // ✅ only run once

  useEffect(() => {
    axios.get("http://localhost:3000/reviews")
      .then((res) => {
        console.log("Fetched reviews:", res.data);
        setReview(res.data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/getUsers")
      .then((res) => {
        console.log("Fetched users:", res.data);
        setUser(res.data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <>
<div className="home-text text-4xl font-bold text-center">
          <b>Rental Listings</b>
        </div>
        Click the blue button to add a rental!
        <br/>
        <input
  type="text"
  placeholder="Search by feature"
  value={firstsearchTerm}
  onChange={(e) => {setFirstSearchTerm(e.target.value.toLowerCase())
    setSubmit(false)}
  }
/>
<FilterBy
// onChange={(filters) => {
//   setCategory(filters.category);
// }}
/>
<div className="button">
<button type="submit" onClick={handleSubmit}>Add Filter</button>
</div>
{/* <SubSearchBar/> */}
              <p>Search by Users With Different Features</p>
                <input
                  type="search"
                  placeholder="Rental One" 
                  value={secondsearchTerm}
                  onChange={(e) => {setSecondSearchTerm(e.target.value.toLowerCase()) 
                    setSubmit(false)}}
          />
                <input
                  type="search"
                  placeholder="Rental Two" 
                  value={thirdsearchTerm}
                  onChange={(e) => {setThirdSearchTerm(e.target.value.toLowerCase())
                    setSubmit(false)}
                  }
          />            
<button type="submit" onClick={getTwoFeatureRentals}>Search</button>
      <AddRental />

      {filteredUsers.map((user) => {
return (
  <>
  <br/>
  
<User
username = {user.username}
/>
</>
)
})}
      
      <div className="rentalunit">
       
       {filteredUnits.map((unit) => {
  const matchingReviews = review.filter(r => r.title === unit.title);

  return (
    <>
    <br/>
    <div key={unit.id}>
      <RentalUnit
        id={unit.id}
        title={unit.title}
        description={unit.description}
        feature={unit.feature}
        price={unit.price}
        username = {unit.username}
        date = {unit.date}
      />
      {matchingReviews.length > 0 && (
        <>
          {matchingReviews.map((rev, i) => (
            <ReviewRental
              key={i}
              username={rev.username}
              description={rev.description}
              rating={rev.rating}
              title={rev.title}
            />
          ))}
        </>
      )}
    </div>
    </>
  );
})}

      </div>
    </>
  );
}