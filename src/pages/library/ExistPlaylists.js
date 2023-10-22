
import * as React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Searchalbums from './searchalbums';
import { useNavigate} from 'react-router-dom';


export default function ExistPlaylists(props) {

    const {existplaylists, setExistplaylists} = props;

    const navigate = useNavigate()

    const deletePlaylist = (event,playlistID) => {
        event.stopPropagation();
        console.log(playlistID);
        const Delete = async () => {
            try {
        //              const config = {
        //     headers: {
        //         Authorization: 'Bearer ' + localStorage.getItem('token')
        //     }
        // };

        // const response = await axios.get(`http://localhost:3600/api/playlists/allSongsInPlaylist`, config);
        // const songsToDelete = response.data;

        // // Delete the songs from local storage
        // songsToDelete.forEach((song) => {
        //     const storedSongs = JSON.parse(localStorage.getItem('songs')) || [];
        //     const updatedSongs = storedSongs.filter((storedSong) => storedSong.songID !== song.songID);
        //     localStorage.setItem('songs', JSON.stringify(updatedSongs));
        // });
                await axios.delete(`http://localhost:3600/api/playlists/${playlistID}`, {
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
                });

                setExistplaylists(existplaylists.filter((playlist) => playlist.playlistsID !== playlistID));
                // setfavorites(favorites.filter((song) => song.song.songID !== songID));

            } catch (error) {
                console.log(error);
            }
        };
        Delete();

    }



    const display=(playlistID)=>{
        
        navigate(`/playlistSongs/${playlistID}`)
    }


    return (
        <>
<React.Fragment>
            {existplaylists.map((existplaylist, i) => (
                <>
                    <Card onClick={()=>{display(existplaylist.playlistsID)}} style={{
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
                                    {existplaylist.playlistTitle}
                                </Typography>
                            </CardContent>
                            <IconButton onClick={(event) => deletePlaylist(event,existplaylist.playlistsID)}>
                            
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                        </CardActionArea>
                        
                    </Card>
                </>

            ))}
        </React.Fragment>
        </>
    );
}