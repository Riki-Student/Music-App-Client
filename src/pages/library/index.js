
import React from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import PlaylistsDefault from "./PlaylistsDefault";
import Albums from "./AlbumsFirst";
import ArtistsFirst from "./ArtistsFirst";
import { useEffect, useState,useContext } from "react";
import Searchalbums from './searchalbums';
import AlbumsFirst from './AlbumsFirst';
import axios from "axios";
import ExistPlaylists from './ExistPlaylists';
import Searchartists from './searchartists';
import { AuthContext } from '../../context/authContext';
import Display from './DisplayLikedAlbums';
import Try from './Albums';

export default function BasicDemo() {

    const [change, setChange] = useState(false)
    const [artistChange, setArtistChange]=useState(false)
    const [likedAlbums, setLikedAlbums] = useState([]);
    const [existplaylists, setExistplaylists] = useState([]);
    const {currentLikedArtists,setCurrentLikedArtists} = useContext(AuthContext);
    const { currentLikedAlbums, setCurrentLikedAlbums } = useContext(AuthContext);
console.log(currentLikedAlbums);
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
             setCurrentLikedAlbums(data);
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
            setCurrentLikedArtists(data);
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
                        {currentLikedAlbums.length > 0 ? (<Searchalbums></Searchalbums>): 
                            change ? (<Searchalbums></Searchalbums>) :
                                (<AlbumsFirst setChange={setChange}></AlbumsFirst>)}
                    </p>
                </TabPanel>
                <TabPanel header="Artists">
                    <p className="m-0">
                    {currentLikedArtists.length > 0 ? (<Searchartists></Searchartists>) :
                            artistChange ? (<Searchartists></Searchartists>) :
                                (<ArtistsFirst setArtistChange={setArtistChange}></ArtistsFirst>)}
                    </p>
                </TabPanel>
            </TabView>
        </div>
    )
}
