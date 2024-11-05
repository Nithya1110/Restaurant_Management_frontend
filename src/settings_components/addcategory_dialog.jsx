import React from 'react';
import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions,Snackbar, } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { createCategories } from '../services/api';
import CustomButton from '../elements_components/custom_button';

export default function AddCategoryDialog({ open, onClose }) {
    const [categoryName, setCategoryName] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleCategoryNameChange = (event) => {
        setCategoryName(event.target.value);  
    };

    const handleAddCategory = async() => {
        try {
            await createCategories({ name: categoryName });
            setOpenSnackbar(true);
            setTimeout(() => onClose(), 2000);  // Delay closing dialog slightly
        } catch (error) {
            console.error('Error response:', error.response.data); 
        }
    };

    // Function to close snackbar 
    const handleSnackbarClose = () => setOpenSnackbar(false);

    return (
        <>
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Add New Category</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    name='categoryname'
                    label="Category Name"
                    fullWidth
                    margin="dense"
                    value={categoryName}
                    onChange={handleCategoryNameChange}
                />
            </DialogContent>
            <DialogActions>
                <CustomButton onClick={onClose} sx={{backgroundColor:'secondary.main',color:'black','&:hover':{backgroundColor:'secondary.dark',color:'white'}}}>Cancel</CustomButton>
                <CustomButton onClick={handleAddCategory} sx={{backgroundColor:'primary.main',color:'black','&:hover':{backgroundColor:'primary.dark',color:'white'}}}>Add</CustomButton>
            </DialogActions>
        </Dialog>
        {/* Snackbar Notification */}
        <Snackbar
          open={openSnackbar}
          onClose={handleSnackbarClose} 
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <MuiAlert onClose={handleSnackbarClose} severity="success" variant="filled" >
                    New Category has been added !
            </MuiAlert> 
        </Snackbar> 
        </>
    );
}
