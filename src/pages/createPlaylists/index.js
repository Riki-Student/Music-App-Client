import * as React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import TextField from "@mui/material/TextField";
import Popup from './popup';
import handleOpen from './popup'
import NewPlaylist from './createPlaylist';
import AddSongs2Playlist from './displaySongs2Playlist';
import SearchSongs from './SearchSongs';


function CreatePlaylist() {

    const [playlists, setplaylists] = useState([]);
    const [open, setOpen]=useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }                 
        }
        async function fetchData() {
            const { data } = await axios.get(`http://localhost:3600/api/playlists`, config);
            setplaylists(data);

        }
        fetchData();

    }, [playlists]);

    const display=(playlistID)=>{
        //setOpen(true);
        
        //localStorage.setItem('playlistID', JSON.stringify(playlistID));

        navigate(`/createPlaylist/${playlistID}`)
    }


// 
    return (<>
        <React.Fragment>
        {playlists.map((playlist, i) => (
                <>
                    <Card onClick={()=>{display(playlist.playlistsID)}} style={{
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
                                    {playlist.playlistTitle}
                                </Typography>
                            </CardContent>
                        </CardActionArea>

                    </Card>
                    {open&&<SearchSongs ></SearchSongs>}
                </>

            ))}
            <NewPlaylist />
        </React.Fragment>
    </>)

}
export default CreatePlaylist