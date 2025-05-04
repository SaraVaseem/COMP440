import { useState, useEffect } from 'react';
import axios from 'axios';
import RentalUnit from "../components/RentalUnit";
import AddRental from "../components/AddRental";
// import { SubSearchBar } from "../components/SearchBar";
import '../App.css';
import ReviewRental from '../components/Reviews.tsx';
// import { FilterBy } from '../components/FilterBy.tsx';
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
      const [filter, setFilter] = useState("SelectFilter");
      const [ERentals, setERentals] = useState(false);
      const [HRentals, setHRentals] = useState(false);
      const [MRentals, setMRentals] = useState(false);
      const [BReviewer, setBReviewer] = useState(false);
      const [error, setError] = useState("");
      const [RentalsNoBReviews, setRentalsNoBReviews] = useState(false);
  const [result, setResult] = useState<Unit[]>([]);
  const [review, setReview] = useState<Review[]>([]);
  const [user, setUser] = useState<User[]>([]);
  const [returnUsersFromSearch, setUserFromSearch] = useState(false);
  // const [category, setCategory] = useState<RentalFilters['category']>();
  const [secondsearchTerm, setSecondSearchTerm] = useState<string>("");
  const [thirdsearchTerm, setThirdSearchTerm] = useState<string>("");
  // const [filter, setFilter] = useState<boolean>(false);

// const secondSearchTerm = localStorage.getItem("secondSearchTerm") ?? "null";

  const [firstsearchTerm, setFirstSearchTerm] = useState<string>("");
  
  const [byuser, setSubmitUser] = useState(false);

  //need a post

  const getTwoFeatureRentals = () => {
    axios
      .post("http://localhost:3000/PostTwoFeatureRentals", {
        feature1: secondsearchTerm,
        feature2: thirdsearchTerm,
      })
    .then((res) => {
      console.log("Users with rentals having both features:", res.data);
      setUser(res.data)
    })
    .catch((err) => console.error("Fetch error:", err));      
  };

  const filteredUnits = result.filter(unit => {
    const feature = unit.feature.toLowerCase();
    const username = unit.username.toLowerCase();

    const matchesFirst =
      (feature.includes(firstsearchTerm) || username.includes(firstsearchTerm));
    
    //eventually make it like below
    //if (!firstsearchTerm && !filter && !secondSearchTerm && !thirdSearchTerm) return true;
    if (firstsearchTerm) return matchesFirst;

    //if(secondsearchTerm )

    if(byuser) return false; //returning nothing  --> need to erase to filter

    return unit
  });

  const filteredUsers = user.filter(user => {
 
    if(!byuser) return false; // --> need to erase to filter

    if(returnUsersFromSearch) {
      return User;
    }

    return user;
  });

  useEffect(() => {
    filter === "ExpensiveRentals" ? setERentals(true) : setERentals(false);
    filter === "HighRatedRentals" ? setHRentals(true) : setHRentals(false);
    filter === "MostRentalsPostedUsers" ? setMRentals(true) : setMRentals(false);
    filter === "BadReviewer" ? setBReviewer(true) : setBReviewer(false);
    filter === "RentalsWithNoBadReviews" ? setRentalsNoBReviews(true) : setRentalsNoBReviews(false);
  }, [filter]);

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
  const byPrice = () => {
    axios.get("http://localhost:3000/mostExpensive")
    .then((res) => {
      console.log("Most Expensive Units:", res.data);
      setResult(res.data)
      setSubmitUser(false)
    })
    .catch((err) => console.error("Fetch error:", err));      
  };

    const byHighRating = () => {
      axios.get("http://localhost:3000/FetchExcellentReviews")
      .then((res) => {
        console.log("Highly Rated Units:", res.data);
        setResult(res.data)
        setSubmitUser(false)
      })
      .catch((err) => { console.error("Fetch error:", err)
      setError("User has no excellent/good rentals") }
    );      
    };

  const byBadReviewer = () => {
    axios.get("http://localhost:3000/badReviews")
    .then((res) => {
      console.log("User with only poor reviews:", res.data);
      setUser(res.data)
      setSubmitUser(true)
    })
    .catch((err) => console.error("Fetch error:", err));      
  };

  const byMostRentalsPosted = () => {
    axios.get("http://localhost:3000/mostRentals")
        .then((res) => {
          console.log("Users that posted most rentals in a day:", res.data);
          setUser(res.data)
          setSubmitUser(true)
        })
        .catch((err) => console.error("Fetch error:", err));      
      };

        const byNoBadReviewRental = () => {
          axios.get("http://localhost:3000/noBadReviews")
          .then((res) => {
            console.log("Units with no bad reviews:", res.data);
            setUser(res.data)
            setSubmitUser(true)
          })
          .catch((err) => console.error("Fetch error:", err));      
        };
        

  const handleOnChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
      setFilter(e.target.value);
      const selected = e.target.value
      if(selected =='ExpensiveRentals') {
        byPrice();
      } else if (selected=='HighRatedRentals') {
        byHighRating();
      } else if (selected == 'MostRentalsPostedUsers') {
        byMostRentalsPosted();
      } else if (selected == 'BadReviewer') {
        byBadReviewer();
      } else if (selected == 'RentalsWithNoBadReviews') {
        byNoBadReviewRental();
      }   
  }

  return (
    <>
<div className="home-text text-4xl font-bold text-center">
          <b>Rental Listings</b>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        Click the blue button to add a rental!
        <br/>
        <input
  type="text"
  placeholder="Search by feature or user"
  value={firstsearchTerm}
  onChange={(e) => {setFirstSearchTerm(e.target.value?.toLowerCase())
    setSubmitUser(false)}
  }
/>
{/* <FilterBy/> */}

<div>
        <select
          id="basic-menu"
          className="form-select"
          onChange={handleOnChange}
          value = {filter}
        >
          <option value='SelectFilter'>Filter</option>          
          <option value='ExpensiveRentals'>Most Expensive Rentals For Each Feature</option>
          <option value='HighRatedRentals'>All Excellent/Good Comments</option>
          <option value='MostRentalsPostedUsers'>Users Who Posted the Most Number of Rentals On 4/15/2025</option>
          <option value='BadReviewer'>Bad Reviewer</option>
          <option value='RentalsWithNoBadReviews'>Owners With No Bad Reviews</option>
        </select>
</div>

{/* <div className="button">
<button type="submit" onClick={handleSubmit}>Add Filter</button>
</div> */}
{/* <SubSearchBar/> */}
              <p>Search by Users With Different Features</p>
                <input
                  type="search"
                  placeholder="Rental One" 
                  value={secondsearchTerm}
                  onChange={(e) => {setSecondSearchTerm(e.target.value.toLowerCase()) 
                    setSubmitUser(true)}}
          />
                <input
                  type="search"
                  placeholder="Rental Two" 
                  value={thirdsearchTerm}
                  onChange={(e) => {setThirdSearchTerm(e.target.value.toLowerCase())
                    setSubmitUser(true)}
                  }
          />            
<button type="submit" onClick={getTwoFeatureRentals}>Search</button>
      <AddRental />

      {filteredUsers.map((user) => {
return (
  <>
  <br/>
  <div key={user.username}>
<User
username = {user.username}
/>
</div>
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