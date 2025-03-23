import React from "react";
import Sidebar from "../components/Sidebar";
import { Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h6">About</Typography>
      </Box>
    </Box>
  );
};

export default About;
