import React from "react";
import Button from '@mui/material/Button';

export default function ArtistsFirst({setArtistChange}){

    return(
        <div>
            <h1>Follow your first artist</h1><br></br>
            <h2>follow artists you like by tapping the follow button.</h2>
            <Button variant="contained" onClick={()=>{setArtistChange(true)}}>Find artist</Button><br></br>
        </div>
        );



    
}