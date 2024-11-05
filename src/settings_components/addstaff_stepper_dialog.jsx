import React, { useState,useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Stepper, Step, StepLabel,TextField, Snackbar,Rating,Box,Typography} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import CustomButton from '../elements_components/custom_button';

const steps = ['Basic Info', 'Personal Info', 'Job Info'];

export default function AddStaffStepper ({ open, onClose }) {
    const [activeStep, setActiveStep] = useState(0);
    const [staffID, setStaffID] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState(''); 
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('+91');
    const [salary, setSalary] = useState('');
    const [rating, setRating] = useState('');  
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errors, setErrors] = useState({}); // Track validation errors

    // Validation functions
  const isValidName = (name) => /^[A-Za-z\s]+$/.test(name);
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidContact = (contact) => /^\+91\d{10}$/.test(contact);
  const isValidSalary = (salary) => /^(?:\d+\.\d{2})$/.test(salary);


  const validateStep = () => {
    let newErrors = {};

    if (activeStep === 0) {
      if (!staffID || isNaN(staffID)) newErrors.staffID = 'Staff ID must be a valid number';
      if (!isValidName(firstName)) newErrors.firstName = 'First Name must contain only letters';
      if (!isValidName(lastName)) newErrors.lastName = 'Last Name must contain only letters';
    } else if (activeStep === 1) {
      if (!isValidEmail(email)) newErrors.email = 'Invalid email format';
      if (!isValidContact(contact)) newErrors.contact = 'Contact must include +91 and 10 digits';
    } else if (activeStep === 2) {
      if (!isValidSalary(salary)) newErrors.salary = 'Salary must be a positive number with up to 2 decimal places';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
    };
    
    // Reset form function
    const resetForm = () => {
        setStaffID('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setAddress('');
        setContact('+91');
        setSalary('');
        setRating('');
        setActiveStep(0);
        setErrors({});
    };
    // Form is reset every time the dialog opens
    useEffect(() => {
        if (open) resetForm();
    }, [open]);

    //Function to handle the next or finish process
    const handleNext = () => {
        if (validateStep()) {
            if (activeStep === steps.length - 1) {
              setOpenSnackbar(true); // Show snackbar on final step
              resetForm(); // Reset form after submission
              onClose(); // Close dialog
            } else {
              setActiveStep((prevStep) => prevStep + 1);
            }
        }
    };
    // Function to handle back process
    const handleBack = () => setActiveStep((prevStep) => prevStep - 1);
    // Function to close snackbar 
    const handleSnackbarClose = () => setOpenSnackbar(false);
  
    return(
        <>
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
           <DialogTitle>Add a Staff</DialogTitle>
           <DialogContent>
              <Stepper activeStep={activeStep}>
                {steps.map((label)=>(
                    <Step key={label}>
                       <StepLabel>{label}</StepLabel>
                    </Step> 
                ))}
              </Stepper>
              {/* Form Fields for Each Step */}
              <Box sx={{ mt: 2 }}>
                {activeStep===0 && (
                    <>
                    <TextField
                        fullWidth 
                        margin="normal"
                        label="Staff ID" 
                        variant="outlined"
                        value={staffID}
                        onChange={(e) => setStaffID(e.target.value)}
                        error={!!errors.staffID} helperText={errors.staffID}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="First Name" 
                        variant="outlined"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        error={!!errors.firstName} helperText={errors.firstName}
                        
                    />
                    <TextField
                        fullWidth margin="normal"
                        label="Last Name" variant="outlined"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        error={!!errors.lastName} helperText={errors.lastName}
                    />
                    </> 
                )}
                {activeStep === 1 && (
                    <>
                        <TextField
                            fullWidth margin="normal"
                            label="Contact" variant="outlined"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            error={!!errors.contact} helperText={errors.contact}
                        />
                        <TextField
                            fullWidth margin="normal"
                            label="Email" variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!errors.email} helperText={errors.email}
                        />
                        <TextField
                            fullWidth margin="normal"
                            label="Address" variant="outlined"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </>
                )}
                {activeStep === 2 && (
                    <>
                        <TextField
                            fullWidth margin="normal"
                            label="Salary" variant="outlined"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            error={!!errors.salary} helperText={errors.salary}
                        />
                        <Typography component="legend">Performance Rating</Typography>
                        <Rating
                         defaultValue={0}
                         precision={0.5}
                         size="large"
                         sx={{ marginBottom: 2 }}
                         value={rating}
                         onChange={(e) => setRating(parseFloat(e.target.value))}
                         />
                    </>
                )} 
                {/* Navigation Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <CustomButton disabled={activeStep === 0} onClick={handleBack}>
                    Back
                </CustomButton> 
                <CustomButton onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </CustomButton>  
                </Box>
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
                    New staff has been added !
            </MuiAlert> 
        </Snackbar> 
        </>
    );
}

