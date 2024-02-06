import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Header = ({ onLogout }) => {
  return (
    <AppBar position="sticky" style={{ top: 0 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Products
        </Typography>
        <Button color="inherit" onClick={onLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
