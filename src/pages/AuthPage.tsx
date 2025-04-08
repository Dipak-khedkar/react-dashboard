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
import { ChangeEvent, useEffect, useState } from "react";
import { Errors, validateAuth } from "../validations/validateAuth";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getAllUsers, updateUser } from "../store/slicer/authSlice";
import bcrypt from "bcryptjs";

export interface AuthData {
  email: string;
  password: string;
}

const AuthPage = () => {
  const [authData, setAuthData] = useState<AuthData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setAuthData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const response = validateAuth(authData);
    if (Object.keys(response).length > 0) {
      setErrors(response);
    } else {
      setErrors({});
      const user: any = users.find((u: any) => u.email === authData.email);
      if (user) {
        const res = await bcrypt.compare(authData.password, user.password);
        if (res) {
          localStorage.setItem("user", "true");
          dispatch(updateUser(res));
        } else {
          setErrors({
            password: "Password is incorrect",
          });
        }
      } else {
        setErrors({
          email: "User does not exit this email",
        });
      }
    }
  };

  return (
    <Box>
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid>
          <Card
            sx={{
              boxShadow: 3,
              width: "370px",
              padding: "10px",
            }}
          >
            <Typography variant="h6" textAlign="center">
              Login
            </Typography>
            <CardContent>
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                name="email"
                margin="normal"
                error={!!errors.email}
                helperText={errors.email}
                value={authData.email}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="Password"
                type="password"
                margin="normal"
                name="password"
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password}
                value={authData.password}
                onChange={handleInputChange}
                fullWidth
              />
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: "100%" }}
                onClick={handleSubmit}
              >
                Login
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthPage;
