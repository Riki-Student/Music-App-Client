import * as React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import AddSongs2Playlist from './displaySongs2Playlist';

function SearchSongs() {
 

    return (<>
        <React.Fragment>
          <div className='searchbox'>
        <div className="search">       
      </div>
      </div>
      <AddSongs2Playlist />
        </React.Fragment>
    </>)
}
export default SearchSongs


