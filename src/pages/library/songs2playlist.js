import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { loadSong } from '../PlayMusic/SongLoader';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import IconButton from '@mui/material/IconButton';


function Songs2playlist(props) {

    const { pId } = useParams()
    const [songsOfPlaylist, setSongsOfPlaylist] = useState([]);


    useEffect(() => {


        async function fetchData() {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },
            }
            const { data } = await axios.get(`http://localhost:3600/api/playlists/${pId}`, config);
            setSongsOfPlaylist(data.songs);         


        }
        fetchData();
    }, []);


    const timeBodyTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <span>{rowData.songs.duration}</span>
            </div>
        );
    };

    const nameBodyTemplate = (rowData) => {

        return (
            <div className="flex align-items-center gap-2">
                <span>{rowData.songs.songName}</span>
            </div>
        );
    };

    const picBodyTemplate = (rowData) => {
        const url = `${rowData.songs.image}`;
        return (
            <div className="flex align-items-center gap-2">
                <img
                    alt="picture"
                    src={require(`../images/${url}.jpeg`)}
                    //   className={`flag flag-${rowData.country.code}`}
                    style={{ width: '50%' }}
                />
            </div>
        );
    };

    const rateBodyTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <Rating value={rowData.songs.rating} readOnly cancel={false} />
            </div>
        );
    };

    const handleClick = async (song) => {
        console.log("nnnn");
        const songSrc = await loadSong(song.path);
        props.setCurrentTrack({
            "title": song.songName,
            "src": songSrc,
            "Image":song.image
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

    const playIconBodyTemplate = (rowData) => {


        return (
            <IconButton aria-label="play/pause">
                    {/* onClick={handleClick}  */}
                    {props.isPlaying && rowData.songs.songName===props.currentTrack.title?(
                    <PauseCircleOutlineIcon onClick={()=>{handleClickPause(rowData.songs)}} sx={{ height: 38, width: 38 }} />):(
                <PlayCircleOutlineIcon onClick={() => { handleClick(rowData.songs) }} sx={{ height: 38, width: 38 }} />)
                }
                </IconButton>
        );
    };
    return (
        <div className="card">
            <DataTable
                value={songsOfPlaylist}
                rows={10}
                dataKey="id"
                emptyMessage=""
            >
                <Column
                    style={{ minWidth: '15rem' }}
                    body={picBodyTemplate}
                />
                <Column
                    style={{ minWidth: '5rem' }} // Adjust the width as needed
                    body={playIconBodyTemplate}
                />

                <Column
                    style={{ minWidth: '15rem' }}
                    body={nameBodyTemplate}
                />
                <Column
                    style={{ minWidth: '20rem' }}
                    body={timeBodyTemplate}
                />
                <Column
                    style={{ minWidth: '20rem' }}
                    body={rateBodyTemplate}
                />

            </DataTable>
        </div>
    );


}

export default Songs2playlist