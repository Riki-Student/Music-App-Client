import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Rating } from 'primereact/rating';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import IconButton from '@mui/material/IconButton';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { loadSong } from '../PlayMusic/SongLoader';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';

import axios from "axios";

export default function TemplateDemo(props) {
    const [songs, setsongs] = useState([]);
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(false);
    const [rate, setRate]=useState("")
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [likedSongs, setLikedSongs] = useState([]);
    const [favorites, setfavorites] = useState([]);


    const createNewLikedSong = (songID) => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }

        }
        const Create = async () => {
            await axios.post(`http://localhost:3600/api/likedsongs`, { "ls_songs_songID": songID }, config);

        }
        const Rate = async () => {
            const response=await axios.post(`http://localhost:3600/api/songs`, { "songID": songID }, config);
            setRate(response.data.finalRating)
        }
        Create();
        Rate();
        
        setLikedSongs([...likedSongs, songID]);
    }

    useEffect(() => {

        async function fetchData() {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }
            const { data } = await axios.get(`http://localhost:3600/api/songs`, config);
            setsongs(data);
            setLoading(false);

        }
        fetchData();
        initFilters();


        const config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            // body:JSON.stringify({
            //      userID:JSON.parse(localStorage.getItem('user')).userID
            //     })                  
        }
        async function fetchData2() {
            const { data } = await axios.get(`http://localhost:3600/api/likedsongs`, config);
            setfavorites(data);
        }
        fetchData2();

    }, [rate]);


    const onGlobalFilterChange = (e) => {

        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
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

    const iconBodyTemplate = (rowData) => {
        const isLiked = likedSongs.includes(rowData.songID);
        const isFavorite = favorites.find(favorite => favorite.song.songID === rowData.songID);
        const handleClick = () => {
            setLikedSongs([...likedSongs, rowData.songID]);
            createNewLikedSong(rowData.songID);
        };

        return (
            <>
                <React.Fragment>
                    <div className="flex align-items-center gap-2">
                        {isFavorite || isLiked ? (
                            <IconButton>
                                <FavoriteOutlinedIcon />
                            </IconButton>
                        ) : (
                            <IconButton onClick={() => handleClick(rowData)} disabled={isLiked}>
                                <FavoriteBorderOutlinedIcon />
                            </IconButton>
                        )}
                    </div>
                </React.Fragment>
            </>);
    };

    const nameBodyTemplate = (rowData) => {

        return (
            <div className="flex align-items-center gap-2">
                <span>{rowData.songName}</span>
            </div>
        );
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

    return (
        <div className="card">
            <DataTable
                value={songs}
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

                <Column
                    style={{ minWidth: '5rem' }} // Adjust the width as needed
                    body={playIconBodyTemplate}
                />

                <Column
                    style={{ minWidth: '10rem' }}
                    body={nameBodyTemplate}
                />

                <Column
                    filterField="songName"
                    field="name"
                    style={{ minWidth: '10rem' }}
                    body={iconBodyTemplate}
                />
                <Column
                    style={{ minWidth: '15rem' }}
                    body={timeBodyTemplate}
                />
                <Column
                    style={{ minWidth: '15rem' }}
                    body={rateBodyTemplate}
                />

            </DataTable>
        </div>
    );
}

