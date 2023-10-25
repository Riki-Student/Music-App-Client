import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from "react";
import PlaylistDesign from "../playlistDesign/playlistDesign"
import Carousel from './carousel';
import BasicDemo from './carusal2'
import Divider from '@mui/material/Divider';
import B from '../login/pop'
import Button from '@mui/material/Button';
import VideoBackground from '../VideoBackground/background';
import { Margin } from '@mui/icons-material';
import { useContext } from 'react';
import { AudioContext } from '../../context/audioContext';
const drawerWidth = 240;

export default function Home(props) {
  // const { audioRef,currentTrack ,setCurrentTrack} =  useContext(AudioContext);
  console.log(props.currentTrack);
  return (<div
    // style={{
    //   maxWidth: 900,
    //   marginLeft: "auto",
    //   marginRight: "auto",
    //   marginTop: 100
    // }}
  >
{/* <VideoBackground ></VideoBackground> */}
<h1>Vibeat</h1>
<h2>Want to listen to music that matches your current mood?</h2>
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
<Button href={`emotionDetection`} variant="text"><b>😢🥴! Press Here !😉😐</b></Button>
</div>
<div>
    <h4>New Relieased</h4>
    </div>
    <Divider variant="middle" /><br></br>
    <BasicDemo currentTrack={props.currentTrack} setCurrentSong={props.setCurrentSong}></BasicDemo><br></br><br></br>
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