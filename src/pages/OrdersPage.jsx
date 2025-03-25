import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../redux/slicer/cartSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  // Calculate total price based on quantities
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleIncrement = (productId) => {
    dispatch(incrementQuantity(productId));
  };

  const handleDecrement = (productId) => {
    dispatch(decrementQuantity(productId));
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

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
            Your Order
          </Typography>

          {cart.length === 0 ? (
            <Typography variant="h6" color="textSecondary">
              Your cart is empty
            </Typography>
          ) : (
            <TableContainer component={Paper} sx={{ mb: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Subtotal</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell sx={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={product.image}
                          alt={product.title}
                          style={{
                            width: 50,
                            height: 50,
                            objectFit: "contain",
                            marginRight: 10,
                          }}
                        />
                        <Typography variant="body2">{product.title}</Typography>
                      </TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <IconButton
                            onClick={() => handleDecrement(product.id)}
                            disabled={product.quantity === 1}
                            sx={{ marginRight: 1 }}
                          >
                            <RemoveIcon />
                          </IconButton>

                          <Typography variant="body2">
                            {product.quantity}
                          </Typography>

                          <IconButton
                            onClick={() => handleIncrement(product.id)}
                            sx={{ marginLeft: 1 }}
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell>
                        ${(product.price * product.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="error"
                          onClick={() => handleRemove(product.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {cart.length > 0 && (
            <Paper sx={{ padding: 2, marginTop: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Total Price: ${calculateTotalPrice().toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, width: "100%" }}
                disabled={cart.length === 0}
              >
                Checkout
              </Button>
            </Paper>
          )}
        </Box>
      </Box>
    </>
  );
};

export default OrdersPage;
