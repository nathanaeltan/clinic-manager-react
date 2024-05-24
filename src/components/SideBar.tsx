import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
const SideBar = () => {
  return (
    <Box sx={{ width: 200 }} role="presentation" className="mt-20">
      <List>
        {["Dashboard", "Patients", "Appointments", "Medications"].map(
          (text, index) => (
            <Link key={text} to={text.toLowerCase()}>
              <ListItem

                disablePadding
                className="hover:rounded hover:bg-blue-500 hover:text-white"
              >
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            </Link>
          )
        )}
      </List>
      <Divider />
    </Box>
  );
};

export default SideBar;
