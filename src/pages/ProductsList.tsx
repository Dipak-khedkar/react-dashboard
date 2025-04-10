import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchProducts } from "../store/slicer/productSlice";
import { addToCart } from "../store/slicer/cartSlice";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Rating,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
  rating: number;
}

const ProductsList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state: RootState) => state.products
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h6" textAlign="center" sx={{ mb: 3 }}>
        Product Data
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        {!loading && (
          <TextField
            label="Search Products"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "gray" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              width: "100%",
              maxWidth: 300,
              borderRadius: "50px",
            }}
          />
        )}
      </Box>

      {loading && (
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography
          color="error"
          textAlign="center"
          sx={{
            mb: 3,
            display: "flex",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {error}
        </Typography>
      )}

      {filteredProducts.length === 0 && searchQuery && !loading && (
        <Typography
          variant="h6"
          color="textSecondary"
          textAlign="center"
          sx={{
            mb: 3,
            display: "flex",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          No products found
        </Typography>
      )}

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
            sx={{
              padding: 2,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
            key={product.id}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: "100%",
                height: 200,
                objectFit: "contain",
                marginBottom: "16px",
              }}
            />
            <Typography variant="h6">{product.title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {product.category}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
              ${product.price}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
              <Rating
                name="simple-controlled"
                value={product.rating}
                readOnly
              />
            </Box>

            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              fullWidth
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </Button>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default ProductsList;
