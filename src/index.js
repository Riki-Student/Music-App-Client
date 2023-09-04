import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AudioPlayer from './pages/PlayMusic/AudioPlayer';
import { AuthContextProvider } from './context/authContext';
import {BrowserRouter as Router} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
  {/* <AuthContextProvider>  */}
    <App />
    <AudioPlayer />
     {/* </AuthContextProvider>  */}
  </React.StrictMode>
);


