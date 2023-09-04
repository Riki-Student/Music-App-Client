import * as React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";


function NewPlaylist() {

    const [title, setTitle] = useState("");
        const CreatePlaylist=() => {
             const config = {
                headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            
        }            
 
         const Create  =async() =>{
            await axios.post(`http://localhost:3600/api/playlists`,   {  "playlistTitle":title }  , config);  

        }
         Create();

    };






    return (<>
        <React.Fragment>
            <div>
                <h2>choose name for your playlist</h2>
                <TextField onChange={(e) => setTitle(e.target.value)}></TextField>
                <button onClick={CreatePlaylist}>create playlist</button>
            </div>
        </React.Fragment>
    </>)

}
export default NewPlaylist