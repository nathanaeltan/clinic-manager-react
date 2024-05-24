import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
const Header = () => {
  return (
    // <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar  className="bg-blue-500">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Clinic Manager
          </Typography>
        </Toolbar>
      </AppBar>
    // </Box>
  );
};

export default Header;
