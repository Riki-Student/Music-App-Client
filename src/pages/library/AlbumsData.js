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


function AlbumsData(props) {

    const [albums, setalbums] = useState([]);
    //const [isliked, setIsliked] = useState([]);
    const { currentLikedAlbums ,setCurrentLikedAlbums} = useContext(AuthContext)

    const addLikedAlbum = (albumID) => {
       
        for (let i = 0; i < currentLikedAlbums.length; i++) {
            console.log("in loop");
            if (currentLikedAlbums[i].album.albumID === albumID)
                return;
        }
        const config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }

        }
        const Create = async () => {
            await axios.post(`http://localhost:3600/api/likedalbums`, { "lal_albums_albumID": albumID }, config);

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
        const { data } = await axios.get(`http://localhost:3600/api/likedalbums`, config);
        setCurrentLikedAlbums(data);
        // setIsliked(likedalbums.filter((album) => album.album.albumID !== albumID));
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
console.log("||||||||||||||||||||||||||||||||||||||||||||||||||");
        }
        fetchData();
        fetchData2();
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




    return (<>

        <React.Fragment>
            {filteredData.map((album, i) => (
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
                                    {album.albumTitle}
                                </Typography>
                            </CardContent>
                        </CardActionArea>

                        <IconButton onClick={() => { addLikedAlbum(album.albumID) }}>
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </Card>
                </>

            ))}

        </React.Fragment>
    </>)
}

export default AlbumsData