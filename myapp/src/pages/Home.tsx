import { useState, useEffect } from 'react';
import axios from 'axios';
import RentalUnit from "../components/RentalUnit";
import AddRental from "../components/AddRental";
// import { SearchBar } from "../components/SearchBar";
import '../App.css';
import ReviewRental from '../components/Reviews.tsx';

interface Unit {
  id: number;
  title: string;
  description: string;
  feature: string;
  price: number;
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
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredUnits = result.filter(unit =>
    unit.title.toLowerCase().includes(searchTerm) ||
    unit.feature.toLowerCase().includes(searchTerm)
  );

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

  return (
    <>

<input
  type="text"
  placeholder="Search by title or feature"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
/>
      <AddRental />
      <div className="rentalunit">
       {filteredUnits.map((unit) => {
  const matchingReviews = review.filter(r => r.title === unit.title);

  return (
    <div key={unit.id}>
      <RentalUnit
        id={unit.id}
        title={unit.title}
        description={unit.description}
        feature={unit.feature}
        price={unit.price}
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
  );
})}

      </div>
    </>
  );
}