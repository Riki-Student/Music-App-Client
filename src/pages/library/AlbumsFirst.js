
import Button from '@mui/material/Button';
import AlbumsData from "./AlbumsData";
import Searchalbums from "./searchalbums";
import React, { useState } from "react";
import BasicDemo from '.';

export default function AlbumsFirst({setChange}) {
 
  

    return (
        <>
            <div>
                <h1>Follow your first album</h1><br></br>
                <h2>save albums by tapping the heart icon</h2>
           
                <Button variant="contained" onClick={()=>{setChange(true)}}>Find albums</Button><br></br>
                    {/*  */}
                
             </div>

        </>
    );



}

