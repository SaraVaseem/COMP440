import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/material/Icon';
import Button from "@mui/material/Button";
import {useState} from 'react'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import "./FeatureList.json";
import '../App.css'

const features = [
    "Wi-Fi",
    "Air Conditioning",
    "Heating",
    "Washer",
    "Dryer",
    "Dishwasher",
    "Microwave",
    "Refrigerator",
    "Stove",
    "Oven",
    "Kitchen",
    "Private Entrance",
    "Free Parking",
    "Garage Parking",
    "Street Parking",
    "Security System",
    "Balcony",
    "Patio",
    "Deck",
    "Backyard",
    "Garden",
    "Swimming Pool",
    "Hot Tub",
    "Sauna",
    "Fireplace",
    "Smart TV",
    "Streaming Services",
    "Cable TV",
    "Mountain View",
    "Lake View",
    "Ocean View",
    "City View",
    "Courtyard View",
    "Elevator",
    "Wheelchair Accessible",
    "Pet Friendly",
    "Cat Friendly",
    "Dog Friendly",
    "No Pets Allowed",
    "Furnished",
    "Unfurnished",
    "Utilities Included",
    "Water Included",
    "Electricity Included",
    "Gas Included",
    "Trash Removal",
    "Internet Included",
    "24-hour Maintenance",
    "Doorman",
    "Concierge Service",
    "Laundry in Unit",
    "Laundry in Building",
    "Hardwood Floors",
    "Carpeted Floors",
    "Tile Floors",
    "Walk-in Closet",
    "Double Vanity",
    "Bathtub",
    "Stand-up Shower",
    "Rain Shower",
    "Solar Panels",
    "Energy Efficient Appliances",
    "Ceiling Fans",
    "Skylight",
    "Breakfast Bar",
    "Pantry",
    "Dining Area",
    "Home Office",
    "Gym/Fitness Center",
    "Game Room",
    "Theater Room",
    "Business Center",
    "Gated Community",
    "Smoke-Free",
    "Grill/BBQ Area",
    "Playground",
    "Basketball Court",
    "Tennis Court",
    "Dog Park",
    "Clubhouse",
    "On-site Management",
    "Storage Space",
    "Bike Storage",
    "Package Room",
    "Rooftop Access",
    "Recreation Room",
    "Keyless Entry",
    "Smart Home Integration",
    "Intercom System",
    "High Ceilings",
    "Loft Layout",
    "Finished Basement",
    "Attic Storage",
    "Shared Kitchen",
    "Shared Living Room",
    "Shared Bathroom",
    "Private Bathroom",
    "Private Balcony",
    "Near Public Transit",
    "Near Schools",
    "Near Shopping",
    "Near Restaurants",
    "Near Parks",
    "Quiet Neighborhood",
    "Utilities Not Included",
    "Short-Term Lease",
    "Long-Term Lease",
    "Month-to-Month",
    "Subletting Allowed",
    "No Subletting",
    "Key Fob Access",
    "Recycling Service"  ];

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
      
export default function AddRental() {
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
        <div style={{display: 'flex', justifyContent:'flex-start'}}>
                    <div className="mt-auto" onClick={handleClickOpen}>
                    <Button>
        <Box sx={{ '& > :not(style)': { m: 0 } }}>
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Box>
        </Button>
        </div>   
        <RentalPopup
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
            />
        </div>
      );
}

export function RentalPopup(props: SimpleDialogProps) {
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
  <DialogTitle><b>Add a Rental</b></DialogTitle></div>

<form id="add-rental" method="POST" action="/home">

<div className="input">
            <input
              type="title"
              placeholder="Title"
              name="title"
            />
</div>

<div className="input">
            <input
              type="description"
              placeholder="Description"
              name="description"
            />
</div>

{/* <!-- Rating dropdown --> */}
<div className="input">

<label>Feature:</label>
<select id="rating" name="rating">
<option value="Air Conditioning">Excellent</option>
<option value="Wi-Fi">Good</option>
<option value="Bathrooms">Fair</option>
<option value="Scenic">Poor</option>
</select>
</div>

<div className="input">
            <input
              type="price"
              placeholder="Price"
              name="price"
            />
</div>

<br/>
<br/>
<div className="button">
<button type="submit">Add Rental</button>
</div>
</form>
</Dialog>
);
}