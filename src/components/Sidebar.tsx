import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import InventoryIcon from "@mui/icons-material/Inventory";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/store";
import { updateUser } from "../store/slicer/authSlice";

const drawerWidth = 240;
const mobileDrawerWidth = 180;

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open?: boolean }>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
  },
  ...(open && {
    marginLeft: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Sidebar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [open, setOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isSmallScreen) setOpen(false); // Close drawer on small screen
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    dispatch(updateUser(false));
    navigate("/login");
    if (isSmallScreen) setOpen(false);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const settings = [
    { name: "Profile", path: "/profile" },
    { name: "Account", path: "/account" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Logout", path: "/logout" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={!isSmallScreen && open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            React Dashboard
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              sx={{ mt: "45px" }}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.name}
                  onClick={() => {
                    handleCloseUserMenu();
                    if (setting.name === "Logout") logoutUser();
                    else handleNavigation(setting.path);
                  }}
                >
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isSmallScreen ? "temporary" : "persistent"}
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isSmallScreen ? mobileDrawerWidth : drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding onClick={() => handleNavigation("/")}>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => handleNavigation("/products")}
          >
            <ListItemButton>
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => handleNavigation("/orders")}>
            <ListItemButton>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => handleNavigation("/users")}>
            <ListItemButton>
              <ListItemIcon>
                <AttachMoneyIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => handleNavigation("/analytics")}
          >
            <ListItemButton>
              <ListItemIcon>
                <SignalCellularAltIcon />
              </ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            disablePadding
            onClick={() => handleNavigation("/settings")}
          >
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => handleNavigation("/help")}>
            <ListItemButton>
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary="Help" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={logoutUser}>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Main open={!isSmallScreen && open}>
        <DrawerHeader />
        {/* Routed Components Here */}
      </Main>
    </Box>
  );
};

export default Sidebar;
