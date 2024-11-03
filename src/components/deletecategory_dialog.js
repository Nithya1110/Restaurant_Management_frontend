import React, { useState, useEffect } from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button,MenuItem, Select, InputLabel, FormControl, Snackbar, Typography} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { getCategories, deleteCategory } from '../services/api';

export default function DeleteCategoryDialog({ open, onClose }) {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // Fetch categories when the dialog opens
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        if (open) fetchCategories();
    }, [open]);

    // Handle category selection change
    const handleCategorySelect = (event) => {
        setSelectedCategory(event.target.value);
    };

    // Open confirmation dialog after selecting a category
    const handleNext = () => {
        if (selectedCategory) setOpenConfirmDialog(true);
    };

    // Delete the selected category and show snackbar notification
    const handleDeleteCategory = async () => {
        try {
            await deleteCategory(selectedCategory);
            setOpenConfirmDialog(false);  // Close confirmation dialog
            setOpenSnackbar(true);
            setTimeout(() => onClose(), 2000);  // Delay closing dialog slightly
        } catch (error) {
            console.error('Error deleting category:', error.response?.data || error.message);
        }
    };

    const handleSnackbarClose = () => setOpenSnackbar(false);

    return (
        <>
            {/* Select Category Dialog */}
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle>Delete Category</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="select-category-label">Select Category</InputLabel>
                        <Select labelId="select-category-label" label="Select Category" value={selectedCategory} onChange={handleCategorySelect}>
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select> 
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="secondary">Cancel</Button>
                    <Button onClick={handleNext} color="primary" disabled={!selectedCategory}>Next</Button>
                </DialogActions>
            </Dialog>

            {/* Confirmation Dialog */}
            <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)} fullWidth maxWidth="xs">
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this category? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenConfirmDialog(false)} sx={{backgroundColor:'secondary.main',color:'black','&:hover':{backgroundColor:'secondary.dark',color:'white'}}}>Cancel</Button>
                    <Button onClick={handleDeleteCategory} sx={{backgroundColor:'primary.main',color:'black','&:hover':{backgroundColor:'primary.dark',color:'white'}}}>Delete</Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar Notification */}
            <Snackbar
                open={openSnackbar}
                onClose={handleSnackbarClose}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <MuiAlert onClose={handleSnackbarClose} severity="error" variant="filled" >
                    Deleted a category.
                </MuiAlert> 
        </Snackbar> 
        </>
    );
}
