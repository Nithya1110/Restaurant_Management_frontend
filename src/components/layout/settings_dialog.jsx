import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemIcon, ListItemText, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { People, Category, ShoppingCart, Inventory,} from '@mui/icons-material';
import AddStaffStepper from '../settings/addstaff_stepper_dialog';
import EditStaffDialog from '../settings/editstaff_dialog';
import DeleteStaffDialog from '../settings/deletestaff_dialog';
import ManageStockDialog from '../settings/manage_stock_dialog'; 
import ManageOrdersDialog from '../settings/manage_orders_dialog';
import AddCategoryDialog from '../settings/addcategory_dialog';
import EditCategoryDialog from '../settings/editcategory_dialog';
import DeleteCategoryDialog from '../settings/deletecategory_dialog';

export default function SettingsDialog({ open, onClose }) {
    const [openNestedDialog, setOpenNestedDialog] = useState(null);
    const [selectedOptionStaff, setSelectedOptionStaff] = useState('');
    const [selectedOptionCategory, setSelectedOptionCategory] = useState('');

    const handleOpenNestedDialog = (dialog) => setOpenNestedDialog(dialog);
    const handleCloseNestedDialog = () => {
        setOpenNestedDialog(null);
        setSelectedOptionStaff('');
        setSelectedOptionCategory('');
    };

    const handleOptionChangeStaff = (event) => {
        setSelectedOptionStaff(event.target.value);
        setOpenNestedDialog(event.target.value);
    };
    const handleOptionChangeCategory = (event) => {
        setSelectedOptionCategory(event.target.value);
        setOpenNestedDialog(event.target.value); 
    };


    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle sx={{textAlign:'center'}}>
                    <Typography variant='h5' fontSize='22px' fontWeight='bold'>Settings</Typography>
                </DialogTitle>
                <DialogContent>
                    <List sx={{ marginTop: 2 }}>
                        <ListItem button sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'secondary.main' } }}
                        onClick={() => handleOpenNestedDialog('staff')}>
                            <ListItemIcon sx={{color:'primary.contrastText'}}><People /></ListItemIcon>
                            <ListItemText primary="Manage Staff" />
                        </ListItem>
                        <ListItem button sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'secondary.main' } }}
                        onClick={() => handleOpenNestedDialog('categories')}>
                            <ListItemIcon sx={{color:'primary.contrastText'}}><Category /></ListItemIcon>
                            <ListItemText primary="Manage Menu Categories" />
                        </ListItem>
                        <ListItem button sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'secondary.main' } }}
                        onClick={() => handleOpenNestedDialog('orders')}>
                            <ListItemIcon sx={{color:'primary.contrastText'}}><ShoppingCart /></ListItemIcon>
                            <ListItemText primary="Manage Orders" />
                        </ListItem>
                        <ListItem button sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'secondary.main' } }}
                        onClick={() => handleOpenNestedDialog('stock')}>
                            <ListItemIcon sx={{color:'primary.contrastText'}}><Inventory /></ListItemIcon>
                            <ListItemText primary="Manage Stock" />
                        </ListItem>
                    </List>
                </DialogContent>
            </Dialog>

            {/* Manage Staff Dialog */}
            <Dialog open={openNestedDialog === 'staff'} onClose={handleCloseNestedDialog} fullWidth maxWidth="sm">
                <DialogTitle>Manage Staff</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        How would you like to manage staffs ?
                    </Typography>
                    <RadioGroup value={selectedOptionStaff} onChange={handleOptionChangeStaff}>
                        <FormControlLabel value="addStaff" control={<Radio />} label="Add a Staff" />
                        <FormControlLabel value="editStaff" control={<Radio />} label="Edit Existing Staff Details" />
                        <FormControlLabel value="deleteStaff" control={<Radio />} label="Delete a Staff" />
                    </RadioGroup>
                </DialogContent>
            </Dialog>

            {/* Nested Dialogs for staff management */}
            {selectedOptionStaff === 'addStaff' && (
                <AddStaffStepper open={openNestedDialog === 'addStaff'} onClose={handleCloseNestedDialog} />
            )}
            {selectedOptionStaff === 'editStaff' && (
                <EditStaffDialog open={openNestedDialog === 'editStaff'} onClose={handleCloseNestedDialog} />
            )}
            {selectedOptionStaff === 'deleteStaff' && (
                <DeleteStaffDialog open={openNestedDialog === 'deleteStaff'} onClose={handleCloseNestedDialog} />
            )}

            {/* Manage Category Dialog */}
            <Dialog open={openNestedDialog === 'categories'} onClose={handleCloseNestedDialog} fullWidth maxWidth="sm">
                <DialogTitle>Manage Menu Categories</DialogTitle>
                <DialogContent>
                <Typography variant="body1" sx={{ mb: 2 }}>
                        How would you like to manage categories ?
                    </Typography>
                    <RadioGroup value={selectedOptionCategory} onChange={handleOptionChangeCategory}>
                        <FormControlLabel value="addCategory" control={<Radio />} label="Add a Category" />
                        <FormControlLabel value="editCategory" control={<Radio />} label="Edit Existing Category " />
                        <FormControlLabel value="deleteCategory" control={<Radio />} label="Delete a Category" />
                    </RadioGroup>
                </DialogContent>
            </Dialog>

            {/* Nested Dialogs for category management */}
            {selectedOptionCategory === 'addCategory' && (
                <AddCategoryDialog open={openNestedDialog === 'addCategory'} onClose={handleCloseNestedDialog} />
            )}
            {selectedOptionCategory === 'editCategory' && (
                <EditCategoryDialog open={openNestedDialog === 'editCategory'} onClose={handleCloseNestedDialog} />
            )}
            {selectedOptionCategory === 'deleteCategory' && (
                <DeleteCategoryDialog open={openNestedDialog === 'deleteCategory'} onClose={handleCloseNestedDialog} />
            )} 

            {/* Manage Orders Dialog */}
            <ManageOrdersDialog open={openNestedDialog === 'orders'} onClose={handleCloseNestedDialog} />
            {/* Manage Stock Dialog */}
            <ManageStockDialog open={openNestedDialog === 'stock'} onClose={handleCloseNestedDialog} />
        </>
    );
}
