import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Header from "../Header/Header";
import { useNavigate } from "react-router";
import CardBody from "../Card/CardBody";

function Dashboard() {
  const [storeData, setStoreData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const json = await response.json();
        setStoreData(json);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <Grid container spacing={2}>
      <Header onLogout={handleLogout} />
      {storeData.map((item) => (
        <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
          <CardBody
            key={item.id}
            imageUrl={item.image}
            rating={item.rating.rate}
            price={item.price}
            description={item.description}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default Dashboard;
