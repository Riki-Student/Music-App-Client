import { BsMusicNoteBeamed } from 'react-icons/bs';
const DisplayTrack = ({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
  handleNext,
}) => {
  if (!currentTrack || !currentTrack.src) {
    // Check currentTrack and its src property
    return null; // Return null when currentTrack or currentTrack.src is undefined
  }
console.log(audioRef);
console.log(currentTrack.src);

  const onLoadedMetadata = () => {
    console.log("hhheerrrr");
    console.log(audioRef.current.duration);
    console.log(audioRef.current.src);
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
            <img src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG_TB1R7WQQj3k8YOcqQ9zKnPYKfQyPMnj2w&usqp=CAU`} alt="audio avatar" />
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