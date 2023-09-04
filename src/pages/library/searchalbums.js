import * as React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import AlbumsData from './AlbumsData';
import Songs2album from './songs2album';
function Searchalbums(props) {

    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
      //convert input text to lower case
      var lowerCase = e.target.value.toLowerCase();
      setInputText(lowerCase);
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
      <AlbumsData input={inputText} />
      {/* <Songs2album input={inputText}></Songs2album> */}
        </React.Fragment>
    </>)

    // const [search, setSearch]=useState()
    // return <><input search></input>
    // <Results search={search}/></>
}
export default Searchalbums