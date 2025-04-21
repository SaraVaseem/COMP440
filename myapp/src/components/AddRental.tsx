import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/material/Icon';
import {useState} from 'react'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import "./FeatureList.json";
import '../App.css'
import axios from 'axios';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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

    const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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
      }
      
export default function AddRental() {

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [feature, setFeature] = useState<string[]>([]);
    const [price, setPrice] = useState();
 const [error, setError] = useState("");

    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement> | any) => {
      e.preventDefault();
      const username = localStorage.getItem("username") ?? "guest_user";
        console.log(username)

      axios.post("http://localhost:3000/add-rental", {
          title: title,
          description: description,
          feature: feature,
          price: price,
          username: username
        })
        .then((result) => {
          console.log("Response from server:", result.data);
          console.log(result.data);
          setError('Rental Added!')
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            console.error("Add Rental Error:", err.response.data);
            if (err.response.data.message === "You can only post 2 listings per day. ") {
              setError('No more than two rentals per user in a day.')
            }
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

    const handleChange = (event: SelectChangeEvent<typeof feature>) => {
      const {
        target: { value },
      } = event;
      setFeature(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };

    return (
        <div style={{display: 'flex', justifyContent:'flex-start'}}>
                    <div className="mt-auto" onClick={handleClickOpen}>
                    {error && <p style={{ color: "red" }}>{error}</p>}
        <Box sx={{ '& > :not(style)': { m: 0 } }}>
          <Fab onClick={handleClickOpen} color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Box>
        </div>   

        <Dialog open={open}
        onClose={handleClose}>
    <div className='text'>
  <DialogTitle><b>Add a Rental</b></DialogTitle></div>
<form id="add-rental" onSubmit={handleSubmit}>

<div className="input">
            <input
              type="title"
              placeholder="Title"
              name="title"
                            onChange={(e: React.ChangeEvent<HTMLInputElement> | any) =>
                              setTitle(e.target.value)
                            }
            />
</div>

<div className="input">
            <input
              type="description"
              placeholder="Description"
              name="description"
                            onChange={(e: React.ChangeEvent<HTMLInputElement> | any) =>
                              setDescription(e.target.value)
                            }
            />
</div>

<div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-name-label">Feature</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={feature}
            onChange={handleChange}
            input={<OutlinedInput label="Feature" />}
            MenuProps={MenuProps}
          >
            {features.map((feature) => (
              <MenuItem
                key={feature}
                value={feature}
              >
                {feature}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

<div className="input">
            <input
              type="price"
              placeholder="Price"
              name="price"
                            onChange={(e: React.ChangeEvent<HTMLInputElement> | any) =>
                              setPrice(e.target.value)
                            }
            />
</div>

<br/>
<br/>
<div className="button">
<button type="submit" onClick={handleClose}>Add Rental</button>
</div>
</form>
</Dialog>
        </div>
      );
}