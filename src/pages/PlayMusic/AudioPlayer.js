import { useRef, useState } from 'react';
//import { tracks } from '../songs/tracks';
import axios from "axios";
import React, {  useEffect } from 'react';
// import components
import DisplayTrack from './DisplayTrack';
import Controls from './controls';
import ProgressBar from './ProgressBar';
import { loadSong } from './SongLoader';
import songy from "../songs/song.mp3"
import song2 from "../songs/Lose Control.mp3"



const AudioPlayer = () => {


  const [tracks, setTracks] = useState([]);
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

 
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3600/api/songs');
        const data = response.data;

        // Transform the API response into the desired structure
        const formattedTracks = await Promise.all(data.map(async (song, index) => {
          const songSrc = await loadSong(song.path);

          return {
            title: song.songName,
            src: songSrc || '', // Use the dynamically loaded song
            date: song.dateReleased,
          };
        }));

        setTracks(formattedTracks);
        if (currentTrack === null) {
          // Set the current track only if it's initially null
          setCurrentTrack(formattedTracks[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [currentTrack]);

  console.log(tracks);
  console.log(currentTrack);
  // reference
  const audioRef = useRef();
  const progressBarRef = useRef();


  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  };

  return (
    <>
      
      <div className="audio-player">
        <div className="inner">
          <DisplayTrack
            {...{
              currentTrack,
              audioRef,
              setDuration,
              progressBarRef,
              handleNext,
            }}
          />
          <Controls
            {...{
              audioRef,
              progressBarRef,
              duration,
              setTimeProgress,
              tracks,
              trackIndex,
              setTrackIndex,
              setCurrentTrack,
              handleNext,
            }}
          />
          <ProgressBar
            {...{ progressBarRef, audioRef, timeProgress, duration }}
          />
        </div>
      </div>
    </>
  );
};
export default AudioPlayer;