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


export default function Artists(props){

    const [artists, setArtists] = useState([]);
    const {currentLikedArtists, setCurrentLikedArtists} = useContext(AuthContext)
   
    const navigate = useNavigate()
    const addArtist = async (artistID) => {
        // Check if the album is already in the liked albums
        if (currentLikedArtists.some((likedArtist) => likedArtist.artist.artistID === artistID)) {
            // Handle the case where the album is already liked (e.g., show a message)
            console.log("Artist is already liked.");
        } else {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }
    
            try {
                // Make a POST request to add the album to the liked albums list
                await axios.post(`http://localhost:3600/api/likedartists`, { "lar_artists_artistID": artistID }, config);
    
                // Fetch the updated list of liked albums and set it in your state
                const response = await axios.get('http://localhost:3600/api/likedartists', config);
                const updatedLikedArtists = response.data;
                setCurrentLikedArtists(updatedLikedArtists);
            } catch (error) {
                // Handle any errors here
                console.error("Error adding artist:", error);
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
            const { data } = await axios.get(`http://localhost:3600/api/artists`,config);
            setArtists(data);
        }
        fetchData();
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
    const display = (artistID) => {


        navigate(`/artistSongs/${artistID}`)
    }

    return (<>
        <React.Fragment>
            
            {filteredData.map((artist, i) => (
                <>
                    <Card  style={{
                        display: 'block', minWidth: 100, maxWidth: 300, margin: "20px", width: '100%'
                    }}
                        sx={{ maxWidth: 250 }} >
                        <CardActionArea onClick={() => { display(artist.artistID) }} key={i}>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://media.istockphoto.com/id/1287065554/photo/sound-wave.jpg?b=1&s=612x612&w=0&k=20&c=Qbk-qBg1-MueQrxyI1QlNM8SaXsYTv5wS5o46dSqAZU="
                                alt="green iguana"
                            />
                            <CardContent key={i}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {artist.artistName}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <IconButton>
                        <AddCircleOutlineIcon onClick={()=>addArtist(artist.artistID)}/>
                    </IconButton>
                    </Card>
                    
                </>

            ))}
        </React.Fragment>
     
    </>)
// return <h1>hiiii</h1>

}