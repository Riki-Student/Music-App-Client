import React from "react";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";



export default function PlaylistsDefault(){


    const navigate = useNavigate()
    const create=(playlistID)=>{
        navigate(`/createPlaylist`)
    }
return(
<div>
    <h1>Create your first playlist</h1><br></br>
    <h2>it's easy we'll help you.</h2>
    <Button onClick={create} variant="contained">Create playlist</Button><br></br>
</div>
);


}