import * as React from 'react';
import axios from "axios";
import { useEffect, useState,useContext } from "react";
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


export default function Albums(props){

    const [albums, setalbums] = useState([]);
    const { currentLikedAlbums ,setCurrentLikedAlbums} = useContext(AuthContext)
    const navigate = useNavigate()
    const addAlbum = async (albumID) => {
        // Check if the album is already in the liked albums
        if (currentLikedAlbums.some((likedAlbum) => likedAlbum.album.albumID === albumID)) {
            // Handle the case where the album is already liked (e.g., show a message)
            console.log("Album is already liked.");
        } else {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }
    
            try {
                // Make a POST request to add the album to the liked albums list
                await axios.post(`http://localhost:3600/api/likedalbums`, { "lal_albums_albumID": albumID }, config);
    
                // Fetch the updated list of liked albums and set it in your state
                const response = await axios.get('http://localhost:3600/api/likedalbums', config);
                const updatedLikedAlbums = response.data;
                setCurrentLikedAlbums(updatedLikedAlbums);
            } catch (error) {
                // Handle any errors here
                console.error("Error adding album:", error);
            }
        }
    }
    
    useEffect(() => {

        async function fetchData() {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },
            }
            const { data } = await axios.get(`http://localhost:3600/api/albums`,config);
            setalbums(data);
        }
        fetchData();
    }, []);


    const filteredData = albums.filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.albumTitle.toLowerCase().includes(props.input)
        }
    })
    const display = (albumID) => {

        navigate(`/albumSongs/${albumID}`)
    }

    return (<>
        <React.Fragment>
            
            {filteredData.map((album, i) => (
                <>
                    <Card  style={{
                        display: 'block', minWidth: 100, maxWidth: 300, margin: "20px", width: '100%'
                    }}
                        sx={{ maxWidth: 250 }} >
                        <CardActionArea onClick={() => { display(album.albumID) }} key={i}>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://media.istockphoto.com/id/1287065554/photo/sound-wave.jpg?b=1&s=612x612&w=0&k=20&c=Qbk-qBg1-MueQrxyI1QlNM8SaXsYTv5wS5o46dSqAZU="
                                alt="green iguana"
                            />
                            <CardContent key={i}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {album.albumTitle}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <IconButton>
                        <AddCircleOutlineIcon onClick={()=>addAlbum(album.albumID)}/>
                    </IconButton>
                    </Card>
                    
                </>

            ))}
        </React.Fragment>
     
    </>)
// return <h1>hiiii</h1>



}