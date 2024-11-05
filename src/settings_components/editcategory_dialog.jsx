import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, MenuItem, Select, InputLabel, FormControl, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { getCategories, updateCategory } from '../services/api';
import CustomButton from '../elements_components/custom_button';

export default function EditCategoryDialog({ open, onClose }) {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

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

    const handleCategorySelect = (event) => {
        const selectedId = event.target.value;
        const selectedCat = categories.find((cat) => cat.id === selectedId);
        setSelectedCategory(selectedId);
        setCategoryName(selectedCat ? selectedCat.name : '');
    };

    const handleEditCategory = async () => {
        try {
            await updateCategory(selectedCategory, { name: categoryName });
            setOpenSnackbar(true);
            setTimeout(() => onClose(), 2000);  // Delay closing dialog slightly
        } catch (error) {
            console.error('Error updating category:', error.response?.data || error.message);
        }
    };
    // Function to close snackbar 
    const handleSnackbarClose = () => setOpenSnackbar(false);

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle>Edit Category</DialogTitle>
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
                    {selectedCategory && (
                        <TextField
                            label="Category Name"
                            fullWidth
                            margin="dense"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <CustomButton onClick={onClose} sx={{backgroundColor:'secondary.main',color:'black','&:hover':{backgroundColor:'secondary.dark',color:'white'}}}>Cancel</CustomButton>
                    <CustomButton onClick={handleEditCategory} sx={{backgroundColor:'primary.main',color:'black','&:hover':{backgroundColor:'primary.dark',color:'white'}}}>Save</CustomButton>
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
                    Category has been updated !
                </MuiAlert> 
        </Snackbar> 
        </>
    );
}
