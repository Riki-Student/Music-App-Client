import * as React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import TextField from "@mui/material/TextField";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import IconButton from '@mui/material/IconButton';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';


function FavoriteData(props) {

    const [favorites, setfavorites] = useState([]);


    const deleteLikedSong = (songID) => {

        const Delete = async () => {
            try {
                await axios.delete('http://localhost:3600/api/likedsongs', {
                    data: { ls_songs_songID: songID },
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
                });
                setfavorites(favorites.filter((song) => song.song.songID !== songID));

            } catch (error) {
                console.log(error);
            }
        };
        Delete();

    }

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
                
        }
        async function fetchData() {
            const { data } = await axios.get(`http://localhost:3600/api/likedsongs`, config);
            setfavorites(data);

        }
        fetchData();
    }, []);



    return (<>

        <React.Fragment>
            {favorites.map((song, i) => (
                <>
                    <Card style={{
                        display: 'block', minWidth: 100, maxWidth: 300, margin: "20px", width: '100%'
                    }}
                        sx={{ maxWidth: 250 }} >
                        <CardActionArea key={i}>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2CQDBSm5MNncKaq8SQQEal_Z51qlQ93bvkQ&usqp=CAU"
                                alt="green iguana"
                            />
                            <CardContent key={i}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {song.song.songName}
                                </Typography>

                            </CardContent>
                            <IconButton onClick={() => deleteLikedSong(song.song.songID)}>
                                <FavoriteOutlinedIcon />
                            </IconButton>
                        </CardActionArea>

                    </Card>
                </>

            ))}

        </React.Fragment>
    </>)
}

export default FavoriteData