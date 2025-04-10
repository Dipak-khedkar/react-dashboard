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
import bcrypt from "bcryptjs";
import { Errors, signupValidator } from "../validations/signupValidator";
import { useAppDispatch } from "../store/store";
import { signupUser } from "../store/slicer/authSlice";

export interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

const SignupPage = () => {
  const [signupData, setSignupData] = useState<SignupData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const dispatch = useAppDispatch();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setSignupData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    const response = signupValidator(signupData);
    if (Object.keys(response).length > 0) {
      setErrors(response);
    } else {
      setErrors({});
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(signupData.password, salt);
      delete signupData.confirmPassword;
      dispatch(signupUser({ ...signupData, password: hash }));
    }
  };

  return (
    <Box sx={{ backgroundColor: "ActiveCaption" }}>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          margin: "10px",
        }}
      >
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ padding: "10px" }}>
            <Typography
              variant="h6"
              textAlign="center"
              color="black"
              marginTop={2}
            >
              Sign Up
            </Typography>
            <CardContent>
              <TextField
                label="Name"
                name="name"
                margin="normal"
                value={signupData.name}
                onChange={handleInputChange}
                error={!!errors.name}
                helperText={errors.name}
                fullWidth
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                margin="normal"
                error={!!errors.email}
                helperText={errors.email}
                value={signupData.email}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="Password"
                name="password"
                margin="normal"
                type="password"
                error={!!errors.password}
                helperText={errors.password}
                value={signupData.password}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                margin="normal"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                value={signupData.confirmPassword}
                onChange={handleInputChange}
                fullWidth
              />
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ width: "100%" }}
              >
                Sign up
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignupPage;
