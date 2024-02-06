import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Card as MuiCard,
  CardContent,
  CardMedia,
  Typography,
  Popover,
} from "@mui/material";

const CardBody = ({ imageUrl, rating, price, description }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <MuiCard
        className="card"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt="Product"
          className="card-image"
        />
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            className="card-rating"
          >
            Rating: {rating}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="card-price"
          >
            Price: ${price}
          </Typography>
        </CardContent>
      </MuiCard>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          className="card-description"
        >
          {description}
        </Typography>
      </Popover>
    </>
  );
};

CardBody.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};

export default CardBody;
