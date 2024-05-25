import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Favorite, Map } from "@mui/icons-material";
import { Link } from 'react-router-dom'
const PropertyCard = ({ data }) => {

  return (
    <>
      <Link to={`/property/${data._id}`}>
        <Card sx={{}}>
          <CardMedia
            sx={{ height: 140 }}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="green iguana"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {data.type}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {data.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.beds} | {data.baths} | {data.square_feet}
            </Typography>
            <Typography
              component={"div"}
              variant="body2"
              color="text.secondary"
              className="p"
            >
              {data.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <Map /> {data.location.street}, {data.location.city},{" "}
              {data.location.state}, {data.location.zipcode}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">
              <Favorite />
              {/* <FavoriteBorderOutlined /> */}
            </Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Link>
    </>
  );
};

export default PropertyCard;
