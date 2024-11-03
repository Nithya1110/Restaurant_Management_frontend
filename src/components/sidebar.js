import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Home, Assignment, RestaurantMenu, Settings } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import SettingsDialog from './settings_dialog';

export default function Sidebar({ isOpen }) {
    const [openSettingsDialog, setOpenSettingsDialog] = useState(false);
    // State to track whether settings should be disabled
    const [isSettingsDisabled, setIsSettingsDisabled] = useState(false);

    useEffect(() => {
        // Check sessionStorage and localStorage for the user data
        let user = null;
        try {
            user = JSON.parse(sessionStorage.getItem('user')) || JSON.parse(localStorage.getItem('user'));
        } catch (error) {
        }

        // If user is logged in and role is 'staff', disable the settings option
        if (user && user.role === 'staff') {
            setIsSettingsDisabled(true);
        } else {
            setIsSettingsDisabled(false);
        }
    }, []); 

    // Function to handle settings dialog open and close
    const handleOpenSettings = () =>{
         isSettingsDisabled ? setOpenSettingsDialog(false) : setOpenSettingsDialog(true) ;
    }     
    const handleCloseSettings = () => setOpenSettingsDialog(false);

    return (
        <>
            <Drawer
                variant='persistent'
                open={isOpen}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: isOpen ? 240 : 0,
                        boxSizing: 'border-box',
                        boxShadow: 'none',
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        marginTop: '64px',
                    },
                }}
            >
                <List
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: '50px',
                        marginBottom: '50px',
                        padding: 0,
                    }}
                >
                    {/* Home Link */}
                    <ListItem button component={Link} to='/home_dashboard'
                        sx={{ '&:hover': { backgroundColor: 'secondary.main' }, marginBottom: '10px' }}>
                        <ListItemIcon sx={{ color: 'primary.contrastText' }}><Home /></ListItemIcon>
                        <ListItemText primary='Dashboard' />
                    </ListItem>
                    {/* Orders Link */}
                    <ListItem button component={Link} to='/orders'
                        sx={{ '&:hover': { backgroundColor: 'secondary.main' }, marginBottom: '10px' }}>
                        <ListItemIcon sx={{ color: 'primary.contrastText' }}><Assignment /></ListItemIcon>
                        <ListItemText primary='Orders' />
                    </ListItem>
                    {/* Menu Management Link */}
                    <ListItem button component={Link} to='/menu_management'
                        sx={{ '&:hover': { backgroundColor: 'secondary.main' }, marginBottom: '10px' }}>
                        <ListItemIcon sx={{ color: 'primary.contrastText' }}><RestaurantMenu /></ListItemIcon>
                        <ListItemText primary='Menu Management' />
                    </ListItem>
                    {/* Settings Link - Opens Settings Dialog */}
                    <ListItem button onClick={handleOpenSettings} disabled={isSettingsDisabled}
                        sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'secondary.main' }, marginBottom: '10px' }}>
                        <ListItemIcon sx={{ color: 'primary.contrastText' }}><Settings /></ListItemIcon>
                        <ListItemText primary='Settings' />
                    </ListItem> 
                </List>
            </Drawer>

            {/* SettingsDialog Component */}
            <SettingsDialog open={openSettingsDialog} onClose={handleCloseSettings} />
        </>
    ); 
}
