const AudioSong = ({song})=>{
    return (
<audio src={`http://localhost:3600/songs/${song.path}`} />
    )
}
export default AudioSong