import { BsMusicNoteBeamed } from 'react-icons/bs';
import { AudioContext } from '../../context/audioContext';
import React, { useState, useEffect ,useContext} from 'react';
const DisplayTrack = ({
  currentTrack,
  setDuration,
  progressBarRef,
  handleNext,
}) => {
  const { audioRef } =  useContext(AudioContext);
  if (!currentTrack || !currentTrack.src) {
    // Check currentTrack and its src property
    return null; // Return null when currentTrack or currentTrack.src is undefined
  }
  
  const onLoadedMetadata = () => {
    
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };


  return (
    <div>
      <audio
        src={currentTrack.src}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
      />
      <div className="audio-info">
        <div className="audio-image">
          {currentTrack ? (
            <img src={`https://media.istockphoto.com/id/1287065554/photo/sound-wave.jpg?b=1&s=612x612&w=0&k=20&c=Qbk-qBg1-MueQrxyI1QlNM8SaXsYTv5wS5o46dSqAZU=`} alt="audio avatar" />
          ) : (
            <div className="icon-wrapper">
              <span className="audio-icon">
                <BsMusicNoteBeamed />
              </span>
            </div>
          )}
        </div>
        <div className="text">
          <p className="title">{currentTrack.title}</p>
          <p>{currentTrack.date}</p>
        </div>
      </div>
    </div>
  );
};
export default DisplayTrack;