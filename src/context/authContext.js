import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Modal, Box } from "@mui/material"
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)
  const [currentSong, setCurrentSong] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [currentLikedAlbums,setCurrentLikedAlbums]=useState([]);
  const [currentLikedArtists,setCurrentLikedArtists]=useState([]);

  const { pathname } = useLocation()
  const isHomePage = pathname === "/Home";
  const [openLoginPopup, setOpenLoginPopup] = useState(!isHomePage && !token)

  const login = async ({ userName, password }) => {
    const res = await axios.post(
      "http://localhost:3600/api/auth/login",
      { userName, password },
      {
        withCredentials: true,
      }
    );


    setCurrentUser(res.data.user);
    setToken(res.data.accessToken);
    localStorage.setItem("token", res.data.accessToken);
    localStorage.setItem("user", JSON.stringify(res.data.user));
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };


  return (
    <AuthContext.Provider value={{ token, login, logout, currentSong, setCurrentSong, openLoginPopup, setOpenLoginPopup,currentUser,currentLikedAlbums,setCurrentLikedAlbums,currentLikedArtists, setCurrentLikedArtists}}>
      {children}
    </AuthContext.Provider>

  )
};