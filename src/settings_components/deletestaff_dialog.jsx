import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Box, Snackbar, Typography,Divider } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import CustomButton from '../elements_components/custom_button';

// Mock staff data for validation
const mockStaffData = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Alice Johnson' },
];

export default function DeleteStaffDialog({ open, onClose }) {
    const [staffID, setStaffID] = useState('');
    const [staffName, setStaffName] = useState('');
    const [error, setError] = useState('');
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // Handle ID submission and validation
    const handleIDSubmit = () => {
        const staff = mockStaffData.find((s) => s.id === staffID);
        if (staff) {
            setStaffName(staff.name);
            setError('');
            setOpenConfirmationDialog(true); // Open confirmation dialog
        } else {
            setError('No user found with this ID');
        }
    };

    // Handle deletion confirmation
    const handleDelete = () => {
        setOpenSnackbar(true); // Show success message
        handleCloseConfirmationDialog(); // Close the confirmation dialog
    };

    const handleCloseConfirmationDialog = () => {
        setOpenConfirmationDialog(false);
        onClose(); // Close the main dialog
    };

    const handleSnackbarClose = () => setOpenSnackbar(false);

    return (
        <>
            {/* Step 1: ID Input Dialog */}
            <Dialog open={open && !openConfirmationDialog} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle>Enter Staff ID for Deletion</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Staff ID"
                        variant="outlined"
                        value={staffID}
                        onChange={(e) => setStaffID(e.target.value)}
                        error={!!error}
                        helperText={error}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <CustomButton onClick={onClose} sx={{ mr: 1 }}>Cancel</CustomButton>
                        <CustomButton variant="contained" onClick={handleIDSubmit}>Submit</CustomButton>
                    </Box>
                </DialogContent>
            </Dialog>

            {/* Step 2: Confirmation Dialog */}
            <Dialog open={openConfirmationDialog} onClose={handleCloseConfirmationDialog} fullWidth maxWidth="sm">
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete <strong>{staffName}</strong>?</Typography>
                    <Divider/>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <CustomButton onClick={handleCloseConfirmationDialog}sx={{mr:1,backgroundColor:'secondary.main',color:'black','&:hover':{backgroundColor:'secondary.dark',color:'white'}}}>Cancel</CustomButton>
                        <CustomButton variant="contained" color="error" onClick={handleDelete} sx={{backgroundColor:'primary.main',color:'black','&:hover':{backgroundColor:'primary.dark',color:'white'}}}>Delete</CustomButton>
                    </Box>
                </DialogContent>
            </Dialog>

            {/* Snackbar Notification */}
            <Snackbar
                open={openSnackbar}
                onClose={handleSnackbarClose}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <MuiAlert onClose={handleSnackbarClose} severity="error" variant="filled" >
                    A staff has been deleted.
                </MuiAlert> 
        </Snackbar> 
        </>
    );
}
