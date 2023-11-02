import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: 'user',
};

const EmotionDetection = () => {
    const [picture, setPicture] = useState('');
    const [result, setResult] = useState('');
    const [songs, setSongs] = useState('');
    const webcamRef = React.useRef(null);
    const results = { 'angry': 1, 'fear': 2, 'happy': 3, 'sad': 4, 'surprise': 5, 'neutral': 6 }


    const capture = React.useCallback(async () => {
        const pictureSrc = webcamRef.current.getScreenshot();
        setPicture(pictureSrc)

        try {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },

            }

            const response = await axios.post('http://127.0.0.1:8000/aa', { path: pictureSrc }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Image sent to server.');
            console.log(response.data);
            setResult(response.data)
            // Directly use the result value in the next axios.post call
            const res = await axios.post(`http://localhost:3600/api/mood2genres`, { mood_moodID: results[response.data] }, config);
            setSongs(res.data);
            console.log(songs);
        } catch (error) {
            console.error('Error sending image to server:', error);
        }
    });

    // useEffect(() => {
    //     async function fetchData() {
    //         const config = {
    //             headers: {
    //                 'Authorization': 'Bearer ' + localStorage.getItem("token")
    //             },

    //         }

    //         try {

    //             console.log(results[result]);
    //             const res=await axios.post(`http://localhost:3600/api/mood2genres`,{mood_moodID:results[result]} ,config);
    //             setSongs(res.data);
    //             console.log(res.data);
    //             console.log(songs);
    //         } catch (error) {
    //             // Handle any errors here
    //             console.error("Error fetch songs:", error);
    //         }
    //     }

    //     fetchData(); // Call the fetchData function here
    // }, [result]);

    return (

        <div className="container">
            <h2 className="text-center">React Photo Capture using Webcam Example</h2>
            <div className="webcam-container">
                {picture === '' ? (
                    <Webcam
                        audio={false}
                        style={{ width: '400px', height: '400px' }}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                    />
                ) : (
                    <img src={picture} alt="Captured Image" />
                )}
                <div className="button-container">
                    {picture !== '' ? (
                        <button
                            onClick={() => setPicture('')}
                            className="btn btn-primary"
                        >
                            Retake
                        </button>
                    ) : (
                        <button
                            onClick={capture}
                            className="btn btn-danger"
                        >
                            Take a Selfy
                        </button>
                    )}
                    <h2>Emotion Result:{result}</h2>
                    {songs?
                    songs.map((song, i) => (
                        <>
                            <Card style={{
                                display: 'block', minWidth: 100, maxWidth: 300, margin: "1%", width: '100%'
                            }}
                                sx={{ maxWidth: 250 }} >
                                <CardActionArea key={i}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image="https://media.istockphoto.com/id/1287065554/photo/sound-wave.jpg?b=1&s=612x612&w=0&k=20&c=Qbk-qBg1-MueQrxyI1QlNM8SaXsYTv5wS5o46dSqAZU="
                                        alt="green iguana"
                                    />
                                    <CardContent key={i}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {song.songName}
                                        </Typography>

                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </>

                    )):<></>}
                </div>
            </div>
        </div>

    );
};

export default EmotionDetection;
