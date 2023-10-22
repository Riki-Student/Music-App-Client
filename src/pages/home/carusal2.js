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
import {Controls} from "../PlayMusic/controls"
import { PauseCircle } from '@mui/icons-material';
import { useContext } from 'react';
import { AudioContext } from '../../context/audioContext';


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
    backgroundImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG_TB1R7WQQj3k8YOcqQ9zKnPYKfQyPMnj2w&usqp=CAU',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '100%', // Adjust the height to your preference
    width:'100%'
  };



export default function BasicDemo(props) {
    const [songs, setsongs] = useState([]);
    const[change,setChange]=useState(false)
    // const { audioRef,currentTrack ,setCurrentTrack} =  useContext(AudioContext);
    // const { togglePlayPause } = Controls;
     console.log(props.currentTrack); 
   
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

        async function fetchData() {
            
console.log("useEffect");
            const { data } = await axios.get(`http://localhost:3600/api/songs`);
            // ((data)=>setsongs(data.slice(0,9)));
            setsongs(data);
        }
        fetchData();
        
       
    }, []);
    
    // const handleClick = () => {
    //     togglePlayPause();
    //   };
    

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
                <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                </IconButton>
            
            </Box>
            </Box>
            <CardMedia
            component="img"
            sx={cardMediaStyle}
            image="https://media.istockphoto.com/id/1287065554/photo/sound-wave.jpg?b=1&s=612x612&w=0&k=20&c=Qbk-qBg1-MueQrxyI1QlNM8SaXsYTv5wS5o46dSqAZU="
            alt="Live from space album cover"
            />
            </Card>
        );
    };

    

    return (
        <>
        <div className="card" >
            <div className='imghome' >
            <Carousel value={songs} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} />
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

