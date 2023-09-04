import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import "./App.css";
import Home from "./pages/home/Home";
import ResponsiveDrawer from "./pages/ResponsiveDrawer/ResponsiveDrawer"
import Search from "./pages/search"
import Library from "./pages/library"
import Searchalbums from "./pages/library/searchalbums";
import TransitionsModal from "./pages/login/pop"
import PlaylistDesign from "./pages/playlistDesign/playlistDesign"
import Popup from 'reactjs-popup';
import FloatingActionButtonZoom from "./pages/login/switch"
// import BottomAppBar from "./pages/sound"
import { Box, AppBar, Toolbar, Switch } from "@mui/material"
import { MusicNote } from "@mui/icons-material"
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import BasicModal from "./pages/login/pop";
import { AuthContextProvider } from "./context/authContext";
import FavoriteData from "./pages/liked songs";
import CreatePlaylist from "./pages/createPlaylists";
import NewPlaylist from "./pages/createPlaylists/createPlaylist";
import AddSongs2Playlist from "./pages/createPlaylists/displaySongs2Playlist";
import Songs2album from "./pages/library/songs2album";
import Songs2playlist from "./pages/library/songs2playlist"




function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Router>
      <AuthContextProvider>

        <Box sx={{
          flexGrow: 1, display: "flex",
          minHeight: "100vh", flexFlow: "column"
        }}>
          <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                <MusicNote /> Vibeat <MusicNote />
              </Typography>
              <BasicModal></BasicModal>

            </Toolbar>
          </AppBar>
          <ResponsiveDrawer mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
          <Box sx={{ ml: "240px", display: "flex", flexGrow: 1 }}>
            <Routes>
              {/* <Route path="/login" element={<Login />} /> */}
              {/* <Route path="/register" element={<Register />} /> */}
              <Route path="/home" element={<Home id="growth" />} />
              <Route path="/search" element={<Search />} />
              <Route path="/YourLibrary" element={<Library />} />
              <Route path="/searchalbums" element={<Searchalbums />} />
              <Route path="/LikedSongs" element={<FavoriteData />} />
              <Route path="/createPlaylist" element={<CreatePlaylist />} />
              <Route path="/createPlaylist/:pId" element={<AddSongs2Playlist />} />
              <Route path="/albumSongs/:pId" element={< Songs2album />} />
              <Route path="/playlistSongs/:pId" element={< Songs2playlist />} />
            </Routes>
          </Box>
        </Box>      </AuthContextProvider>

    </Router>


  );
}

export default App;