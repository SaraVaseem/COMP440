import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
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
        <CardHeader className="d-flex justify-content-between align-items-baseline mb-4">
        <span className="fs-2">Title:{title}</span>
          <span className="fs-2">Rating:{rating}</span>
          <span className="ms-2 text-muted">Username:{username}</span>
        </CardHeader>
        <CardContent>
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