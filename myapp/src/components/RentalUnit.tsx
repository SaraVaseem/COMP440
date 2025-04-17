//import { useState } from "react";
import { Button } from '@mui/material'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

export interface Unit {
  id: number;
  title: string;
  description: string;
  feature: string;
  price: number;
}

export default function RentalUnit(props:Unit) {
  // const { id, title, description, feature, price } = props.data;
  // const [open, setOpen] = useState(false);
  // const [review, setReview] = useState(reviews);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = (value) => {
  //   setOpen(false);
  //   setReview(value);
  // };
  
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
        <div className="mt-auto">
            <Button className="w-100">
              Add Review
            </Button>
        </div>
        {/* <SimpleDialog
        review={review}
        open={open}
        onClose={handleClose}
      /> */}
    </Card>
  )
}

// export function AddReview() {
//   const { onClose, review, open } = props.data;

//   const handleClose = () => {
//     onClose(review);
//   };

//   return (
//     <Dialog onClose={handleClose} open={open}>
//       <DialogTitle>Add Review</DialogTitle>
//       <form id="review-form" method="POST" action="/submit-review">
    
//       <span className="fs-2">{title}</span>
//           <span className="ms-2 text-muted">{price}</span>
//         <div className="mt-auto">
//           {description}
//           </div>
//           <div className="mt-auto">
//           {feature}
//           </div>

//     <!-- Rating dropdown -->
//     <label>Rating:</label>
//     <select id="rating" name="rating">
//       <option value="Excellent">Excellent</option>
//       <option value="Good">Good</option>
//       <option value="Fair">Fair</option>
//       <option value="Poor">Poor</option>
//     </select>

//     {/* <!-- Description --> */}
//     <label>Description:</label>
//     <textarea id="description" name="description"></textarea>

//     <button type="submit">Submit Review</button>
//   </form>
//     </Dialog>
//   );
// }