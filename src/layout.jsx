import React, { useState,useEffect } from 'react';
import { Box } from '@mui/material';
import Header from './components/layout/header';  // Import the Header component
import Sidebar from './components/layout/sidebar';  // Import the Sidebar component 

const drawerWidth = 240; // Width of the sidebar

// Function to safely retrieve the initial sidebar state from localStorage
const getInitialSidebarState = () => {
    const savedState = localStorage.getItem('isSidebarOpen');
    return savedState === 'true'; // Convert string to boolean
};

export default function Layout({ children,toggleTheme,mode }) {
    // Retrieve initial state from localStorage, defaulting to false if not set
    const [isSidebarOpen, setIsSidebarOpen] = useState(getInitialSidebarState);
    // Toggle the sidebar open state and store it in localStorage
    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => {
            const newState = !prevState;
            localStorage.setItem('isSidebarOpen', newState); // Save new state to localStorage
            return newState;
        }); 
    };
    // This effect runs on mount to set the initial state from localStorage
    useEffect(()=>{
        const savedState = localStorage.getItem('isSidebarOpen');
        if (savedState){
            setIsSidebarOpen(savedState === 'true');
        } 
    },[]);
  
    return (
      <Box sx={{ display: 'flex', height: '100vh' }}>  {/* Main layout with flexbox to allow sidebar and content side by side */}
        <Header toggleSidebar={toggleSidebar} toggleTheme={toggleTheme} mode={mode} /> {/* Header with sidebar toggle function and toggle theme  */}
        <Sidebar isOpen={isSidebarOpen} />  {/* Sidebar which will open or collapse based on state */}
        {/* Dynamic Content Area */}
        {/* Adjust content margin based on sidebar state */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            marginTop: '64px',  // Align with the header
            marginLeft: isSidebarOpen ? `${drawerWidth}px` : 0,  // Adjust for sidebar
            transition: 'margin-left 0.3s',  // Smooth transition for sidebar toggle
            padding: '16px',  // Padding around content
          }}
        >
          {children} {/* Render pages dynamically here */}
        </Box>
      </Box>
    );
  }