import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Errors, validateUserInput } from "../validations/validateUserInput";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { createUser } from "../store/slicer/userSlice";
import { useNavigate } from "react-router-dom";

export interface UserData {
  name: string;
  email: string;
  phone: string;
}

const CreateUser = () => {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const dispatch: AppDispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUserData((prevdata) => ({ ...prevdata, [name]: value }));
  };

  const onSubmit = () => {
    const response = validateUserInput(userData);
    console.log("Validation Response:", response);
    if (Object.keys(response).length > 0) {
      setErrors(response);
    } else {
      setErrors({});
      dispatch(createUser(userData));
      setUserData({
        name: "",
        email: "",
        phone: "",
      });

      console.log(userData);
      navigate("/users");
    }
  };

  return (
    <Box sx={{ padding: { xs: 2, sm: 3 } }}>
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: "40px",
          display: "flex",
          height: "80vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid>
          <Card
            sx={{
              boxShadow: 3,
              width: { xs: "260px", md: "370px" },
              padding: "10px",
            }}
          >
            <Typography
              variant="h6"
              textAlign="center"
              marginTop={2}
              sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
            >
              New User
            </Typography>
            <CardContent>
              <TextField
                label="Name"
                name="name"
                margin="normal"
                fullWidth
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name}
                value={userData.name}
                onChange={handleInputChange}
              />
              <TextField
                label="Email"
                margin="normal"
                fullWidth
                variant="outlined"
                type="email"
                name="email"
                error={!!errors.email}
                helperText={errors.email}
                value={userData.email}
                onChange={handleInputChange}
              />
              <TextField
                label="Phone"
                margin="normal"
                fullWidth
                variant="outlined"
                type="number"
                name="phone"
                error={!!errors.phone}
                helperText={errors.phone}
                value={userData.phone}
                onChange={handleInputChange}
              />
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                onClick={onSubmit}
                variant="contained"
                color="primary"
                sx={{ width: "100%" }}
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </CardActions>{" "}
            {error && (
              <Typography
                color="error"
                sx={{ textAlign: "center", marginTop: 2 }}
              >
                {error}
              </Typography>
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateUser;
