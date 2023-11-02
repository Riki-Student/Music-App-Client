import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Carousel } from 'primereact/carousel';
import axios from "axios";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import IconButton from '@mui/material/IconButton';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import {Controls} from "../PlayMusic/controls"
import { PauseCircle, PhotoSizeSelectLargeTwoTone } from '@mui/icons-material';
import { useContext } from 'react';
import { AudioContext } from '../../context/audioContext';
import Divider from '@mui/material/Divider';
import { loadSong } from '../PlayMusic/SongLoader';

//import VideoBackground from '../VideoBackground/background';
//
// import { ProductService } from './service/ProductService';
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";  

const cardMediaStyle = {
    backgroundImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSne2wxd5aBNAjEOxU3u3EECUKhY-DeIIKvX8vZqLtsnn86jbtom52dtBiTOTJe6wiousg&usqp=CAU',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '100%', // Adjust the height to your preference
    width:'100%'
  };



export default function SleepySongs(props) {
console.log("here");
    const [sleepySongs, setSleepySongs] = useState([]);
    const [popSongsComponent, setPopSongsComponent]=useState("")
    
    
    const responsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '1096',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 1,
            numScroll: 1
        },
        // {
        //     breakpoint: '767px',
        //     numVisible: 1,
        //     numScroll: 1
        // }
    ];


    // useEffect(() => {
    //     ProductService.getProductsSmall().then((data) => setProducts(data.slice(0, 9)));
    // }, []);

    

    useEffect(() => {
        
        async function fetchData2() {

            const  response = await axios.post(`http://localhost:3600/api/songs/genres`,{genreID:7});
            // ((data)=>setsongs(data.slice(0,9)));
            setSleepySongs(response.data);
        }
        fetchData2()
       
    }, []);

    
    const handleClick = async (song) => {
        console.log("nnnn");
        const songSrc = await loadSong(song.path);
        props.setCurrentTrack({"title":song.songName,
        "src":songSrc
    })
    console.log(props.currentTrack);
    
    props.setIsPlaying(true)
    // console.log(props.isPlaying);
      };

      const handleClickPause = async (song) => {
        console.log("bbbbb");

    props.setIsPlaying(false)
    // console.log(props.isPlaying);
      };
    

    const productTemplate = (song,i) => {
        return (
            
            <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                {song.songName}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                {song.duration}
                </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                
                <IconButton aria-label="play/pause">
                    {/* onClick={handleClick}  */}
                    {props.isPlaying && song.songName===props.currentTrack.title?(
                    <PauseIcon onClick={()=>{handleClickPause(song)}} key={i} sx={{ height: 38, width: 38 }} />):(
                <PlayArrowIcon onClick={() => { handleClick(song) }} key={i} sx={{ height: 38, width: 38 }} />)
                }
                </IconButton>
            
            </Box>
            </Box>
            <CardMedia
            component="img"
            sx={cardMediaStyle}
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSkmCMEhcmF5XwpPozOJWo6kfXRtabwTuXIw&usqp=CAU"
            alt="Live from space album cover"
            />
            </Card>
        );
    };

    

    return (
        <>
        <h4>Sleepy Songs</h4>
    <Divider variant="middle" /><br></br>
        <div className="card" >
            <div className='imghome' >
            <Carousel value={sleepySongs} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} />
        </div>
        </div>
        {/* <div className="home-page">
                <VideoBackground />
              </div> */}
        
        </>
    )
}






// export default function MediaControlCard() {

//   return (
//     <Card sx={{ display: 'flex' }}>
//       <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//         <CardContent sx={{ flex: '1 0 auto' }}>
//           <Typography component="div" variant="h5">
//             Live From Space
//           </Typography>
//           <Typography variant="subtitle1" color="text.secondary" component="div">
//             Mac Miller
//           </Typography>
//         </CardContent>
//         <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          
//           <IconButton aria-label="play/pause">
//             <PlayArrowIcon sx={{ height: 38, width: 38 }} />
//           </IconButton>
         
//         </Box>
//       </Box>
//       <CardMedia
//         component="img"
//         sx={{ width: 151 }}
//         image="/static/images/cards/live-from-space.jpg"
//         alt="Live from space album cover"
//       />
//     </Card>
//   );
// }
