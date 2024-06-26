import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SideBar from '../components/SideBar';
import Container from '@mui/material/Container';
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
const Root = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
        <SideBar/>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Outlet />
          {/* <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              </Paper>
            </Grid>
          </Grid> */}
        </Container>
      </Box>
    </Box>
  )
}

export default Root