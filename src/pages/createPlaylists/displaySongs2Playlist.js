import React, { useState, useEffect, useContext } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Rating } from 'primereact/rating';
import IconButton from '@mui/material/IconButton';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import AddCircle from '@mui/icons-material/AddCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';


import axios from "axios";
import { useParams } from 'react-router-dom';
import AudioSong from '../../components/AudioSong';
import { Button } from '@mui/material';
import { AuthContext } from '../../context/authContext';
import { Article,  Audiotrack   ,AudioFile } from '@mui/icons-material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import { loadSong } from '../PlayMusic/SongLoader';

export default function AddSongs2Playlist(props) {
    const [songs, setsongs] = useState([]);
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [songs2playlist, setSongs2playlist] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const { setCurrentSong } = useContext(AuthContext)
    const [addedSongs, setAddedSongs] = useState({});

    const { pId } = useParams()
    const addSongToPlaylist = (songID) => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }


        const Create = async () => {
            await axios.post(`http://localhost:3600/api/playlists/add`, { "p_songs_songID": songID, "p_playlists_playlistID": pId }, config);

        }
        Create();
        setSongs2playlist([...songs2playlist, songID]);

        const updatedSongs = [...(addedSongs[pId] || []), songID];
        setAddedSongs({ ...addedSongs, [pId]: updatedSongs });

        // Save the updated added songs to local storage for the specific playlist
        const playlistSongsKey = `playlist_${pId}_songs`;
        localStorage.setItem(playlistSongsKey, JSON.stringify(updatedSongs));
        // localStorage.setItem('addedSongs', JSON.stringify([...songs2playlist, songID]));
    }

    const removeSongFromPlaylist = (songID) => {
        console.log("in removeSongFromPlaylist");

        const Delete = async () => {
            await axios.delete('http://localhost:3600/api/playlists/remove', {
                data: { "p_playlists_playlistID":pId,"p_songs_songID": songID },
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            });

        }
        Delete();

        // Remove the song from the state
        const updatedSongs1 = songs2playlist.filter(id => id !== songID);
        setSongs2playlist(updatedSongs1);

        const updatedSongs = (addedSongs[pId] || []).filter(id => id !== songID);
        setAddedSongs({ ...addedSongs, [pId]: updatedSongs });

        // Save the updated added songs to local storage for the specific playlist
        const playlistSongsKey = `playlist_${pId}_songs`;
        localStorage.setItem(playlistSongsKey, JSON.stringify(updatedSongs));

        
        // Save the updated added songs to local storage
        // localStorage.setItem('removedSongs', JSON.stringify(updatedSongs));
    }

    useEffect(() => {

        async function fetchData() {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }
            const { data } = await axios.get(`http://localhost:3600/api/songs`, config);
            setsongs(data.slice(0, 12));
            setLoading(false);

        }
        fetchData();
        initFilters();
        const config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
        }

        async function fetchData2() {
            const { data } = await axios.get(`http://localhost:3600/api/playlists/allSongsInPlaylist`, config);
            setPlaylists(data);

        }
        fetchData2();
        // const addedSongsFromLocalStorage = JSON.parse(localStorage.getItem('addedSongs')) || [];
        // setSongs2playlist(addedSongsFromLocalStorage);
        const playlistSongsKey = `playlist_${pId}_songs`;
        const playlistSongs = JSON.parse(localStorage.getItem(playlistSongsKey)) || [];
        setAddedSongs({ ...addedSongs, [pId]: playlistSongs });

    }, [pId]);


    const onGlobalFilterChange = (e) => {

        const value = e.target.value;
        console.log(value)
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        console.log(filters)
        setGlobalFilterValue(value);
    };

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            songName: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
            },
        });
        setGlobalFilterValue('');
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder="Search"
                    />
                </span>
            </div>
        );
    };

    const timeBodyTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <span>{rowData.duration}</span>
            </div>
        );
    };

    const nameBodyTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <span>{rowData.songName}</span>
            </div>
        );
    };

    const iconBodyTemplate = (rowData) => {
        // const isAdded = songs2playlist.includes(rowData.songID);
        // const isInPlaylist = playlists.find(playlist => playlist.songID === rowData.songID);

        const isAdded = (addedSongs[pId] || []).includes(rowData.songID);
        const isInPlaylist = playlists.find(playlist => playlist.songID === rowData.songID);

        const handleAddClick = () => {
            addSongToPlaylist(rowData.songID);
        };

        const handleRemoveClick = () => {
            "in handleRemoveClick"
            removeSongFromPlaylist(rowData.songID);
        };


        return (
            <>
                <React.Fragment>
                    <div className="flex align-items-center gap-2">
                    {isInPlaylist || isAdded ? (
                    <IconButton onClick={handleRemoveClick}>
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                ) : (
                    <IconButton onClick={handleAddClick} disabled={isAdded}>
                        <AddCircleOutline />
                    </IconButton>
                )}
                    </div>
                </React.Fragment>
            </>);
    };

    const picBodyTemplate = (rowData) => {
        const url = `${rowData.image}`;
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
                <Rating value={rowData.rating} readOnly cancel={false} />
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

    const header = renderHeader();

    const playIconBodyTemplate = (rowData) => {


        return (
            <IconButton aria-label="play/pause">
                    {/* onClick={handleClick}  */}
                    {props.isPlaying && rowData.songName===props.currentTrack.title?(
                    <PauseCircleOutlineIcon onClick={()=>{handleClickPause(rowData)}} sx={{ height: 38, width: 38 }} />):(
                <PlayCircleOutlineIcon onClick={() => { handleClick(rowData) }} sx={{ height: 38, width: 38 }} />)
                }
                </IconButton>
        );
    };

    // const SongBody = (song) => {
    //     return (
    //         <audio src={`http://localhost:3600/songs/${song.path}`} controls />
    //     )
    // };
    // const SongButton = (song) => {
    //     return (
    //         <Button onClick={() => { setCurrentSong(song) }} >
    //             <PlayCircleOutlineIcon />
    //         </Button>
    //     )
    // };
    return (
        <div className="card">

            <DataTable
                value={songs}
                // showGridlines
                rows={10}
                loading={loading}
                dataKey="id"
                filters={filters}
                header={header}
                emptyMessage="No songs found."
            >
                <Column
             

                    style={{ minWidth: '10rem' }}
                    body={picBodyTemplate}
                />
                {/* <Column header="Song" body={SongBody}></Column> */}
                <Column
                    style={{ minWidth: '5rem' }} // Adjust the width as needed
                    body={playIconBodyTemplate}
                />

                <Column
                 
                 
                    filterField="songName"
                    field="name"
                    style={{ minWidth: '15rem' }}
                    body={nameBodyTemplate}
                />
                <Column

                    style={{ minWidth: '15rem' }}
                    body={timeBodyTemplate}

                // filterApply={filterApplyTemplate}
                />
                <Column
                    style={{ minWidth: '15rem' }}
                    body={rateBodyTemplate}
                />
                <Column
                    style={{ minWidth: '15rem' }}
                    body={iconBodyTemplate}
                />
                

            </DataTable>

        </div>
    );
}