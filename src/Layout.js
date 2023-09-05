// Layout.js
import React from 'react';
import { AudioContextProvider } from './context/audioContext'; // Import your AudioContextProvider

const Layout = ({ children }) => {
  return (
    <AudioContextProvider>
      {children}
    </AudioContextProvider>
  );
};

export default Layout;
