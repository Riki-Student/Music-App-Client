import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from "react";
import PlaylistDesign from "../playlistDesign/playlistDesign"
import Carousel from './carousel';
import BasicDemo from './carusal2'
import Divider from '@mui/material/Divider';
import B from '../login/pop'
const drawerWidth = 240;

export default function Home() {
  return (<div
    style={{
      maxWidth: 900,
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: 100
    }}
  >

<h1>Welcome to Vibeat!!</h1>
    <h2>New Relieased</h2>
    <Divider variant="middle" /><br></br>
    <BasicDemo></BasicDemo><br></br><br></br>
   
    {/* <Carousel show={4}>
        
      <div>
        <div style={{ padding: 8 }}>
        <PlaylistDesign></PlaylistDesign>
        </div>
      </div>
      <div>
        <div style={{ padding: 8 }}>
        <PlaylistDesign></PlaylistDesign>
        </div>
      </div>
      <div>
        <div style={{ padding: 8 }}>
        <PlaylistDesign></PlaylistDesign>
        </div>
      </div>
      <div>
        <div style={{ padding: 8 }}>
        <PlaylistDesign></PlaylistDesign>
        </div>
      </div>
      <div>
        <div style={{ padding: 8 }}>
        <PlaylistDesign></PlaylistDesign>
        </div>
      </div>
      <div>
        <div style={{ padding: 8 }}>
        <PlaylistDesign></PlaylistDesign>
        </div>
      </div>
      <div>
        <div style={{ padding: 8 }}>
        <PlaylistDesign></PlaylistDesign>
        </div>
      </div>
      <div>
        <div style={{ padding: 8 }}>
        <PlaylistDesign></PlaylistDesign>
        </div>
      </div>
    </Carousel> */}
  </div>
  );
}