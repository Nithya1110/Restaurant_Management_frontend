import React, { useState,} from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Box, Snackbar, Rating, Typography } from '@mui/material';
import CustomButton from '../elements_components/custom_button';
import MuiAlert from '@mui/material/Alert';

// Mock staff data
const mockStaffData = [
    { id: '1', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', contact: '+911234567890', address: '123 Baker Street', salary: '50000', rating: 4.5 },
    { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', contact: '+919876543210', address: '456 Elm Street', salary: '60000', rating: 4.0 },
    { id: '3', firstName: 'Alice', lastName: 'Johnson', email: 'alice.j@example.com', contact: '+918765432109', address: '789 Oak Avenue', salary: '55000', rating: 3.5 },
];

export default function EditStaffDialog({ open, onClose }) {
    const [staffID, setStaffID] = useState('');
    const [currentStaff, setCurrentStaff] = useState(null); // Stores the selected staff's details
    const [error, setError] = useState(''); // Tracks invalid ID errors
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false); // Controls second dialog visibility
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errors, setErrors] = useState({});

    // Helper function to validate form inputs
    const validateForm = () => {
        let newErrors = {};
        if (!currentStaff.firstName) newErrors.firstName = 'First name is required';
        if (!currentStaff.lastName) newErrors.lastName = 'Last name is required';
        if (!currentStaff.email.includes('@')) newErrors.email = 'Invalid email';
        if (!currentStaff.contact.startsWith('+91') || currentStaff.contact.length !== 13) newErrors.contact = 'Invalid contact';
        if (!currentStaff.address) newErrors.address = 'Address is required';
        if (!currentStaff.salary || isNaN(currentStaff.salary) || currentStaff.salary <= 0) newErrors.salary = 'Salary must be a positive number';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle ID submission
    const handleIDSubmit = () => {
        const staff = mockStaffData.find((s) => s.id === staffID);
        if (staff) {
            setCurrentStaff(staff);
            setError('');
            setOpenDetailsDialog(true); // Open the details dialog
        } else {
            setError('No user found with this ID');
        }
    };

    // Handle saving changes in the details dialog
    const handleSave = () => {
        if (validateForm()) {
            setOpenSnackbar(true); // Show success message
            handleCloseDetailsDialog(); // Close the details dialog
        }
    };

    const handleCloseDetailsDialog = () => {
        setOpenDetailsDialog(false);
        onClose(); // Close the main dialog
    };

    const handleSnackbarClose = () => setOpenSnackbar(false);

    return (
        <>
            {/* Step 1: ID Dialog */}
            <Dialog open={open && !openDetailsDialog} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle>Enter Staff ID</DialogTitle>
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

            {/* Step 2: Staff Details Dialog */}
            <Dialog open={openDetailsDialog} onClose={handleCloseDetailsDialog} fullWidth maxWidth="sm">
                <DialogTitle>Edit Staff Details</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth margin="normal"
                        label="First Name"
                        variant="outlined"
                        value={currentStaff?.firstName || ''}
                        onChange={(e) => setCurrentStaff({ ...currentStaff, firstName: e.target.value })}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                    />
                    <TextField
                        fullWidth margin="normal"
                        label="Last Name"
                        variant="outlined"
                        value={currentStaff?.lastName || ''}
                        onChange={(e) => setCurrentStaff({ ...currentStaff, lastName: e.target.value })}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                    />
                    <TextField
                        fullWidth margin="normal"
                        label="Email"
                        variant="outlined"
                        value={currentStaff?.email || ''}
                        onChange={(e) => setCurrentStaff({ ...currentStaff, email: e.target.value })}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        fullWidth margin="normal"
                        label="Contact"
                        variant="outlined"
                        value={currentStaff?.contact || ''}
                        onChange={(e) => setCurrentStaff({ ...currentStaff, contact: e.target.value })}
                        error={!!errors.contact}
                        helperText={errors.contact}
                    />
                    <TextField
                        fullWidth margin="normal"
                        label="Address"
                        variant="outlined"
                        value={currentStaff?.address || ''}
                        onChange={(e) => setCurrentStaff({ ...currentStaff, address: e.target.value })}
                        error={!!errors.address}
                        helperText={errors.address}
                    />
                    <TextField
                        fullWidth margin="normal"
                        label="Salary"
                        variant="outlined"
                        value={currentStaff?.salary || ''}
                        onChange={(e) => setCurrentStaff({ ...currentStaff, salary: e.target.value })}
                        error={!!errors.salary}
                        helperText={errors.salary}
                    />
                    <Typography component="legend" sx={{ mt: 2 }}>Performance Rating</Typography>
                    <Rating
                        value={currentStaff?.rating || 0}
                        onChange={(e, newValue) => setCurrentStaff({ ...currentStaff, rating: newValue })}
                        precision={0.5}
                        size="large"
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <CustomButton onClick={handleCloseDetailsDialog} sx={{mr:1,backgroundColor:'secondary.main',color:'black','&:hover':{backgroundColor:'secondary.dark',color:'white'}}}>Cancel</CustomButton>
                        <CustomButton variant="contained" onClick={handleSave} sx={{backgroundColor:'primary.main',color:'black','&:hover':{backgroundColor:'primary.dark',color:'white'}}}>Save</CustomButton>
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
                <MuiAlert onClose={handleSnackbarClose} severity="success" variant="filled" >
                    Staff details updated !
                </MuiAlert> 
        </Snackbar> 
        </>
    );
}
