import * as React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import ArtistsData from './ArtistsData';
function Searchartists(props) {

    const [inputTextA, setInputTextA] = useState("");
    let inputHandler = (e) => {
      //convert input text to lower case
      var lowerCase = e.target.value.toLowerCase();
      setInputTextA(lowerCase);
    };


    return (<>
        <React.Fragment>
        <div className="search">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search"
        />
        
      </div>
      <ArtistsData input={inputTextA} />
      {/* <Songs2album input={inputText}></Songs2album> */}
        </React.Fragment>
    </>)

    // const [search, setSearch]=useState()
    // return <><input search></input>
    // <Results search={search}/></>
}
export default Searchartists