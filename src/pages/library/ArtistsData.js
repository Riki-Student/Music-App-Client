import * as React from 'react';
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import TextField from "@mui/material/TextField";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';


function ArtistsData(props) {

    const [artists, setArtists] = useState([]);
    //const [isliked, setIsliked] = useState([]);
    const { currentLikedArtists, setCurrentLikedArtists } = useContext(AuthContext)

    const addLikedArtist = (artistID) => {
console.log("add");
        for (let i = 0; i < currentLikedArtists.length; i++) {
            console.log("in add artist loop");
            if (currentLikedArtists[i].artist.artistID === artistID)
                return;
        }
        const config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }

        }
        const Create = async () => {
            await axios.post(`http://localhost:3600/api/likedartists`, { "lar_artists_artistID": artistID }, config);

        }
        Create();
        fetchData2()

    }


    async function fetchData2() {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
        }
        const { data } = await axios.get(`http://localhost:3600/api/likedartists`, config);
        setCurrentLikedArtists(data);
        // setIsliked(likedalbums.filter((album) => album.album.albumID !== albumID));
    }

    useEffect(() => {
console.log("useEffect");
        async function fetchData() {
            const { data } = await axios.get(`http://localhost:3600/api/artists`);
            setArtists(data);
            console.log("--------------------------------------------------------------------------------------------------------------------------------------");
            console.log(data)
        }

        fetchData();
        fetchData2();
    }, []);


    const filteredData = artists.filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.artistName.toLowerCase().includes(props.input)
        }
    })




    return (<>

        <React.Fragment>
            {filteredData.map((artist, i) => (
                <>
                    <Card style={{
                        display: 'block', minWidth: 100, maxWidth: 300, margin: "20px", width: '100%'
                    }}
                        sx={{ maxWidth: 250 }} >
                        <CardActionArea key={i}>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0sahCroTou8Ixr5e-3nTF4P6FgW72fKlp4g&usqp=CAU"
                                alt="green iguana"
                            />
                            <CardContent key={i}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {artist.artistName}
                                </Typography>
                            </CardContent>
                        </CardActionArea>

                        <IconButton onClick={() => { addLikedArtist(artist.artistID) }}>
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </Card>
                </>

            ))}

        </React.Fragment>
    </>)
}

export default ArtistsData