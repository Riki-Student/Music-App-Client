import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import MusicNote from '@mui/icons-material/MusicNote';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import LibraryMusic from '@mui/icons-material/LibraryMusic';
import SearchIcon from '@mui/icons-material/Search';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popup from 'reactjs-popup';
import Login from "../login/Login";
import Home from '../home/Home';
import TransitionsModal from "../login/pop"
import axios from "axios";


const drawerWidth = 240;
function ResponsiveDrawer(props) {


  
  const { window, mobileOpen,handleDrawerToggle } = props;


  const drawer = (
    <Box>
      <Toolbar />
      <Divider />
      <List>
        {['Home', 'Search', 'Your Library'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton  href={`/${text.replace(/ /g, '')}`}>
              <ListItemIcon >
                {index === 0 ? <HomeIcon /> : index === 1 ? <SearchIcon /> : <LibraryMusic />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Create Playlist', 'Liked Songs'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton href={`/${text.replace(/ /g, '')}`}>
              <ListItemIcon>
                {index === 0 ? <AddIcon /> : <FavoriteIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (<>
  <Box position="fixed" >
{/* 
  <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer+1}}>
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
          
      
         </Toolbar>
      </AppBar>  */}
    {/* <Box position="fixed" sx={{ display: 'flex', height:"100vh" }}> */}
      <CssBaseline />
      
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer PaperProps={{
          style: {
            position: "static"
          }
        }}
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            flexGrow:1,
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            height:"100vh",

            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    
    </Box ></>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};



export default ResponsiveDrawer;























