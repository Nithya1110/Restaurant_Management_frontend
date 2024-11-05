import {createTheme} from '@mui/material/styles'; 

// Dark Theme   
const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#2A6FB0',  // Dark Blue as the primary color
        dark: '#1A4978',  // Deeper Blue for emphasis
      },
      secondary: {
        main: '#B03A48',  // Maroon as secondary color      
        dark: '#7B1A24',  // Darker Maroon for emphasis
      },
      background: {
        default: '#121212',  // Very dark gray background  
        paper: '#2C2C2C',    // Slightly lighter background for cards, appbar,dialog etc.
      },
      text: {
        primary: '#FFFFFF',  // White for main text  
        secondary: '#BBBBBB',  // Light gray for secondary text
      },
    },
    typography: {
      fontFamily: '"Roboto","Helvetica","Arial","sans-serif"', // Base font family 
      h1: {
        fontSize: '2rem',  
        fontWeight: 'bold',
        color: '#FFFFFF',  // White for headers
      },
      h2: {
        fontSize: '1.5rem',  
        fontWeight: 'bold',
        color: '#BBBBBB',  // Light gray for subheadings
      },
      h3: {
        fontSize: '1.25rem',  
        fontWeight: 'normal',
        color: '#BBBBBB',  // Light gray for subheadings
      },
      h4: {
        fontSize: '1rem',  
        fontWeight: 'normal',
        color: '#BBBBBB',  
      },
      h5: {
        fontSize: '1rem',  
        fontWeight: 'normal',
        color: '#66BB6A',  // Green to match light theme
      },
      h6: {
        fontSize: '1rem',  
        fontWeight: 'normal',
        color: '#66BB6A',  // Green to match light theme
      },
      body1: {
        fontSize: '1rem',
        fontWeight: 'normal',
        color: '#FFFFFF',  // White for paragraphs
      },
      body2: {
        fontSize: '0.875rem',  
        fontWeight: 'normal',
        color: '#BBBBBB',  // Light gray for secondary text
      },
    },
    spacing: 8, // 8px base unit for spacing
    breakpoints: {
      values: { 
        xs: 0,   
        sm: 600,  
        md: 960,  
        lg: 1280,  
        xl: 1920,  
      },
    },
    components: {
      MuiContainer: {                     
        styleOverrides: {                              
          root: {                                    
            padding: (theme) => theme.spacing(2),  
            margin: (theme) => theme.spacing(3),  
            backgroundColor: '#1E1E2F', // Darker container background
          }, 
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8, 
            padding: '8px 16px',
            textTransform: 'none', 
            fontWeight: 'bold',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#1E1E2F',  // Dark background for appbar
            boxShadow: 'none',
            padding: '0 16px', 
          },
        }, 
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: '#2A6FB0',  // Blue background for sidebar
            color: '#FFFFFF',  // White text in drawer
          },
        },
      },
      MuiPopover: {   
        styleOverrides: {
          paper: {
            backgroundColor: '#2A6FB0',  // Blue background for sidebar
            color: '#FFFFFF',  // White text in drawer
          },
        },
      },
      MuiBackdrop: { 
        styleOverrides: {
          root: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',  // Ensure visible backdrop
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '10px',
            backgroundColor: '#1E1E2F',  // Dark background for cards
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',  // Stronger shadow for contrast
            transition: '0.3s', 
            '&:hover': {
              transform: 'scale(1.02)', 
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: '#2C2C2C',  // Dark gray background for dialog
            borderRadius: '12px',  
            padding: '16px',  
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Light shadow for a subtle lift effect
            border: '1px solid #E0E0E0', // Light gray border for a defined edge
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: { 
            '& fieldset': {
              borderColor: '#BBBBBB',  // Light gray outline by default
            },
            '&:hover fieldset': {
              borderColor: '#FFFFFF',  // White outline on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FFFFFF',  // White outline when focused
              borderWidth: '2px',      // Slightly thicker border when focused 
            },
          },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          root: {
            border: '2px solid #90caf9',
            borderRadius: '8px', // Rounded corners
            backgroundColor: '#121212', // Dark background
            '& .MuiDataGrid-row': {
              borderBottom: '1px solid #424242',
            },
            '& .MuiDataGrid-row:nth-of-type(odd)': {
              backgroundColor: '#1e1e1e',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#37474f',
            },
            '& .MuiDataGrid-columnSeparator': {
                color:'#FFFFFF'  
            },
            '& .MuiDataGrid-footerContainer': {
                backgroundColor: '#121212'      
            },
          },
        },
      },
      MuiTable: {
        styleOverrides: {
          root: {
            border: '2px solid #90caf9',
            borderRadius: '8px',
            backgroundColor: '#121212',
            '& .MuiTableCell-root': {
              color: '#fff',
              borderBottom: '1px solid #424242',
            },
            '& .MuiTableRow-root:nth-of-type(odd)': {
              backgroundColor: '#1e1e1e',
            },
            '& .MuiTableRow-root:hover': {
            backgroundColor: '#37474f',
            },
          },
        },
      },
    },    
  });

export default (darkTheme);   