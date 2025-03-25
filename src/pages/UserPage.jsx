import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../redux/slicer/usersSlice";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Checkbox,
  Container,
  Typography,
  Box,
  Avatar,
  CircularProgress,
  Paper,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
} from "@mui/icons-material";

const UserPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const status = useSelector((state) => state.users.status);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    created_at: "",
    updated_at: "",
  });
  const [editingUser, setEditingUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Add user
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.phone) {
      setError("All fields are required.");
      return;
    }

    setError("");
    dispatch(
      addUser({
        ...newUser,
        created_at: new Date().toLocaleDateString(),
        updated_at: new Date().toLocaleDateString(),
      })
    );
    setNewUser({
      name: "",
      email: "",
      phone: "",
      created_at: "",
      updated_at: "",
    });
    setShowForm(false);
  };

  // Edit user
  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({ ...user });
    setShowForm(true);
  };

  // Update user
  const handleUpdateUser = () => {
    if (!newUser.name || !newUser.email || !newUser.phone) {
      setError("All fields are required.");
      return;
    }

    setError("");
    dispatch(
      updateUser({ ...newUser, updated_at: new Date().toLocaleDateString() })
    );
    setEditingUser(null);
    setNewUser({
      name: "",
      email: "",
      phone: "",
      created_at: "",
      updated_at: "",
    });
    setShowForm(false);
  };

  const handleCloseDialog = () => {
    setEditingUser(null);
    setNewUser({
      name: "",
      email: "",
      phone: "",
      created_at: "",
      updated_at: "",
    });
    setShowForm(false);
  };

  // Delete user
  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  // Delete selected users
  const handleDeleteSelected = () => {
    selectedUsers.forEach((id) => dispatch(deleteUser(id)));
    setSelectedUsers([]);
  };

  // Checkbox logic
  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter((id) => id !== userId)
        : [...prevSelectedUsers, userId]
    );
  };

  // Select all users
  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
          }}
        >
          <Container>
            <Typography variant="h4" gutterBottom>
              User Management
            </Typography>

            {/* Show the Create User Button */}
            <Box mb={3}>
              <Button
                onClick={() => setShowForm(true)}
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                sx={{
                  width: "100%",
                  maxWidth: "200px",
                }}
              >
                Create User
              </Button>
            </Box>

            {/* Dialog for Create/Update User */}
            <Dialog open={showForm} onClose={handleCloseDialog}>
              <DialogTitle>
                {editingUser ? "Edit User" : "Create User"}
              </DialogTitle>
              <DialogContent>
                <TextField
                  label="Name"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  fullWidth
                  margin="normal"
                  required
                  error={error && !newUser.name}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  fullWidth
                  margin="normal"
                  required
                  error={error && !newUser.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Phone"
                  value={newUser.phone}
                  onChange={(e) =>
                    setNewUser({ ...newUser, phone: e.target.value })
                  }
                  fullWidth
                  margin="normal"
                  required
                  error={error && !newUser.phone}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                {error && (
                  <Typography
                    color="error"
                    variant="body2"
                    sx={{ marginTop: 1 }}
                  >
                    {error}
                  </Typography>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="secondary">
                  Cancel
                </Button>
                <Button
                  onClick={editingUser ? handleUpdateUser : handleAddUser}
                  variant="contained"
                  color="primary"
                >
                  {editingUser ? "Update User" : "Add User"}
                </Button>
              </DialogActions>
            </Dialog>

            {/* Delete Selected Users Button */}
            {selectedUsers.length > 0 && (
              <Button
                onClick={handleDeleteSelected}
                variant="contained"
                color="secondary"
                sx={{ marginTop: 2, marginLeft: 2 }}
                startIcon={<DeleteIcon />}
              >
                Delete Selected Users
              </Button>
            )}

            {/* User Table */}
            <TableContainer
              sx={{
                marginTop: 3,
                overflowX: "auto",
              }}
            >
              <Paper>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                      <TableCell>
                        <Checkbox
                          checked={selectedUsers.length === users.length}
                          onChange={handleSelectAll}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <PersonIcon
                            sx={{
                              marginRight: 1,
                              fontSize: isSmallScreen ? 18 : 24,
                            }}
                          />
                          Name
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <MailIcon
                            sx={{
                              marginRight: 1,
                              fontSize: isSmallScreen ? 18 : 24,
                            }}
                          />
                          Email
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <PhoneIcon
                            sx={{
                              marginRight: 1,
                              fontSize: isSmallScreen ? 18 : 24,
                            }}
                          />
                          Phone
                        </Box>
                      </TableCell>
                      <TableCell>Created At</TableCell>
                      <TableCell>Updated At</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {status === "loading" ? (
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <CircularProgress />
                      </Box>
                    ) : (
                      users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedUsers.includes(user.id)}
                              onChange={() => handleCheckboxChange(user.id)}
                            />
                          </TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.phone}</TableCell>
                          <TableCell>{user.created_at}</TableCell>
                          <TableCell>{user.updated_at}</TableCell>
                          <TableCell>
                            <Tooltip title="Edit User">
                              <IconButton
                                color="primary"
                                onClick={() => handleEditUser(user)}
                                sx={{
                                  fontSize: isSmallScreen ? 20 : 24,
                                  marginRight: isSmallScreen ? 0 : 1,
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete User">
                              <IconButton
                                color="error"
                                onClick={() => handleDeleteUser(user.id)}
                                sx={{
                                  fontSize: isSmallScreen ? 20 : 24,
                                  marginRight: isSmallScreen ? 0 : 1,
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </Paper>
            </TableContainer>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default UserPage;
