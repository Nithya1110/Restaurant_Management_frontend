import React, { useState } from 'react';
import { Dialog,DialogTitle, DialogContent,TextField,Box, Snackbar,Typography,} from '@mui/material';
import CustomButton from '../elements/custom_button';
import MuiAlert from '@mui/material/Alert';

export default function ManageStockDialog({ open, onClose }) {
    // Initial mock stock data with categories
    const initialStockData = {
        fruits: { category: 'Fruits', quantity: '50', totalPrice: '₹1000.00', supplier: 'Fresh Fruits Ltd.' },
        vegetables: { category: 'Vegetables', quantity: '70', totalPrice: '₹1500.00', supplier: 'Green Veggies Ltd.' },
        provisions: { category: 'Provisions', quantity: '30', totalPrice: '₹5000.00', supplier: 'Daily Needs Inc.' },
    }; 
    const [stockData, setStockData] = useState(initialStockData);
    const [isEditable, setIsEditable] = useState(false); // Track edit mode
    const [errors, setErrors] = useState({}); // Track validation errors
    const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar control
    // Handle field change in the stock data
    const handleFieldChange = (category, field, value) => {
        setStockData((prevData) => ({
            ...prevData,
            [category]: { ...prevData[category], [field]: value },
        }));
    };

    // Validation function to ensure all fields are correctly filled
    const validateFields = () => {
        const newErrors = {};
        Object.keys(stockData).forEach((category) => {
            const { quantity, totalPrice, supplier } = stockData[category];

            if (!quantity || isNaN(quantity)) newErrors[`${category}_quantity`] = 'Enter a valid quantity.';
            if (!/^₹\d+\.\d{2}$/.test(totalPrice))
                newErrors[`${category}_totalPrice`] = 'Enter a valid price (e.g., ₹100.00).';
            if (!supplier) newErrors[`${category}_supplier`] = 'Supplier name is required.';
        });

        setErrors(newErrors); 
        return Object.keys(newErrors).length === 0;
    };
    
    // Reset the dialog to read-only when it's closed
    const handleDialogClose = () => {
        setIsEditable(false); // Reset to read-only mode
        onClose(); // Close the dialog
    };

    // Save button click handler
    const handleSave = () => {
        if (validateFields()) {
            setIsEditable(false); // Switch back to read-only mode
            setOpenSnackbar(true); // Show snackbar notification
            handleDialogClose(); // Close the dialog
        }
    };
    const handleEdit = () => setIsEditable(true); // Enable edit mode
    const handleSnackbarClose = () => setOpenSnackbar(false); // Close snackbar

    return(
        <>
            <Dialog open={open} onClose={handleDialogClose} fullWidth maxWidth="sm">
                <DialogTitle>Manage Stock</DialogTitle>
                <DialogContent>
                    {Object.keys(stockData).map((category) => (
                        <Box key={category} sx={{ mb: 2 }}>
                            <Typography variant="h6">{stockData[category].category}</Typography>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Quantity"
                                variant="outlined"
                                value={stockData[category].quantity}
                                onChange={(e) =>
                                    handleFieldChange(category, 'quantity', e.target.value)
                                }
                                error={!!errors[`${category}_quantity`]}
                                helperText={errors[`${category}_quantity`]}
                                InputProps={{ readOnly: !isEditable }}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Total Price"
                                variant="outlined"
                                value={stockData[category].totalPrice}
                                onChange={(e) =>
                                    handleFieldChange(category, 'totalPrice', e.target.value)
                                }
                                error={!!errors[`${category}_totalPrice`]}
                                helperText={errors[`${category}_totalPrice`]}
                                InputProps={{ readOnly: !isEditable }}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Supplier"
                                variant="outlined"
                                value={stockData[category].supplier}
                                onChange={(e) =>
                                    handleFieldChange(category, 'supplier', e.target.value)
                                }
                                error={!!errors[`${category}_supplier`]}
                                helperText={errors[`${category}_supplier`]}
                                InputProps={{ readOnly: !isEditable }}
                            />
                        </Box>
                    ))}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <CustomButton variant="contained" onClick={handleEdit} disabled={isEditable} sx={{ mr: 1 }}>
                            Edit
                        </CustomButton>
                        <CustomButton variant="contained" onClick={handleSave} disabled={!isEditable}>
                            Save
                        </CustomButton>
                    </Box>
                </DialogContent>
            </Dialog> 

            <Snackbar
                open={openSnackbar}
                onClose={handleSnackbarClose}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <MuiAlert onClose={handleSnackbarClose} severity="success" variant="filled" >
                Stock details saved successfully!
                </MuiAlert> 
        </Snackbar> 
        </>
    );
}