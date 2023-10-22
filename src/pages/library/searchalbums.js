import * as React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Songs2album from './songs2album';
import  Try  from './Albums';
import Display from './DisplayLikedAlbums';
import { Link } from 'react-router-dom';

function Searchalbums(props) {

    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
      //convert input text to lower case
      var lowerCase = e.target.value.toLowerCase();
      setInputText(lowerCase);
    };


    return (<>
        <React.Fragment>
          <Display/>
        <div className="search">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search any Albums"
        />
        
      </div>
      {/* <AlbumsData input={inputText} /> */}
      {/* <Songs2album input={inputText}></Songs2album> */}

      <Try input={inputText}></Try>
      
        </React.Fragment>
    </>)

    // const [search, setSearch]=useState()
    // return <><input search></input>
    // <Results search={search}/></>
}
export default Searchalbums