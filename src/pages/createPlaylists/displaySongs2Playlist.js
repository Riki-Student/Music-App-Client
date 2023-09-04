import React, { useState, useEffect, useContext } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Rating } from 'primereact/rating';
import IconButton from '@mui/material/IconButton';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import AddCircle from '@mui/icons-material/AddCircle';


import axios from "axios";
import { useParams } from 'react-router-dom';
import AudioSong from '../../components/AudioSong';
import { Button } from '@mui/material';
import { AuthContext } from '../../context/authContext';
import { Article,  Audiotrack   ,AudioFile } from '@mui/icons-material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

export default function AddSongs2Playlist() {
    const [songs, setsongs] = useState([]);
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [songs2playlist, setSongs2playlist] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const { setCurrentSong } = useContext(AuthContext)

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

    }, []);




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
            <div    onClick={()=>alert("a")} className="flex align-items-center gap-2">
                <span>{rowData.songName}</span>
            </div>
        );
    };

    const iconBodyTemplate = (rowData) => {
        const isAdded = songs2playlist.includes(rowData.songID);
        const isInPlaylist = playlists.find(playlist => playlist.songID === rowData.songID);
        const handleClick = () => {
            setSongs2playlist([...songs2playlist, rowData.songID]);
            addSongToPlaylist(rowData.songID);
        };


        return (
            <>
                <React.Fragment>
                    <div className="flex align-items-center gap-2">
                        {isInPlaylist || isAdded ? (
                            <IconButton>
                                <AddCircle />
                            </IconButton>
                        ) : (
                            <IconButton onClick={() => handleClick(rowData)} disabled={isAdded}>
                                <AddCircleOutline />
                            </IconButton>
                        )}
                    </div>
                </React.Fragment>
            </>);
    };

    const picBodyTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <img
                    alt="picture"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2CQDBSm5MNncKaq8SQQEal_Z51qlQ93bvkQ&usqp=CAU"
                    //   className={`flag flag-${rowData.country.code}`}
                    style={{ width: '5px' }}
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

    const header = renderHeader();
    const SongBody = (song) => {
        return (
            <audio src={`http://localhost:3600/songs/${song.path}`} controls />
        )
    };
    const SongButton = (song) => {
        return (
            <Button onClick={() => { setCurrentSong(song) }} >
                <PlayCircleOutlineIcon />
            </Button>
        )
    };
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
                <Column body={SongButton}></Column>

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