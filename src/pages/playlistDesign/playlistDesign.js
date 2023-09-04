import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';
// import { Carousel } from 'react-responsive-carousel';
export default function PlaylistDesign() {
    
const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    
    <Card sx={{ maxWidth: 250 }} >
        
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2CQDBSm5MNncKaq8SQQEal_Z51qlQ93bvkQ&usqp=CAU"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Playlist#1
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
   
  );

}





