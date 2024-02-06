import React from "react";
import { Typography, Container, makeStyles } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Typography variant="h1">404 - Not Found</Typography>
      <Typography variant="body1">
        Sorry, the page you are looking for does not exist.
      </Typography>
    </Container>
  );
};

export default NotFound;
