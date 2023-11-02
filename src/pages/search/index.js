
import * as React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import List from './list';
import TemplateDemo from './grid';

function Search(props) {
    return (<>
        <React.Fragment>
          <div className='searchbox'>
        <div className="search">
        {/* <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search"
        /> */}
        
      </div>
      </div>
      <TemplateDemo  currentTrack={props.currentTrack} setCurrentTrack={props.setCurrentTrack} setIsPlaying={props.setIsPlaying} isPlaying={props.isPlaying}/>
        </React.Fragment>
    </>)

    // const [search, setSearch]=useState()
    // return <><input search></input>
    // <Results search={search}/></>
}
export default Search


