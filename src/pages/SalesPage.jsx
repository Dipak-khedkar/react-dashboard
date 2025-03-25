import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Box, Typography, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { calculateTotalPrice } from "../redux/slicer/cartSlice"; // Assuming you already have a function like this

const SalePage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  // Prepare data for the chart
  const chartData = cart.map((product) => ({
    name: product.title,
    quantity: product.quantity,
    price: product.price,
    subtotal: product.price * product.quantity,
  }));

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Roboto', sans-serif",
              fontWeight: "bold",
              marginBottom: 3,
            }}
          >
            Order Overview
          </Typography>

          {/* Display Bar Chart for Order Data */}
          <Paper sx={{ padding: 3, marginTop: 3 }}>
            <Typography variant="h6">Product Quantity in Orders</Typography>

            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantity" fill="#8884d8" />
                <Bar dataKey="subtotal" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>

          {/* Total Price */}
          {cart.length > 0 && (
            <Paper sx={{ padding: 2, marginTop: 3 }}>
              <Typography variant="h6">
                Total Price: ${calculateTotalPrice().toFixed(2)}
              </Typography>
            </Paper>
          )}
        </Box>
      </Box>
    </>
  );
};

export default SalePage;
