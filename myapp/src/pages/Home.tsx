import React, { useState } from "react";
import '../App.css';
import Button from '@mui/material/Button'
import axios from "axios";
//import { PostCard } from "../components/PostCard.jsx"

// function PostCard(props:React.ChangeEvent<HTMLInputElement> | any) {
//   const { title, description, feature, price } = props.contact;
//   return (
//     <div className="item">
//       <div className="content">
//           <div>{title}</div>
//           <div>{description}</div>
//           <div>{feature}</div>
//           <div>{price}</div>
//       </div>
//     </div>
//   );
// };

export default function Home() {

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [feature, setFeature] = useState();
    const [price, setPrice] = useState();
    const [error, setError] = useState('');

      // Handle form submission
      const getInfo = (e: React.ChangeEvent<HTMLInputElement> | any) => {
        e.preventDefault()
        axios.post('http://localhost:3000/home',{
          title: title,
          description: description,
          feature: feature,
          price: price,
      })
        .then(result => {   console.log("Response from server:", result.data);
            console.log(result.data)
        })
        .catch(err => {
          if (err.response && err.response.data) {
              console.error("Rental Insertion Error:", err.response.data);
              if(err.response.data.error === "Missing required fields"){
                setError("Missing required fields");
              }
          } else {
            setError("An unexpected error occurred.");
          }
      });
      };

      const postInfo = (e: React.ChangeEvent<HTMLInputElement> | any) => {
        e.preventDefault()
        axios.post('http://localhost:3000/home')
        .then((res)=>{
          let data = res.data;
        })
        .catch(err=>{
          console.log(err);
        });    
      };

    return (
        <>
    <div className="container">
      <div className="header">
      <div className = "text">Insert Rental Unit</div>
        <div className= "underline"></div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={getInfo}>
      <div className="inputs">
      <div className="input">
        <label><b>Title</b></label>
        <input type="text" placeholder="" name="title"                 
        onChange={(e: React.ChangeEvent<HTMLInputElement> | any) => setTitle(e.target.value)}
/>
      </div>
      <div className="input">
      <label><b>Description</b></label>
        <input type="text" placeholder="" name="description"
                onChange={(e: React.ChangeEvent<HTMLInputElement> | any) => setDescription(e.target.value)}
/>
</div>
<div className="input">
<label><b>Feature</b></label>
        <input type="text" placeholder="" name="feature"
                onChange={(e: React.ChangeEvent<HTMLInputElement> | any) => setFeature(e.target.value)}
/>
</div>

<div className="input">
<label><b>Price</b></label>
        <input type="text" placeholder="" name="price"
                onChange={(e: React.ChangeEvent<HTMLInputElement> | any) => setPrice(e.target.value)}
/>
</div>
      </div>
      <br></br>
      <div className="button">
      <Button variant="contained" type="submit">Submit</Button>
      </div>      
      </form> 
      </div>
        {/* <PostCard data={data}></PostCard> */}
        </div>
    </>
    );
}