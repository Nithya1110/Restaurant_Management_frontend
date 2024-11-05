import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Checkbox, FormControlLabel, Snackbar, Box } from '@mui/material';
import CustomButton from '../elements_components/custom_button';
import MuiAlert from '@mui/material/Alert';
import { getCategories } from '../services/api';

export default function ManageOrdersDialog({ open, onClose }) {
    const [acceptOrders, setAcceptOrders] = useState(false);
    const [closeOrdersToday, setCloseOrdersToday] = useState(false);
    const [categoryStates, setCategoryStates] = useState({});
    const [categories, setCategories] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const [tempAcceptOrders, setTempAcceptOrders] = useState(false);
    const [tempCloseOrdersToday, setTempCloseOrdersToday] = useState(false);
    const [tempCategoryStates, setTempCategoryStates] = useState({});

    useEffect(() => {
        getCategories().then(response => setCategories(response.data));

        const savedAcceptOrders = JSON.parse(localStorage.getItem('acceptOrders'));
        const savedCloseOrdersToday = JSON.parse(localStorage.getItem('closeOrdersToday'));
        const savedCategoryStates = JSON.parse(localStorage.getItem('categoryStates'));

        setAcceptOrders(savedAcceptOrders || false);
        setCloseOrdersToday(savedCloseOrdersToday || false);
        setCategoryStates(savedCategoryStates || {});
    }, []);

    useEffect(() => {
        if (open) {
            setTempAcceptOrders(acceptOrders);
            setTempCloseOrdersToday(closeOrdersToday);
            setTempCategoryStates({ ...categoryStates });
        }
    }, [open, acceptOrders, closeOrdersToday, categoryStates]);

    // Updated checkbox handlers to uncheck the opposite option
    const handleAcceptOrdersChange = (event) => {
        const checked = event.target.checked;
        setTempAcceptOrders(checked);
        if (checked) setTempCloseOrdersToday(false); // Uncheck "Close orders for today" if "Accept" is checked
    };

    const handleCloseOrdersTodayChange = (event) => {
        const checked = event.target.checked;
        setTempCloseOrdersToday(checked);
        if (checked) setTempAcceptOrders(false); // Uncheck "Accept orders for today" if "Close" is checked
    };

    const handleCategoryChange = (category) => (event) => {
        setTempCategoryStates(prevState => ({
            ...prevState,
            [category]: event.target.checked,
        }));
    };

    const handleSave = () => {
        setAcceptOrders(tempAcceptOrders);
        setCloseOrdersToday(tempCloseOrdersToday);
        setCategoryStates(tempCategoryStates);

        localStorage.setItem('acceptOrders', JSON.stringify(tempAcceptOrders));
        localStorage.setItem('closeOrdersToday', JSON.stringify(tempCloseOrdersToday));
        localStorage.setItem('categoryStates', JSON.stringify(tempCategoryStates));

        setSnackbarOpen(true);
        onClose();
    };
    const handleSnackbarClose = () => setSnackbarOpen(false); // Close snackbar

    return (
        <div>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle>Manage Orders</DialogTitle>
                <DialogContent>
                    <Box display="flex" flexDirection="column" gap={1} marginBottom={2}>
                        <FormControlLabel
                            control={<Checkbox checked={tempAcceptOrders} onChange={handleAcceptOrdersChange} />}
                            label="Accept orders for today"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={tempCloseOrdersToday} onChange={handleCloseOrdersTodayChange} />}
                            label="Close orders for today"
                        />
                        {categories.map(category => (
                            <FormControlLabel
                                key={category.id}
                                control={
                                    <Checkbox
                                        checked={tempCategoryStates[category.name] || false}
                                        onChange={handleCategoryChange(category.name)}
                                        disabled={tempCloseOrdersToday}
                                    />
                                }
                                label={`Close orders for ${category.name}`}
                            />
                        ))}
                    </Box>
                    <Box display="flex" justifyContent="flex-end">
                        <CustomButton variant="contained" color="primary" onClick={handleSave}>
                            Save
                        </CustomButton>
                    </Box>
                </DialogContent>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <MuiAlert onClose={handleSnackbarClose} severity="success" variant="filled" >
                Changes saved successfully!
                </MuiAlert> 
            </Snackbar> 
        </div>
    );
}
