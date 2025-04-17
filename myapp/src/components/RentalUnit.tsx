//import { useState } from "react";
import { Button } from '@mui/material'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {useState} from 'react';
import '../App.css'

const emails = ['username@gmail.com', 'user02@gmail.com'];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

export interface Unit {
  id: number;
  title: string;
  description: string;
  feature: string;
  price: number;
}

export default function RentalUnit(props:Unit) {

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  
  return (
    <Card className="h-100">
        <CardHeader className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{props.title}</span>
          <span className="ms-2 text-muted">{props.price}</span>
        </CardHeader>
        <CardContent>
        <div className="mt-auto">
          {props.description}
          </div>
          <div className="mt-auto">
          {props.feature}
          </div>
          </CardContent>
        <div className="mt-auto" onClick={handleClickOpen}>
            <Button className="w-100">
              Add Review
            </Button>
        </div>
      <AddReview
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </Card>
  )
}

export function AddReview(props: SimpleDialogProps) {

  const { onClose, selectedValue, open } = props;
  
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
        <div className='text'>
      <DialogTitle>Leave a Review</DialogTitle></div>

<form id="review-form" method="POST" action="/home">
  
  {/* <!-- Search bar --> */}
  <label>Listing Title: {}</label>
  <br/>
  <label>Listing Description: {}</label>
  <br/>

  <label>Description:</label>
  <textarea id="description" name="description"></textarea>

  {/* <!-- Rating dropdown --> */}
  <label>Rating:</label>
  <select id="rating" name="rating">
    <option value="Excellent">Excellent</option>
    <option value="Good">Good</option>
    <option value="Fair">Fair</option>
    <option value="Poor">Poor</option>
  </select>
<br/>
<br/>
<div className="button">
  <button type="submit">Submit Review</button>
  </div>
</form>
    </Dialog>
  );
}