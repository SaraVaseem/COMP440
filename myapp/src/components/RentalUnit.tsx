//import { useState } from "react";
import { Button } from '@mui/material'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {useState} from 'react';
import '../App.css'
import axios from 'axios';

export interface SimpleDialogProps {
  open: boolean;
  success: boolean;
  onClose: (value: boolean) => void;
}

export interface Unit {
  id: number;
  title: string;
  description: string;
  feature: string;
  price: number;
  username: string;
  date: string;
}

export default function RentalUnit(props:Unit) {

  const [description, setDescription] = useState();
  const [rating, setRating] = useState();
  const [error, setError] = useState("");

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    e.preventDefault();
    const username = localStorage.getItem("username") ?? "guest_user";
    localStorage.setItem("title", props.title);
    const title = localStorage.getItem("title") ?? "none";
      console.log(username,title)

      axios.post("http://localhost:3000/add-review", {
        description: description,
        rating: rating,
        username: username,
        title: title,
      })
      .then((result) => {
        console.log("Response from server:", result.data);
        console.log(result.data);
        setOpen(false);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          console.error("Add Review Error:", err.response.data);
          if (err.response.data.error === "You cannot review your own rental unit") {
            setError("You cannot review your own rental unit");
          } else if (err.response.data.error === "You have already reviewed this listing") {
            setError("You have already reviewed this listing");
          } else if (err.response.data.error ===  "You can only post 3 reviews per day") {
            setError( "You can only post 3 reviews per day");
          }
        } else {
          setError("An unexpected error occurred.");
      }
    });
};


  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
            {error && <p style={{ color: "red" }}>{error}</p>}
    <Card className="h-100">
        <CardHeader className="d-flex justify-content-between align-items-baseline mb-4">
        </CardHeader>
        <CardContent>
        <div className="mt-auto">
        <span className="fs-2"><strong>Posted By: </strong>{props.username}</span>
        <br/>
        <span className="fs-2"><strong>Title:</strong>{props.title}</span>
        <br/>
        <strong>Description:</strong>{props.description}
        <br/>
          <strong>Features:</strong>
          {props.feature}
          <br/>
          <span className="ms-2 text-muted"><strong>Price:</strong>${props.price}</span>
          {/* <br/>
          <strong>Date Posted: </strong>
          {props.date} */}
          </div>
          </CardContent>
        <div className="mt-auto" onClick={handleClickOpen}>
            <Button className="w-100">
              Add Review
            </Button>
        </div>
    </Card>

        <Dialog open={open}
        onClose={handleClose}>
        <div className='text'>
      <DialogTitle>Leave a Review</DialogTitle></div>

<form id="review-form" onSubmit={handleSubmit}>
    <label>Listing Title: {props.title}</label>
  <br/>
  <label>Listing Description: {props.description}</label>
  <br/>

  <label>Review Description:</label>
  <input
              type="description"
              placeholder="description"
              name="description"
              onChange={(e: React.ChangeEvent<HTMLInputElement> | any) =>
              setDescription(e.target.value)
                            }
            />

  {/* <!-- Rating dropdown --> */}
  <label>Rating:</label>
  <select id="rating" name="rating"                             
  onChange={(e: React.ChangeEvent<HTMLInputElement> | any) =>
                              setRating(e.target.value)}>
    <option value="Excellent">Excellent</option>
    <option value="Good">Good</option>
    <option value="Fair">Fair</option>
    <option value="Poor">Poor</option>
  </select>
<br/>
<br/>
<div className="button">
  <button type="submit" onClick={handleClose}>Submit Review</button>
  </div>
</form>
    </Dialog>
    </div>
  )
}