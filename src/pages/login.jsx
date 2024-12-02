import React, { useState } from 'react';
import { Box,Typography,Button,TextField, FormControlLabel,Link,Checkbox,IconButton, InputAdornment } from '@mui/material'; 
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'; 
import { loginUser } from '../services/api';

// Gradient Background for the entire page  
const PageContainer = styled(Box) ({
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', 
    background: 'linear-gradient(135deg, #A6C5F7, #2A6FB0)', // Page gradient background
});

// Box containing the login form and split halves
const LoginBox = styled(Box) ({
    width: '75%',
    height: '80vh', 
    display: 'flex',
    borderRadius: '16px',
    overflow: 'hidden',
    backgroundColor: '#EBECED',  // Background color for the main box
});

// Left side of the box (form side)
const LeftSide = styled(Box) ({
    flex: 1, 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#EBECED', // Same background for the left side to blend with the box
});

// Right side of the box with gradient background  
const RightSide = styled(Box) ({
    flex: 1,
    background: 'linear-gradient(135deg, #F7CAC9, #B03A48)', // Gradient background for right half
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30px',
    color: '#FFFF', // White text to contrast with the background
});

// Styled Image for consistent size
const StyledImage = styled('img')({
    width: '50%',
    height: '50%',
    margin: '20px 0',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
}); 


export default function LoginPage() { 
    const navigate = useNavigate(); // React Router navigation
    const [formData,setFormData] = useState({role_id: '' , password: '', rememberMe: false}); 
    const [errors,setErrors] = useState({role_id: '' , password: ''});
    const [showPassword, setShowPassword] = useState(false);
    
    // Form validatin
    const validateForm = () => { 
        let valid = true;
        const newErrors = {role_id: '' , password: ''};
        const role_idFormat = /^\d+$/; // valid number 
        if (!formData.password) {
            newErrors.password = 'Password is required.';
            valid = false;
        }
        if (!formData.role_id) {
            newErrors.role = 'Role id is required.';
            valid = false;
        }
        else if(!role_idFormat.test(formData.role_id)){
            newErrors.role_id = 'Role id must be a valid number.'; 
            valid = false;
        }
      
          setErrors(newErrors);
          return valid;
        };   
    // Handle input changes    
    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setFormData({...formData,[name]:value});
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    // Handle checkbox change 
    const  handleCheckboxChange = (e) => {
        setFormData({ ...formData, rememberMe: e.target.checked });
    };
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const payload = {
                    role_id: formData.role_id,
                    password: formData.password,
                };

                const response = await loginUser(payload);

                if (response.status === 200) {
                    const user = response.data.user;

                    if (formData.rememberMe) {
                        localStorage.setItem('user', JSON.stringify(user));
                    } else {
                        sessionStorage.setItem('user', JSON.stringify(user));
                        localStorage.removeItem('user');
                    }

                    alert('Login Successful!');
                    navigate('/home_dashboard');
                }
            } catch (error) {
                if (error.response?.status === 400) {
                    alert('Invalid password!');
                } else if (error.response?.status === 404) {
                    alert('User not found!');
                } else {
                    alert('An error occurred during login.');
                }
            }
        }
    };

    return(
        <PageContainer>
            <LoginBox elevation={3}>
                {/* Left Half (Content like form goes here) */}
                <LeftSide>  
                    <Typography variant="h1" fontWeight='bold' color='#2D3E50'  gutterBottom>
                        Login
                    </Typography> 
                    <Box component='form' onSubmit={handleSubmit} sx={{width:'100%',maxWidth:400}}>
                    <TextField
                            fullWidth
                            label="Enter ID"
                            name="role_id"
                            value={formData.role_id}
                            onChange={handleInputChange}
                            required
                            error={!!errors.role_id}
                            helperText={errors.role_id}
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
                                    '& fieldset': {
                                        borderColor: '#CCCCCC',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#1976D2',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#1976D2',
                                        borderWidth: '2px',
                                    },
                                },
                            }}
                        />
                        <TextField
                          fullWidth 
                          label="Password"
                          type={showPassword ? 'text' : 'password'} // Toggle between 'text' and 'password'
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          error={!!errors.password}
                          helperText={errors.password}
                          margin="normal"
                          variant="outlined"
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
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 1,marginLeft: 1 }}>
                            <FormControlLabel
                              control={<Checkbox checked={formData.rememberMe} onChange={handleCheckboxChange} sx={{color:'#2A6FB0','&.Mui-checked':{color:'#1A4978'}}} />}
                              label="Remember me"
                              sx={{
                                '& .MuiFormControlLabel-label': {
                                    color: 'black', // Color for the label text 
                                },
                            }}
                            />
                            <Link href="#" underline="hover" color='#2A6FB0'>   
                              Forgot password?  
                            </Link>   
                        </Box>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ marginTop: 3, padding: '10px 20px', textTransform:'uppercase',backgroundColor:'#2A6FB0',color:'black','&:hover':{backgroundColor:'#1A4978',color:'white'}}}  
                        >
                            Sign In
                        </Button>
                    </Box>
                </LeftSide>
                {/* Right Half (Visuals/Empty or Additional Information) */} 
                <RightSide>
                    <Typography variant='h1' color='white'fontWeight='bold' gutterBottom>Welcome to Login</Typography>
                    {/* Add the image below the heading */}
                    <StyledImage
                      src="https://www.pngall.com/wp-content/uploads/15/Login-No-Background.png" // Replace with your image address
                      alt="Login Visual"  
                    />
                    {/* Text below the image */}
                    <Typography variant="body1" sx={{ marginTop: 2,color: '#1A4978' }}> Don't have an account?</Typography>
                    {/* Sign Up Button */}
                    <Button 
                     variant="contained"  
                     onClick={() => navigate('/register')} // Navigate to Register Page
                     sx={{marginTop: 2, padding: '10px 20px',textTransform:'uppercase',backgroundColor:'secondary.main',color:'black','&:hover':{backgroundColor:'secondary.dark',color:'white'}}}
                    >
                       Sign Up
                    </Button>
                </RightSide>
            </LoginBox>
        </PageContainer>
    );
}