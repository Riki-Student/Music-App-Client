import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';


function Songs2playlist() {

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
                <Rating value={rowData.songs.rating} readOnly cancel={false} />
            </div>
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