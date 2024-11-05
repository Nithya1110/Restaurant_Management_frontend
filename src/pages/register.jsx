import React, { useState } from 'react';
import { Box, Typography, Button, TextField,InputAdornment,IconButton, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Page container with a blue gradient background
const PageContainer = styled(Box)({
    height: '100vh',
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #A6C5F7, #2A6FB0)',
});

// Outer pink gradient box
const OuterBox = styled(Box)({
    height: '100vh',
    width: '40%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #F7CAC9, #B03A48)',
});

// Inner grey box for the form
const InnerBox = styled(Box)({
  width: '90%',
  height: '95%',
  backgroundColor: '#EBECED',
  borderRadius: '12px',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center', 
  overflow: 'hidden'
}); 

export default function RegisterPage() {
    const navigate = useNavigate(); // Use React Router's navigation
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        contact: '+91', 
        password: '',
        role: '',
        role_id: '',
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);


    // Validation functions
    const validateUsername = (username) =>
      /^[a-zA-Z0-9]+$/.test(username); // Only alphanumeric, no spaces/special characters

    const validateEmail = (email) =>
      /^[\w.-]+@[\w-]+\.[\w.-]{2,4}$/.test(email); // Standard email regex

    const validateContact = (contact) =>
      /^\+91\d{10}$/.test(contact); // +91 followed by exactly 10 digits

    const validatePassword = (password) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password); 
    // Password strength: 1 upper, 1 lower, 1 special char, 1 number, min 8 chars  
    const validateRoleId = (role_id) => /^\d+$/.test(role_id); // Ensure roleId is numeric

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData,[name]:value});
    };  
    const handleRoleChange = (e) => {
      setFormData({ ...formData, role: e.target.value, roleId: '' }); // Reset roleId on role change
    };
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    // Form submission
    const handleSubmit = async(e) => {
        e.preventDefault(); 
        const newErrors = {};
        // Validate fields
        if (!validateUsername(formData.username)) {
            newErrors.username = 'Username can only contain letters and numbers.';
        }
        if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }
        if (!validateContact(formData.contact)) {
            newErrors.contact = 'Contact must start with +91 and contain 10 digits.';
        }
        if (!validatePassword(formData.password)) {
            newErrors.password =
              'Password must contain an uppercase, a lowercase, a number, a special character, and be at least 8 characters.';
        }
        if (formData.role && !validateRoleId(formData.role_id)) {
            newErrors.roleId = 'ID must be a valid number.';
        }
        if (Object.keys(newErrors).length === 0) {
            try {
                // Capture the response from registerUser
                const response = await registerUser(formData);
                if (response.status === 201) {
                    alert('Registration Successful!');
                    navigate('/login'); // Redirect to login page on success
                } 
            } catch (error) {
                console.error('Registration failed:', error);
                alert('Registration failed. Please try again.');
            }
        } else {
            setErrors(newErrors); // Set errors if validation fails   
        }  
    };

    return(
        <PageContainer>
            <OuterBox>
                <InnerBox>
                    {/* Registration Form */}
                    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', overflowY: 'auto' }}>
                    {/* Heading */}
                    <Box textAlign='center'mb={3}>
                    <Typography variant="h1" fontWeight="bold" color="#2D3E50" gutterBottom>
                       Register
                    </Typography>
                    </Box>
                    <TextField
                      fullWidth
                      label="Username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                      margin="normal"
                      variant="outlined"
                      error={!!errors.username}
                      helperText={errors.username}
                      InputLabelProps={{
                        style: { color: 'black' },
                      }}
                      InputProps={{
                        style: { color: 'black' },
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#CCCCCC',  // Default light gray border
                            },
                            '&:hover fieldset': {
                                borderColor: '#1976D2',  // Blue border on hover
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#1976D2',  // Blue border when focused
                                borderWidth: '2px',       // Thicker border on focus
                            },
                        },
                      }}
                    />  
                    <TextField
                      fullWidth
                      label="Email ID"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      margin="normal"
                      variant="outlined"
                      error={!!errors.email}
                      helperText={errors.email}
                      InputLabelProps={{
                        style: { color: 'black' },
                      }}
                      InputProps={{
                        style: { color: 'black' },
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#CCCCCC',  // Default light gray border
                            },
                            '&:hover fieldset': {
                                borderColor: '#1976D2',  // Blue border on hover
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#1976D2',  // Blue border when focused
                                borderWidth: '2px',       // Thicker border on focus
                            },
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Contact Number"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      required
                      margin="normal"
                      variant="outlined"
                      error={!!errors.contact}
                      helperText={errors.contact}
                      InputLabelProps={{
                        style: { color: 'black' },
                      }}
                      InputProps={{
                        style: { color: 'black' },
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#CCCCCC',  // Default light gray border
                            },
                            '&:hover fieldset': {
                                borderColor: '#1976D2',  // Blue border on hover
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#1976D2',  // Blue border when focused
                                borderWidth: '2px',       // Thicker border on focus
                            },
                        },
                      }}
                    /> 
                    <TextField
                      fullWidth
                      label="Your Role"
                      name="role"
                      value={formData.role}
                      onChange={handleRoleChange}
                      required
                      select
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        style: { color: 'black' },
                      }}
                      InputProps={{
                        style: { color: 'black' },
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                            '& .MuiSelect-select': { color: 'black' }, //  black color for selected text
                            '& fieldset': {
                                borderColor: '#CCCCCC',  // Default light gray border
                            },
                            '&:hover fieldset': {
                                borderColor: '#1976D2',  // Blue border on hover
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#1976D2',  // Blue border when focused
                                borderWidth: '2px',       // Thicker border on focus
                            },
                        },
                      }}
                    >
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="staff">Staff</MenuItem>
                    </TextField>
                    {/* Conditional ID Field based on Role */}
                    {formData.role && (
                    <TextField
                      fullWidth
                      label={formData.role === 'admin' ? 'Enter Admin ID' : 'Enter Staff ID'}
                      name="role_id"
                      value={formData.role_id}
                      onChange={handleInputChange}
                      required
                      margin="normal"
                      variant="outlined"
                      error={!!errors.role_id}
                      helperText={errors.role_id}
                      InputLabelProps={{
                        style: { color: 'black' },
                      }}
                      InputProps={{
                        style: { color: 'black' },
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#CCCCCC',  // Default light gray border
                            },
                            '&:hover fieldset': {
                                borderColor: '#1976D2',  // Blue border on hover
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#1976D2',  // Blue border when focused
                                borderWidth: '2px',       // Thicker border on focus
                            },
                        },
                      }}
                    />
                    )}
                    <TextField
                      fullWidth
                      label="Password"
                      type={showPassword ? 'text' : 'password'} // Toggle between 'text' and 'password'
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required 
                      margin="normal"
                      variant="outlined"
                      error={!!errors.password}
                      helperText={errors.password}   
                      InputLabelProps={{
                        style: { color: 'black' },
                      }}
                      InputProps={{
                        style: { color: 'black' },
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={togglePasswordVisibility} edge="end">
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#CCCCCC',  // Default light gray border
                            },
                            '&:hover fieldset': {
                                borderColor: '#1976D2',  // Blue border on hover
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#1976D2',  // Blue border when focused
                                borderWidth: '2px',       // Thicker border on focus
                            },
                        },
                      }}
                    />
                    <Button
                      type="submit"
                      fullWidth 
                      variant="contained"
                      sx={{
                        marginTop: 3,
                        size:'medium',
                        padding: '10px 20px',
                        textTransform:'uppercase',
                        backgroundColor:'#2A6FB0',color:'black','&:hover':{backgroundColor:'#1A4978',color:'white'}
                      }}  
                    >
                        Sign Up
                    </Button>
                    </Box> 
                </InnerBox>
            </OuterBox> 
        </PageContainer>
    );
}