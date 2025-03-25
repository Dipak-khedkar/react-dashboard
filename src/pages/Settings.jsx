import React from "react";
import Sidebar from "../components/Sidebar";
import { Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";

const Settings = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h6">Settings</Typography>
        </Box>
      </Box>
    </>
  );
};

export default Settings;
