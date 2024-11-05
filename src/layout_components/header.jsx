import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar,Badge,List, ListItem, ListItemIcon,ListItemText, Divider, Box,Snackbar,Popover} from '@mui/material'; 
import {Notifications,Menu,Close,ExitToApp,AccountCircle} from '@mui/icons-material'; 
import MuiAlert from '@mui/material/Alert';
import ThemeToggleSwitch from './themeToggleSwitch'; // Import the custom theme switch 
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import ManageAccountDialog from './manage_account_dialog';
 
// Dummy Notifications 
const mockNotifications = [
    {id:1,message:'New order received'},
    { id: 2, message: 'Table reservation confirmed' },
    { id: 3, message: 'Inventory low: Reorder items' },   
    {id:4,message:'New order received'},
    { id: 5, message: 'Table reservation confirmed' },
    { id: 6, message: 'Inventory low: Reorder items' },
    {id:7,message:'New order received'},
    { id: 8, message: 'Table reservation confirmed' },
    { id: 9, message: 'Inventory low: Reorder items' },  
]; 

export default function Header({toggleSidebar,toggleTheme,mode}){   
    const [anchorEl, setAnchorEl] = useState(null); // State to manage popover anchor for notification
    const [notifications, setNotifications] = useState(mockNotifications);   // State for checking notifications 
    const [showBadge, setShowBadge] = useState(true); // State to control badge visibility 
    const [profileAnchorEl, setProfileAnchorEl] = useState(null); // Popover anchor for profile
    const [userInitials, setUserInitials] = useState(''); // State to handle user initial in avatar
    const [openDialog, setOpenDialog] = useState(false); // State to manage dialog open/close
    const [openSnackbar, setOpenSnackbar] = useState(false); // State for snackbar visibility
    const navigate = useNavigate(); // Initialize useNavigate for redirection

    useEffect(()=>{
        const user = JSON.parse(sessionStorage.getItem('user') || localStorage.getItem('user'));
        if (user) {
            const initials = user.emailOrUsername
                .split(' ')
                .map(name=>name[0])
                .join('')
                .toUpperCase();
            setUserInitials(initials);
        }
    },[]);

    // Open Popover - notification
    const handleOpenPopover = (event) => {
       setAnchorEl(event.currentTarget);
       setShowBadge(false); // Hide badge when popover opens
    };
    
    // Close Popover - notification
    const handleClosePopover = () => {
       setAnchorEl(null);
    }; 
    
    // open popover - profile avatar
    const handleProfileClick = (event) => {
        setProfileAnchorEl(event.currentTarget);
    };

    // close popover - profile avatar
    const handleProfileClose = () => {
        setProfileAnchorEl(null);
    };

    // Check if the Popover is open
    const open = Boolean(anchorEl);

    //Remove a notification from the list
    const handleRemoveNotification = (id) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    };

    const handleDialogOpen = () => {
        setOpenDialog(true); // Open the dialog
    };
    const handleDialogClose = () => {
        setOpenDialog(false); // Close the dialog
    };
    
    // Handle logout   
    const handleLogout = () => {
        localStorage.removeItem('user');
        setUserInitials('');
        handleProfileClose();
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        setOpenSnackbar(true); // Show snackbar upon logout
    };

    // Close the snackbar and navigate to login page
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
        navigate('/login'); // Redirect to login page
    };

    return (
        <> 
        <AppBar position='fixed'>  
            <Toolbar>
                {/* Left Side: Hamburger Icon */}
                <IconButton
                   edge='start'
                   sx={{marginRight:'16px',color:'white'}}
                   onClick={toggleSidebar}    // Trigger the sidebar toggle   
                ><Menu/></IconButton>
                {/*Left side : Brand logo/name*/}
                <Typography variant='h1'sx={{flexGrow:2,color:'white',}}>  
                   Restaurant Management
                </Typography>   
                {/*Right side : Notification icon with conditional rendering*/}
                <IconButton sx={{marginRight:'8px',color:'white'}}
                  onClick={handleOpenPopover}
                >
                    {showBadge ? (
                        <Badge badgeContent={notifications.length} color="secondary" overlap="circular">
                          <Notifications />
                        </Badge>
                        ) : ( 
                          <Notifications />
                    )}   
                </IconButton>
                {/* User Profile Avatar */}
                <IconButton sx={{marginRight:'10px'}}  onClick={handleProfileClick}>  
                    <Avatar sx={{bgcolor:'secondary.main',color:'text.primary'}}>{userInitials || ''}</Avatar> 
                </IconButton> 
                {/* Theme Toggle Switch */}
                <ThemeToggleSwitch toggleTheme={toggleTheme} mode={mode} /> {/* Add the theme toggle switch and pass the props */}
            </Toolbar>   
        </AppBar>
        {/* Popover for Notifications */}
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
          }}
          transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
          }} 
          PaperProps={{
            sx: {
              width: 300,
              maxHeight: 400,
              overflowY: 'auto',
              borderRadius: '16px',
              marginTop: '10px', // Adjust space from the icon
            },
          }}
        >
           <Box sx={{padding:2}}>
             <Typography variant='h3'color='#66BB6A'sx={{ marginBottom: 2,marginTop:2 }}>Notifications</Typography> 
             <Divider color='black'/> 
             <List>
                {notifications.length > 0 ? (
                    notifications.map((notification)=>(
                        <React.Fragment key={notification.id}>
                            <ListItem  
                                secondaryAction = {
                                    <IconButton edge="end" onClick={() => handleRemoveNotification(notification.id)}>
                                        <Close />
                                    </IconButton>
                                }
                            >
                                <ListItemText primary={notification.message}/>     
                            </ListItem>
                            <Divider color='black' />  
                        </React.Fragment>
                    ))
                ):(
                    <Typography sx={{ padding: 2, textAlign: 'center' }}>No notifications</Typography>
                )}
             </List>
           </Box>
        </Popover> 
        {/* Profile Popover */}
        <Popover
          open={Boolean(profileAnchorEl)}
          anchorEl={profileAnchorEl}
          onClose={handleProfileClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }} 
        >
            <Box sx={{ padding: 2, width: 250 }}>
                <List>
                    <ListItem button onClick={handleDialogOpen}  sx={{cursor: 'pointer','&:hover': { backgroundColor: 'secondary.main' }}}>
                       <ListItemIcon sx={{ color: 'primary.contrastText' }}><AccountCircle/></ListItemIcon>
                       <ListItemText primary="Manage Account" />
                    </ListItem>
                    <Divider color='black'/>
                    <ListItem button onClick={handleLogout} sx={{cursor: 'pointer','&:hover': { backgroundColor: 'secondary.main' }}}>
                        <ListItemIcon sx={{ color: 'primary.contrastText' }}><ExitToApp/></ListItemIcon>
                        <ListItemText primary="Log Out" />
                    </ListItem> 
                </List>
                {/* Dialog Component */} 
                <ManageAccountDialog open={openDialog} onClose={handleDialogClose} />
            </Box>
        </Popover>
        {/* Snackbar for logout notification */}
        <Snackbar 
                open={openSnackbar}
                autoHideDuration={3000} 
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <MuiAlert onClose={handleSnackbarClose} severity="info" variant="filled" >
                    You are logged out.
                </MuiAlert> 
        </Snackbar> 
        </>    
    );
} 

