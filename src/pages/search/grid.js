import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Rating } from 'primereact/rating';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import IconButton from '@mui/material/IconButton';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

import axios from "axios";

export default function TemplateDemo() {
    const [songs, setsongs] = useState([]);
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(false);
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
        Create();
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

    }, []);


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
        return (
            <div className="flex align-items-center gap-2">
                <img
                    alt="picture"
                    src="https://media.istockphoto.com/id/1287065554/photo/sound-wave.jpg?b=1&s=612x612&w=0&k=20&c=Qbk-qBg1-MueQrxyI1QlNM8SaXsYTv5wS5o46dSqAZU="
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

    const header = renderHeader();

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
                    style={{ minWidth: '5rem' }}
                    body={picBodyTemplate}
                />

                <Column
                    style={{ minWidth: '5rem' }}
                    body={nameBodyTemplate}
                />

                <Column
                    filterField="songName"
                    field="name"
                    style={{ minWidth: '15rem' }}
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

