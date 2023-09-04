
import * as React from 'react';
import axios from "axios";
import { useEffect, useState,useContext } from "react";
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Searchartists from './searchartists';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

export default function FavoriteArtists() {

    const { currentLikedArtists ,setCurrentLikedArtists} = useContext(AuthContext)

    const navigate = useNavigate()

    const deleteLikedArtist = (event, artistID) => {
        event.stopPropagation();
        const Delete = async () => {
            try {
                await axios.delete('http://localhost:3600/api/likedartists', {
                    data: { lar_artists_artistID: artistID },
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
                });

                setCurrentLikedArtists(currentLikedArtists.filter((artist) => artist.artist.artistID !== artistID));
                // setfavorites(favorites.filter((song) => song.song.songID !== songID));

            } catch (error) {
                console.log(error);
            }
        };

        Delete();

    }
    async function fetchData() {
        console.log("fetchi");
        const config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
        }
        const { data } = await axios.get(`http://localhost:3600/api/likedartists`, config);
        setCurrentLikedArtists(data);

    }


    useEffect(() => {

        fetchData();

    }, []);

    const display = (artistID) => {

        navigate(`/artistSongs/${artistID}`)
    }

    // if (likedalbums.length === 0) {
    //     return null;
    // }
    return (
        <>
            <React.Fragment>
                {currentLikedArtists.map((likedartists, i) => (
                    <>
                        <Card onClick={() => { display(likedartists.artist.artistID) }} style={{
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
                                        {likedartists.artist.artistName}
                                    </Typography>
                                </CardContent>
                                <IconButton onClick={(event) => deleteLikedArtist(event, likedartists.artist.artistID)}>

                                    <RemoveCircleOutlineIcon />
                                </IconButton>
                            </CardActionArea>

                        </Card>
                    </>

                ))}
                <Searchartists></Searchartists>
            </React.Fragment>
        </>
    );
}