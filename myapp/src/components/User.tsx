//import { useState } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import '../App.css'

export interface User {
    username: string;
  }
  
export default function User(props:User) {

  return (
    <div>
    <Card className="h-100">
        <CardHeader className="d-flex justify-content-between align-items-baseline mb-4">
        </CardHeader>
        <CardContent>
        <span className="fs-2"><strong>User: </strong>{props.username}</span>
          </CardContent>
    </Card>
    </div>
  )
}