import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  Box,
  Typography,
  CircularProgress,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { fetchProducts } from "../redux/slicer/productSlice";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { addToCart } from "../redux/slicer/cartSlice";

const ProductsData = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (search) {
      setFilteredProducts(
        products.filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [search, products]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h6">Product Data</Typography>

          {/* Loading or Error Handling */}
          {loading && <CircularProgress />}
          {error && <Typography color="error">{error}</Typography>}

          <Paper sx={{ marginTop: 2, padding: 2 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <TextField
                label="Search"
                variant="outlined"
                size="small"
                value={search}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: <SearchIcon />,
                }}
                sx={{ width: 300 }}
              />
            </Box>

            {/* Product Cards */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                  lg: "repeat(4, 1fr)",
                },
                gap: 3,
              }}
            >
              {filteredProducts.map((product) => (
                <Paper
                  sx={{ padding: 2, textAlign: "center" }}
                  key={product.id}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: "100%", height: 200, objectFit: "contain" }}
                  />
                  <Typography variant="h6">{product.title}</Typography>
                  <Typography variant="body2">{product.category}</Typography>
                  <Typography variant="body1">${product.price}</Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleAddToCart(product)}
                    sx={{ mt: 2 }}
                  >
                    Add to Cart
                  </Button>
                </Paper>
              ))}
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default ProductsData;
