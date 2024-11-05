import React from 'react';
import { Button } from '@mui/material';

function CustomButton({ children, onClick, disabled , sx , color, variant,startIcon }) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      color={color} // Allows customization of the button color (e.g., 'primary', 'secondary')
      variant={variant} // Sets the button style (e.g., 'contained', 'outlined')
      startIcon={startIcon} // Passes Icon 
      sx={sx} // Accepts additional custom styling if needed
    >
      {children}
    </Button>
  );
}

export default CustomButton;


