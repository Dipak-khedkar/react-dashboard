import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h6">Home</Typography>
        </Box>
      </Box>
    </>
  );
};

export default Home;
