
import React from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import PlaylistsDefault from "./PlaylistsDefault";
import Albums from "./AlbumsFirst";
import ArtistsFirst from "./ArtistsFirst";
import { useEffect, useState } from "react";
import Searchalbums from './searchalbums';
import AlbumsFirst from './AlbumsFirst';
import axios from "axios";
import FavoriteAlbums from './FavoriteAlbums';
import ExistPlaylists from './ExistPlaylists';
import Searchartists from './searchartists';
import ArtistsData from './ArtistsData';
import FavoriteArtists from './FavoriteArtists';





export default function BasicDemo() {

    const [change, setChange] = useState(false)
    const [artistChange, setArtistChange]=useState(false)
    const [likedAlbums, setLikedAlbums] = useState([]);
    const [existplaylists, setExistplaylists] = useState([]);
    const [likedArtists,setLikedArtists]=useState([]);

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
        }
        async function fetchData() {
            const { data } = await axios.get(`http://localhost:3600/api/playlists`, config);
            setExistplaylists(data);
        }
        fetchData();

    }, []);

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },

        }
        async function fetchData() {
            const { data } = await axios.get(`http://localhost:3600/api/likedalbums`, config);
            setLikedAlbums(data);
        }
        fetchData();

    }, []);

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },

        }
        async function fetchData() {
            const { data } = await axios.get(`http://localhost:3600/api/likedartists`, config);
            setLikedArtists(data);
        }
        fetchData();

    }, []);


    return (
        <div className="card" >
            <TabView>
                <TabPanel header="Playlists">
                    <p className="m-0">
                        {existplaylists.length > 0 ? (<ExistPlaylists existplaylists={existplaylists} setExistplaylists={setExistplaylists}></ExistPlaylists>) :
                            (<PlaylistsDefault></PlaylistsDefault>)}   
                    </p>
                </TabPanel>
                <TabPanel header="Albums">
                    <p className="m-0">
                        {likedAlbums.length > 0 ? (<FavoriteAlbums></FavoriteAlbums>) :
                            change ? (<Searchalbums></Searchalbums>) :
                                (<AlbumsFirst setChange={setChange}></AlbumsFirst>)}
                    </p>
                </TabPanel>
                <TabPanel header="Artists">
                    <p className="m-0">
                    {likedArtists.length > 0 ? (<FavoriteArtists></FavoriteArtists>) :
                            artistChange ? (<Searchartists></Searchartists>) :
                                (<ArtistsFirst setArtistChange={setArtistChange}></ArtistsFirst>)}
                    </p>
                </TabPanel>
            </TabView>
        </div>
    )
}
