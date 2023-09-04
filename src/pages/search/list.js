import * as React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import TextField from "@mui/material/TextField";
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";


function List(props) {

    const [songs, setsongs] = useState([]);
    const [layout, setLayout] = useState('grid');

    useEffect(() => {

        async function fetchData() {
            const { data } = await axios.get(`http://localhost:3600/api/songs`);
            setsongs(data.slice(0, 12));
        }
        fetchData();

    }, []);


    const filteredData = songs.filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.songName.toLowerCase().includes(props.input)
        }
    })

    return (<>

        <React.Fragment>
            {filteredData.map((song, i) => (
                                <div className="col-12">
                                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2CQDBSm5MNncKaq8SQQEal_Z51qlQ93bvkQ&usqp=CAU`} alt={song.songName} />
                                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                                            <div className="text-2xl font-bold text-900">{song.songName}</div>
                                            <Rating value={song.rating} readOnly cancel={false}></Rating>
                                            <div className="flex align-items-center gap-3">
                                                <span className="flex align-items-center gap-2">
                                                    <span className="font-semibold">{song.duration}</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                            <Button icon="pi pi-heart" className="p-button-rounded" ></Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

            ))}

           
        </React.Fragment>
    </>)
}

export default List