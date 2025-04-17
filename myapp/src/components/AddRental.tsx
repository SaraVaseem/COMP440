// import Box from '@mui/material/Box';
// import Fab from '@mui/material/Fab';
// import AddIcon from '@mui/icons-material/Add';
// import Button from "@mui/material/Button";



// export default function AddRental() {
//     return (
//         <Button onClick={() => handleClickOpen(id)}>
//         <Box sx={{ '& > :not(style)': { m: 1 } }}>
//           <Fab color="primary" aria-label="add">
//             <AddIcon />
//           </Fab>
//         </Box>
//         </Button>
//       );
// }


// const { onClose, review, open } = props;

// const handleClose = () => {
//   onClose(review);
// };

//   const [title, setFirstName] = useState();
//   const [description, setLastName] = useState();
//   const [price, setUsername] = useState();
//   const [feature, setNumber] = useState();

//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState<boolean>(false);

//   const handlePasswordChange = (
//     e: React.ChangeEvent<HTMLInputElement> | any,
//   ) => {
//     setPassword(e.target.value);
//     if (e.target.value !== confirmPassword) {
//       setError("Passwords don't match!");
//     } else {
//       setError("");
//     }
//   };

//   const handleConfirmPasswordChange = (
//     e: React.ChangeEvent<HTMLInputElement> | any,
//   ) => {
//     setConfirmPassword(e.target.value);
//     if (e.target.value !== password) {
//       setError("Passwords don't match!");
//     } else {
//       setError("");
//     }
//   };

//   // Handle form submission
//   const handleSubmit = (e: React.ChangeEvent<HTMLInputElement> | any) => {
//     e.preventDefault();
//     axios
//       .post("http://localhost:3000/signup", {
//         username: username,
//         password: password,
//         firstName: firstName,
//         lastName: lastName,
//         email: email,
//         phone: phone,
//       })
//       .then((result) => {
//         console.log("Response from server:", result.data);
//         console.log(result.data);
//         setSuccess(true);
//       })
//       .catch((err) => {
//         if (err.response && err.response.data) {
//           console.error("Signup Error:", err.response.data);
//           if (err.response.data.error === "Duplicate entry") {
//             setError(
//               `Error: ${err.response.data.fields.join(", ")} already in use`,
//             );
//           } else if (err.response.data.error === "Missing required fields") {
//             setError("Missing required fields");
//           } else {
//             setError("Username, email, or phone number already taken");
//           }
//         } else {
//           setError("An unexpected error occurred.");
//         }
//       });
//   };


// export function RentalPopup() {
// return (
//   <Dialog onClose={handleClose} open={open}>
//     <DialogTitle>Add Rental</DialogTitle>
//     <form id="review-form" onSubmit={handleSubmit} method="POST" action="/add-rental">
//             <div className="inputs">
//             <div className="input">
//               <img src={user_icon} alt="" width="20px" height="20 px" />
//               <input
//                 type="text"
//                 placeholder="title"
//                 name="title"
//                 onChange={(e: React.ChangeEvent<HTMLInputElement> | any) =>
//                   setUsername(e.target.value)
//                 }
//               />
//             </div>
//             <div className="input">
//               <img src={password_icon} alt="" width="20px" height="20 px" />
//               <input
//                 type="price"
//                 placeholder="price"
//                 name="price"
//                 onChange={handlePasswordChange}
//               />
//             </div>
//             <div className="input">
//               <img src={password_icon} alt="" width="20px" height="20 px" />
//               <input
//                 type="feature"
//                 placeholder="feature"
//                 name="confirmpassword"
//                 onChange={handleConfirmPasswordChange}
//               />
//             </div>
//             <div className="input">
//               <img src={user_icon} alt="" width="20px" height="20 px" />
//               <input
//                 type="text"
//                 placeholder="description"
//                 name="description"
//                 onChange={(e: React.ChangeEvent<HTMLInputElement> | any) =>
//                   setFirstName(e.target.value)
//                 }
//               />
//             </div>
//             <div className="input">
//               <img src={user_icon} alt="" width="20px" height="20 px" />
//               <input
//                 type="text"
//                 placeholder="Last Name"
//                 name="lastName"
//                 onChange={(e: React.ChangeEvent<HTMLInputElement> | any) =>
//                   setLastName(e.target.value)
//                 }
//               />
//             </div>
//             <div className="input">
//               <img src={email_icon} alt="" width="20px" height="20 px" />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 name="email"
//                 onChange={(e: React.ChangeEvent<HTMLInputElement> | any) =>
//                   setEmail(e.target.value)
//                 }
//               />
//             </div>
//             <div className="input">
//               <img src={user_icon} alt="" width="20px" height="20 px" />
//               <input
//                 type="text"
//                 placeholder="Phone Number"
//                 name="phone"
//                 onChange={(e: React.ChangeEvent<HTMLInputElement> | any) =>
//                   setNumber(e.target.value)
//                 }
//               />
//             </div>
//           </div>
//           <br></br>
//           <div className="button">
//             <Button variant="contained" type="submit">
//               Submit
//             </Button>
//           </div>
  
// </form>
//   </Dialog>
// );
// }