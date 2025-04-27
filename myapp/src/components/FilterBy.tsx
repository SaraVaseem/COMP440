import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import '../App.css'
import {useState} from 'react'

export function FilterBy() {
    
    //filter by user

    //filter by rental

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const byUser = () => {
    //pass e then add functionality to each    
      setAnchorEl(null);
    };
    const byRental = () => {
    //pass e then add functionality to each
        setAnchorEl(null);
      };
  
    const handleClose = () => {
        setAnchorEl(null);
    }

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
          <MenuItem onClick={byUser}>User</MenuItem>
          <MenuItem onClick={byRental}>Rental</MenuItem>
        </Menu>
      </div>
    );
}