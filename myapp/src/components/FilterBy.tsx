import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import '../App.css'
import {useState} from 'react'
import axios from 'axios';
import User from './User';

export type RentalFilters = {
  category?: 'Expensive Rentals' | 'High Rated Rentals' | 'Most Rentals Posted Users' | 'Bad Reviewer' | 'Rentals With No Bad Reviews';
};

type FiltersProps = {
  onChange: (filters: RentalFilters) => void;
};

export function FilterBy({
  onChange, }: FiltersProps) {
    

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const byBadReviewer = () => {
      axios.get("http://localhost:3000/badReviews")
      .then((res) => {
        console.log("User with only poor reviews:", res.data);
        setAnchorEl(null);
      })
      .catch((err) => console.error("Fetch error:", err));      
    };

    const byMostRentalsPosted = () => {
      axios.get("http://localhost:3000/mostRentals")
          .then((res) => {
            console.log("Users that posted most rentals in a day:", res.data);
            setAnchorEl(null);
          })
          .catch((err) => console.error("Fetch error:", err));      
        };

        const byPrice = () => {
          axios.get("http://localhost:3000/mostExpensive")
          .then((res) => {
            console.log("Most Expensive Units:", res.data);
            setAnchorEl(null);
          })
          .catch((err) => console.error("Fetch error:", err));      
        };
    
          const byHighRating = () => {
            axios.get("http://localhost:3000/FetchExcellentReviews")
            .then((res) => {
              console.log("Highly Rated Units:", res.data);
              setAnchorEl(null);
            })
            .catch((err) => console.error("Fetch error:", err));      
          };

          const byNoBadReviewRental = () => {
            axios.get("http://localhost:3000/noBadReviews")
            .then((res) => {
              console.log("Units with no bad reviews:", res.data);
              setAnchorEl(null);
            })
            .catch((err) => console.error("Fetch error:", err));      
          };
          

    const handleClose = () => {
        setAnchorEl(null);
    }

//if 1,3 displayUsers else if 4,5,6 displayRentals

    return (
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Filter
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={byPrice}>Expensive Rentals</MenuItem>
          <MenuItem onClick={byHighRating}>High Rated Rentals</MenuItem>
          <MenuItem onClick={byMostRentalsPosted}>Most Rentals Posted Users</MenuItem>
          <MenuItem onClick={byBadReviewer}>Bad Reviewer</MenuItem>
          <MenuItem onClick={byNoBadReviewRental}>Rentals With No Bad Reviews</MenuItem>
        </Menu>
      </div>
    );
}