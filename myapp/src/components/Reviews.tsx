import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import '../App.css'

interface Review {
    username: string;
    description: string;
    rating: string;
    title: string;
  }

export default function ReviewRental(props:Review) {

  const { username, description, rating, title } = props;

  return (
    <div>
    <Card className="h-100">
    <CardContent>
    {/* <span className="fs-2">Title:{title}</span> */}
          <span className="ms-2 text-muted flex-start">
          Posted By: {username}</span>
        <div className="mt-auto review">
          Rating:{rating}
          </div>
          <div className="mt-auto">
          Description:{description}
          </div>
          </CardContent>
    </Card>

    </div>
  )
}