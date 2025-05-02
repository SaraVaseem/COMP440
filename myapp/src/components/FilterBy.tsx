// import Button from '@mui/material/Button';
import '../App.css'
import {useState} from 'react'
import axios from 'axios';
import User from './User';
import { useEffect } from 'react';
import ReviewRental from '../components/Reviews.tsx';
import RentalUnit from './RentalUnit';

// export type RentalFilters = {
//   category?: 'Expensive Rentals' | 'High Rated Rentals' | 'Most Rentals Posted Users' | 'Bad Reviewer' | 'Rentals With No Bad Reviews';
// };

// type FiltersProps = {
//   onChange: (filters: RentalFilters) => void;
// };

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

export function FilterBy() {
    

    const [filter, setFilter] = useState("SelectFilter");
    const [ERentals, setERentals] = useState(false);
    const [HRentals, setHRentals] = useState(false);
    const [MRentals, setMRentals] = useState(false);
    const [BReviewer, setBReviewer] = useState(false);
    const [RentalsNoBReviews, setRentalsNoBReviews] = useState(false);
    const [result, setResult] = useState<Unit[]>([]);
    const [review, setReview] = useState<Review[]>([]);
    const [user, setUser] = useState<User[]>([]);
    
    // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    //   setAnchorEl(event.currentTarget);
    // };

    useEffect(() => {
      filter === "ExpensiveRentals" ? setERentals(true) : setERentals(false);
      filter === "HighRatedRentals" ? setHRentals(true) : setHRentals(false);
      filter === "MostRentalsPostedUsers" ? setMRentals(true) : setMRentals(false);
      filter === "BadReviewer" ? setBReviewer(true) : setBReviewer(false);
      filter === "RentalsWithNoBadReviews" ? setRentalsNoBReviews(true) : setRentalsNoBReviews(false);
    }, [filter]);

    useEffect(() => {
      axios.get("http://localhost:3000/reviews")
        .then((res) => {
          console.log("Fetched reviews:", res.data);
          setReview(res.data);
        })
        .catch((err) => console.error("Fetch error:", err));
    }, []);
  
    const byPrice = () => {
      axios.get("http://localhost:3000/mostExpensive")
      .then((res) => {
        console.log("Most Expensive Units:", res.data);
        setResult(res.data)
      })
      .catch((err) => console.error("Fetch error:", err));      
    };

      const byHighRating = () => {
        axios.get("http://localhost:3000/FetchExcellentReviews")
        .then((res) => {
          console.log("Highly Rated Units:", res.data);
          setResult(res.data)
        })
        .catch((err) => console.error("Fetch error:", err));      
      };

    const byBadReviewer = () => {
      axios.get("http://localhost:3000/badReviews")
      .then((res) => {
        console.log("User with only poor reviews:", res.data);
        setUser(res.data)
      })
      .catch((err) => console.error("Fetch error:", err));      
    };

    const byMostRentalsPosted = () => {
      axios.get("http://localhost:3000/mostRentals")
          .then((res) => {
            console.log("Users that posted most rentals in a day:", res.data);
            setUser(res.data)
          })
          .catch((err) => console.error("Fetch error:", err));      
        };

          const byNoBadReviewRental = () => {
            axios.get("http://localhost:3000/noBadReviews")
            .then((res) => {
              console.log("Units with no bad reviews:", res.data);
              setUser(res.data)
            })
            .catch((err) => console.error("Fetch error:", err));      
          };
          

    const handleOnChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value);
    }

    const filteredUsers = user.filter(user => {

      return user;
      });

      const filteredUnits = result.filter(unit => {
        return unit;
      });
    
//if 1,3 displayUsers else if 4,5,6 displayRentals

    return (
      <div>
        {/* <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Filter
        </Button> */}
        <select
          id="basic-menu"
          className="form-select"
          onChange={handleOnChange}
          value = {filter}
        >
          <option onClick={byPrice} value='SelectFilter'>Filter</option>          
          <option onClick={byPrice} value='ExpensiveRentals'>Expensive Rentals</option>
          <option onClick={byHighRating} value='HighRatedRentals'>High Rated Rentals</option>
          <option onClick={byMostRentalsPosted} value='MostRentalsPostedUsers'>Most Rentals Posted Users</option>
          <option onClick={byBadReviewer} value='BadReviewer'>Bad Reviewer</option>
          <option onClick={byNoBadReviewRental} value='RentalsWithNoBadReviews'>Rentals With No Bad Reviews</option>
        </select>
        {ERentals && filteredUnits.map((unit) => {
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
        {HRentals && filteredUnits.map((unit) => {
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
        {MRentals && filteredUsers.map((user) => {
        return (
          <>
          <br/>
          
        <User
        username = {user.username}
        />
        </>
        )
        })}
        {BReviewer && filteredUsers.map((user) => {
        return (
          <>
          <br/>
          
        <User
        username = {user.username}
        />
        </>
        )
        })}
        {RentalsNoBReviews && filteredUsers.map((user) => {
        return (
          <>
          <br/>
          
        <User
        username = {user.username}
        />
        </>
        )
        })}
      </div>
    );
}