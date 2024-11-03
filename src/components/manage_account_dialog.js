import React, { useState,useEffect } from 'react';
import {Button,Dialog, DialogTitle,DialogContent,DialogActions, TextField, MenuItem, InputAdornment, IconButton, Snackbar } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import MuiAlert from '@mui/material/Alert';
import { getUsersByRole,updateUserDetails } from '../services/api';

export default function ManageAccountDialog({ open, onClose }) {
  const [user, setUser] = useState(null);   // Define user state with its setter  
  const [formData, setFormData] = useState({
        username: '',
        email: '',
        contact: '',
        role: '',
        role_id: 'null',
        password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    // Fetch user from local or session storage
    const storedUser = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);  // Set user if available
            fetchUserData(storedUser.role_id); // Fetch details using role_id
        } else {
            console.error("User data not available in storage.");
        }
    }, []);

    // Fetch user details based on role_id
    const fetchUserData = async (roleId) => {
        try {
            const response = await getUsersByRole(roleId);
            if (response.data && response.data.length > 0) {
                const userData = response.data[0];
                setFormData({
                    username: userData.username || '',
                    email: userData.email || '',
                    contact: userData.contact || '',
                    role: userData.role || '',
                    role_id: userData.role_id || null,
                    password: ''  // Leave password blank
                });
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    // Validation functions 
    const validateUsername = (username) => /^[a-zA-Z0-9]+$/.test(username);
    const validateEmail = (email) => /^[\w.-]+@[\w-]+\.[\w.-]{2,4}$/.test(email);
    const validateContact = (contact) => /^\+91\d{10}$/.test(contact);
    const validatePassword = (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    const validateRoleId = (role_id) => /^\d+$/.test(role_id);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    // Handle Save click
    const handleSave = async () => {
        const newErrors = {};
        if (!validateUsername(formData.username)) {
            newErrors.username = 'Username can only contain letters and numbers.';
        }
        if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }
        if (!validateContact(formData.contact)) {
            newErrors.contact = 'Contact must start with +91 and contain 10 digits.';
        }
        if (formData.password && !validatePassword(formData.password)) {
            newErrors.password =
                'Password must contain an uppercase, a lowercase, a number, a special character, and be at least 8 characters.';
        }
        if (formData.role && !validateRoleId(formData.role_id)) {
            newErrors.role_id = 'ID must be a valid number.';
        }
        
        if (Object.keys(newErrors).length === 0) {
            try {
                await updateUserDetails(user.role_id, formData);
                setSnackbarOpen(true); // Show success snackbar
                setIsEditing(false);
                onClose() 
            } catch (error) {
                console.error('Error updating user details:', error);
            }
        } else {
            setErrors(newErrors); // Set errors if validation fails
        }
    };


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };
    

  return (
    <>
    <Dialog open={open} onClose={onClose}>
            <DialogTitle>Manage Your Account</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    error={!!errors.username}
                    helperText={errors.username}
                    margin="normal"
                    InputProps={{
                        readOnly: !isEditing,
                    }}
                />
                <TextField
                    fullWidth
                    label="Email ID"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    margin="normal"
                    InputProps={{
                        readOnly: !isEditing,
                    }}
                />
                <TextField
                    fullWidth
                    label="Contact Number"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    error={!!errors.contact}
                    helperText={errors.contact}
                    margin="normal"
                    InputProps={{
                        readOnly: !isEditing,
                    }}
                />
                <TextField
                    fullWidth
                    label="Your Role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    select
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                >
                    <MenuItem value={formData.role}>{formData.role === 'admin' ? 'Admin' : 'Staff'}</MenuItem>
                </TextField>
                <TextField
                    fullWidth
                    label={formData.role === 'admin' ? 'Admin ID' : 'Staff ID'}
                    name="role_id"
                    value={formData.role_id}
                    onChange={handleInputChange}
                    error={!!errors.role_id}
                    helperText={errors.role_id}
                    margin="normal"
                    InputProps={{
                        readOnly: !isEditing,
                    }}
                />
                <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    margin="normal"
                    InputProps={{
                        readOnly: !isEditing,
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={togglePasswordVisibility} edge="end">
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </DialogContent>
            <DialogActions>
                {isEditing ? (
                    <Button
                        onClick={handleSave}
                        color="primary"
                        variant="contained"
                        sx={{
                            backgroundColor: 'primary.main',
                            '&:hover': { backgroundColor: 'primary.dark' },
                        }}
                    >
                        Save
                    </Button>
                ) : (
                    <Button
                        onClick={handleEdit}
                        color="primary"
                        variant="contained"
                        sx={{
                            backgroundColor: 'primary.main',
                            '&:hover': { backgroundColor: 'primary.dark' },
                        }}
                    >
                        Edit
                    </Button>
                )}
                <Button onClick={onClose} color="secondary" variant="contained" sx={{
                            backgroundColor: 'secondary.main',
                            '&:hover': { backgroundColor: 'secondary.dark' },
                        }} >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
        {/* Snackbar for confirmation */}
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <MuiAlert onClose={handleCloseSnackbar} severity="success" variant="filled">
            Changes saved !
            </MuiAlert>
        </Snackbar>
    </>
  );
}
